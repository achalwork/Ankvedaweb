import express from 'express';
import crypto from 'node:crypto';
import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import Razorpay from 'razorpay';
import {buildReport} from './report.js';
import {analyze} from '../src/lib/analyze.js';

const dir=path.dirname(fileURLToPath(import.meta.url));
const {RAZORPAY_KEY_ID,RAZORPAY_KEY_SECRET,RAZORPAY_WEBHOOK_SECRET,PORT=3001,MOCK_PAYMENT}=process.env;
const PRICE_PAISE=9900; // ₹99 — the server decides the amount; the browser can never change it
const mock=MOCK_PAYMENT==='1';
if(!mock&&(!RAZORPAY_KEY_ID||!RAZORPAY_KEY_SECRET)){console.error('Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET (see .env.example)');process.exit(1)}
const SECRET=mock?'mock_secret':RAZORPAY_KEY_SECRET, KEYID=mock?'rzp_test_mock':RAZORPAY_KEY_ID;
const rzp=mock?null:new Razorpay({key_id:KEYID,key_secret:SECRET});

// tiny file store: data/orders.json  (swap for a real DB when you scale)
const DB=path.join(dir,'../data/orders.json');mkdirSync(path.dirname(DB),{recursive:true});
const load=()=>existsSync(DB)?JSON.parse(readFileSync(DB,'utf8')):{};
const save=o=>writeFileSync(DB,JSON.stringify(o,null,1));
const hmac=(s,k)=>crypto.createHmac('sha256',k).update(s).digest('hex');
const same=(a,b)=>{const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&crypto.timingSafeEqual(x,y)};

const app=express();
// webhook needs the raw body for signature check
app.post('/api/webhook',express.raw({type:'application/json'}),(req,res)=>{
  if(!RAZORPAY_WEBHOOK_SECRET)return res.sendStatus(404);
  if(!same(hmac(req.body,RAZORPAY_WEBHOOK_SECRET),String(req.get('x-razorpay-signature')||'')))return res.sendStatus(400);
  const ev=JSON.parse(req.body);const p=ev.payload?.payment?.entity;
  if(ev.event==='payment.captured'&&p){const db=load(),o=db[p.order_id];if(o&&!o.paid){o.paid=true;o.paymentId=p.id;o.token=o.token||crypto.randomBytes(24).toString('hex');save(db)}}
  res.sendStatus(200)});

app.use(express.json({limit:'10kb'}));

const clean=b=>{const name=String(b.name||'').trim().slice(0,60),d=+b.d,m=+b.m,y=+b.y;
  const dt=new Date(y,m-1,d);if(!/^[A-Za-z][A-Za-z\s.'-]*$/.test(name)||dt.getDate()!==d||dt.getMonth()!==m-1||y<1900||dt>new Date())return null;
  const wa=/^[6-9]\d{9}$/.test(b.wa||'')?b.wa:'';
  const tob=/^([01]\d|2[0-3]):[0-5]\d$/.test(b.tob||'')?b.tob:'';           // 24h "HH:MM" or '' (unknown)
  const pobRaw=String(b.pob||'').trim().slice(0,60);const pob=/^[\p{L}\s.,'()-]{2,60}$/u.test(pobRaw)?pobRaw:'';
  return {name,d,m,y,wa,tob,pob}};

app.post('/api/order',async(req,res)=>{
  const f=clean(req.body||{});if(!f||analyze(f).error)return res.status(400).json({error:'invalid'});
  try{
    const o=mock?{id:'order_'+crypto.randomBytes(7).toString('hex')}
      :await rzp.orders.create({amount:PRICE_PAISE,currency:'INR',receipt:'av_'+Date.now(),notes:{name:f.name}});
    const db=load();db[o.id]={...f,paid:false,token:null,created:Date.now()};save(db);
    res.json({orderId:o.id,amount:PRICE_PAISE,keyId:KEYID,mock});
  }catch(e){console.error(e);res.status(502).json({error:'order_failed'})}});

if(mock)app.post('/api/mock-pay',(req,res)=>{const oid=req.body?.orderId;if(!load()[oid])return res.status(400).json({});
  const pid='pay_mock'+crypto.randomBytes(4).toString('hex');res.json({razorpay_order_id:oid,razorpay_payment_id:pid,razorpay_signature:hmac(oid+'|'+pid,SECRET)})});

app.post('/api/verify',(req,res)=>{
  const {razorpay_order_id:oid,razorpay_payment_id:pid,razorpay_signature:sig}=req.body||{};
  const db=load(),o=db[oid];if(!o||!pid||!sig)return res.status(400).json({error:'invalid'});
  // Razorpay's documented check: HMAC_SHA256(order_id|payment_id, key_secret) must equal the signature
  if(!same(hmac(oid+'|'+pid,SECRET),String(sig)))return res.status(400).json({error:'bad_signature'});
  o.paid=true;o.paymentId=pid;o.token=o.token||crypto.randomBytes(24).toString('hex');save(db);
  res.json({token:o.token});});

// Lets a buyer who closed the tab after paying get their download link back (needs the order id the browser stored).
app.get('/api/status/:orderId',(req,res)=>{const o=load()[req.params.orderId];res.json(o&&o.paid?{paid:true,token:o.token}:{paid:false})});

app.get('/api/report/:token',async(req,res)=>{
  const db=load(),o=Object.values(db).find(x=>x.token&&x.token===req.params.token&&x.paid);
  if(!o)return res.status(404).send('Not found');
  try{const lang=req.query.lang==='en'?'en':'mr';const pdf=await buildReport(o,lang);
    res.set({'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="AnkVeda-Report-${o.name.replace(/\W+/g,'_')}.pdf"`,'Cache-Control':'private, no-store'}).send(pdf);
  }catch(e){console.error(e);res.status(500).send('Report failed')}});

const dist=path.join(dir,'../dist');
if(existsSync(dist)){app.use(express.static(dist));app.get('*',(_,r)=>r.sendFile(path.join(dist,'index.html')))}
app.listen(PORT,()=>console.log(`AnkVeda on :${PORT}${mock?' (MOCK payments)':''}`));