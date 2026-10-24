import {useState,useEffect,useRef} from 'react';
import {C} from './content.js';
import {H} from './home.js';
import {analyze} from './lib/analyze.js';
import {calculateNameNumber} from './lib/engine.js';
import {suggest} from './lib/variants.js';
import {searchPlaces} from './lib/places.js';

import {makePdfBlob,saveBlob} from './lib/clientPdf.js';
import {PAGES} from './pages.js';
import {PT} from './payText.js';
import {CONTACT,PRICE} from './config.js';
import './styles.css';

const api=(u,b)=>fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)}).then(r=>{if(!r.ok)throw new Error(u);return r.json()});
const DEMO=import.meta.env.VITE_DEMO==='1'; // preview-only: simulates payment, no backend
const Logo=()=><span className="logo"><svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="13" fill="none" stroke="var(--gold)" strokeWidth="2"/><path d="M15 7.5v15M10.5 11.5l4.5-4M11 22.5h8" stroke="var(--ind)" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M22.5 7.5l.9 1.9 1.9.9-1.9.9-.9 1.9-.9-1.9-1.9-.9 1.9-.9z" fill="var(--gold)"/></svg>AnkVeda</span>;

const LangSwitch=({lang,setLang})=><div className="lang" role="group" aria-label="Language">{[['mr','मराठी'],['en','English']].map(([k,n])=><button key={k} className={lang===k?'on':''} aria-pressed={lang===k} onClick={()=>setLang(k)}>{n}</button>)}</div>;


function Navbar({h,lang,setLang,go}){
  const [open,setOpen]=useState(false);
  const items=[['home',h.nav.home],['how',h.nav.how],['faq',h.nav.faq],['contact',h.nav.contact]];
  const pick=k=>{setOpen(false);go(k)};
  return <header><div className="w bar">
    <button className="brand" onClick={()=>pick('home')} aria-label="AnkVeda"><Logo/></button>
    <nav className={'nav'+(open?' open':'')} aria-label="Main">
      {items.map(([k,n])=><button key={k} onClick={()=>pick(k)}>{n}</button>)}
      <button className="navcta" onClick={()=>pick('report')}>{h.nav.report}</button>
    </nav>
    <div className="barr"><LangSwitch lang={lang} setLang={setLang}/>
      <button className="burger" aria-expanded={open} aria-label={h.nav.menu} onClick={()=>setOpen(!open)}><span/><span/><span/></button></div>
  </div></header>}

export default function App(){
  const [lang,setLang]=useState(()=>{try{return localStorage.getItem('av-lang')||'mr'}catch{return 'mr'}});
  const [stage,setStage]=useState('form'); // form | loading | result
  const [res,setRes]=useState(null);
  const [page,setPage]=useState(null);
  const t=C[lang];
  useEffect(()=>{try{localStorage.setItem('av-lang',lang)}catch{};document.documentElement.lang=lang;document.body.className=lang},[lang]);
  useEffect(()=>{window.scrollTo(0,0)},[stage]);
  const [token,setToken]=useState(null);const [order,setOrder]=useState(null);const [busy,setBusy]=useState(false);const [perr,setPerr]=useState(false);
  const goTo=k=>{
    if(k==='contact'){setPage('contact');window.scrollTo({top:0,behavior:'smooth'});return}
    setPage(null);if(stage!=='form')setStage('form');
    setTimeout(()=>{
      if(k==='home')return window.scrollTo({top:0,behavior:'smooth'});
      if(k==='report'){window.scrollTo({top:0,behavior:'smooth'});return setTimeout(()=>document.querySelector('.form input')?.focus(),400)}
      document.getElementById(k)?.scrollIntoView({behavior:'smooth'})},120)};
  const submit=f=>{const r=analyze(f);setStage('loading');setTimeout(()=>{setRes({...r,name:f.name,form:f});setStage('result')},2400)};
  // returning buyer who closed the tab after paying
  useEffect(()=>{let id;try{id=localStorage.getItem('av-order')}catch{}if(!id)return;
    fetch('/api/status/'+id).then(r=>r.json()).then(j=>{if(j.paid){let f=null;try{f=JSON.parse(localStorage.getItem('av-form')||'null')}catch{}
      if(f)setRes(x=>x||{form:f,name:f.name});setToken(j.token);setStage('paid')}}).catch(()=>{})},[]);
  const loadRzp=()=>new Promise((ok,no)=>{if(window.Razorpay)return ok();const sc=document.createElement('script');sc.src='https://checkout.razorpay.com/v1/checkout.js';sc.onload=ok;sc.onerror=no;document.body.appendChild(sc)});
  const done=async p=>{setStage('verifying');try{const v=await api('/api/verify',p);setToken(v.token);setStage('paid')}catch{setPerr(true);setStage('result')}};
  // Step 1: create the order on the Java backend, then show the payment page (UPI QR).
  const buy=async()=>{if(busy||!res)return;
    if(DEMO){setStage('verifying');setTimeout(()=>{setToken('demo');setStage('paid')},1200);return}
    setBusy(true);setPerr(false);
    try{const o=await api('/api/order',res.form);try{localStorage.setItem('av-order',o.orderId);localStorage.setItem('av-form',JSON.stringify(res.form))}catch{}
      setOrder(o);setStage('pay')}catch{setPerr(true)}finally{setBusy(false)}};
  // Alternative on the payment page: Razorpay Checkout popup (UPI app / card / net banking)
  const checkout=async()=>{if(!order)return;
    try{if(order.mock){await done(await api('/api/mock-pay',{orderId:order.orderId}));return}
      await loadRzp();
      new window.Razorpay({key:order.keyId,amount:order.amount,currency:'INR',order_id:order.orderId,name:'AnkVeda',description:'Name Report (PDF)',
        prefill:res?.form?.wa?{contact:'91'+res.form.wa}:{},theme:{color:'#9A3412'},handler:done}).open();
    }catch{setPerr(true)}};
  const paidNow=tok=>{setToken(tok);setStage('paid')};
  return <>
    <div className="strip">{t.top.map((x,i)=><span key={i}>{x}</span>)}</div><div className="zodiac" aria-hidden="true">{SIGNS.map((g,i)=><span key={i}>{g}</span>)}</div>
    <Navbar h={H[lang]} lang={lang} setLang={setLang} go={goTo}/>
    <main>
      {page&&<InfoPage h={H[lang]} lang={lang} k={page} back={()=>setPage(null)}/>}
      {!page&&stage==='form'&&<Landing t={t} h={H[lang]} onSubmit={submit}/>}
      {!page&&stage==='loading'&&<Loading t={t}/>}
      {!page&&stage==='pay'&&order&&<PayPage p={PT[lang]} order={order} form={res?.form} onPaid={paidNow} back={()=>setStage('result')} checkout={checkout}/>}
      {!page&&stage==='result'&&<Result t={t} r={res} buy={buy} busy={busy} perr={perr} again={()=>setStage('form')}/>}
      {!page&&stage==='verifying'&&<section><div className="w narrow"><div className="card load"><div className="spin"/><p>{t.pwait}</p></div></div></section>}
      {!page&&stage==='paid'&&<Paid t={t} token={token} lang={lang} form={res?.form}/>}
    </main>
    <footer><div className="w"><Logo/><nav className="flinks">{['privacy','terms','contact'].map(k=><button key={k} onClick={()=>setPage(k)}>{H[lang].links[k]}</button>)}</nav><p>{t.foot}</p></div></footer>
    {!page&&stage==='result'&&<div className="sticky"><button className="btn" disabled={busy} onClick={buy}>{busy?t.payBusy:(res&&!res.aligned&&suggest(res.name,res.mulank,res.bhagyank,5).length>0?t.dnCta:t.sticky)}</button><small>{t.secure}</small></div>}
  </>;
}

function Landing({t,h,onSubmit}){
  const [f,setF]=useState({name:'',d:'',m:'',y:'',wa:'',hr:'',mi:'',ap:'',tobUnk:false,pob:'',plat:'',plon:''});const [err,setErr]=useState('');
  const set=k=>e=>setF({...f,[k]:e.target.value});
  const yr=new Date().getFullYear();
  const go=e=>{e.preventDefault();
    if(!/^[A-Za-z][A-Za-z\s.'-]*$/.test(f.name.trim())||calculateNameNumber(f.name,'chaldean').error)return setErr(t.eName);
    const D=+f.d,M=+f.m,Y=+f.y,dt=new Date(Y,M-1,D);
    if(!D||!M||!Y||dt.getDate()!==D||dt.getMonth()!==M-1||dt>new Date())return setErr(t.eDob);
    if(f.wa&&!/^[6-9]\d{9}$/.test(f.wa))return setErr(t.eWa);
    // birth time: either all three parts, or none / "don't know"
    let tob='';const any=f.hr!==''||f.mi!==''||f.ap!=='';
    if(!f.tobUnk&&any){if(f.hr===''||f.mi===''||f.ap==='')return setErr(t.eTob);
      const h12=+f.hr%12+(f.ap==='PM'?12:0);tob=String(h12).padStart(2,'0')+':'+String(f.mi).padStart(2,'0')}
    const pob=f.pob.trim();if(pob&&!/^[\p{L}\p{N}\s.,'()-]{2,120}$/u.test(pob))return setErr(t.ePob);
    setErr('');onSubmit({name:f.name.trim(),d:D,m:M,y:Y,wa:f.wa,tob,pob,plat:pob?f.plat:'',plon:pob?f.plon:''});};
  return <><section className="hero2"><Mandala className="m1"/><Mandala className="m2"/><div className="w split">
    <div className="left">
      <div className="toprow"><span className="chip">🔢 {t.badge}</span></div>
      <h1><span>{t.h1a}</span><em>{t.h1b}</em></h1>
      <p className="lead">{t.lead}</p>
      <p className="mu small">{t.how}</p>
      <ul className="ticks">{t.pts.map((p,i)=><li key={i}>{p}</li>)}</ul>
    </div>
    <form className="card form" onSubmit={go} noValidate>
      <h2>{t.fh}</h2><p className="mu">{t.fs}</p>
      <label>{t.fn} <i>*</i><input value={f.name} onChange={set('name')} placeholder={t.fnp} autoComplete="off"/></label>
      <fieldset><legend>{t.dob} <i>*</i></legend><div className="dob">
        <select value={f.d} onChange={set('d')}><option value="">{t.day}</option>{Array.from({length:31},(_,i)=><option key={i}>{i+1}</option>)}</select>
        <select value={f.m} onChange={set('m')}><option value="">{t.mon}</option>{t.months.map((m,i)=><option key={i} value={i+1}>{m}</option>)}</select>
        <select value={f.y} onChange={set('y')}><option value="">{t.yr}</option>{Array.from({length:100},(_,i)=><option key={i}>{yr-i}</option>)}</select></div></fieldset>
      <fieldset><legend>{t.tob}</legend><div className="dob tob">
        <select value={f.hr} disabled={f.tobUnk} onChange={set('hr')}><option value="">{t.hr}</option>{Array.from({length:12},(_,i)=><option key={i} value={i+1}>{String(i+1).padStart(2,'0')}</option>)}</select>
        <select value={f.mi} disabled={f.tobUnk} onChange={set('mi')}><option value="">{t.mi}</option>{Array.from({length:60},(_,i)=><option key={i} value={i}>{String(i).padStart(2,'0')}</option>)}</select>
        <select value={f.ap} disabled={f.tobUnk} onChange={set('ap')}><option value="">{t.ap}</option><option value="AM">AM</option><option value="PM">PM</option></select></div>
        <label className="chk"><input type="checkbox" checked={f.tobUnk} onChange={e=>setF({...f,tobUnk:e.target.checked,hr:'',mi:'',ap:''})}/> {t.tobUnk}</label>
        <small>{t.tobN}</small></fieldset>
      <PlaceInput t={t} value={f.pob} onText={v=>setF(x=>({...x,pob:v,plat:'',plon:''}))} onPick={o=>setF(x=>({...x,pob:o.label,plat:o.lat,plon:o.lon}))}/>
      <label>{t.wa}<span className="wa"><b>+91</b><input inputMode="numeric" maxLength={10} value={f.wa} onChange={e=>setF({...f,wa:e.target.value.replace(/\D/g,'')})} placeholder="98XXXXXXXX"/></span><small>{t.wan}</small></label>
      {err&&<p className="err" role="alert">{err}</p>}
      <button className="btn big" type="submit">{t.go}</button><p className="safe">{t.safe}</p>
    </form></div></section><HomeSections t={t} h={h}/></>;
}

function PlaceInput({t,value,onText,onPick}){
  const [list,setList]=useState([]);const [open,setOpen]=useState(false);const [busy,setBusy]=useState(false);const ref=useRef(null);
  useEffect(()=>{const q=value.trim();if(q.length<2||!open){setList([]);return}
    const ctl=new AbortController();setBusy(true);
    const id=setTimeout(()=>searchPlaces(q,ctl.signal).then(r=>{setList(r);setBusy(false)}).catch(e=>{if(e?.name!=='AbortError')setBusy(false)}),350);
    return()=>{clearTimeout(id);ctl.abort()}},[value,open]);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setOpen(false)};document.addEventListener('mousedown',h);return()=>document.removeEventListener('mousedown',h)},[]);
  return <label className="place" ref={ref}>{t.pob}
    <input value={value} onFocus={()=>setOpen(true)} onChange={e=>{onText(e.target.value);setOpen(true)}} placeholder={t.pobp} autoComplete="off" role="combobox" aria-expanded={open&&list.length>0}/>
    {open&&(list.length>0||busy)&&<ul className="plist" role="listbox">{busy&&!list.length&&<li className="mu">…</li>}{list.map((o,i)=><li key={i} role="option" onMouseDown={e=>{e.preventDefault();onPick(o);setOpen(false)}}>{o.label}</li>)}</ul>}
    <small>{t.pobN}</small></label>}

function Loading({t}){const [i,setI]=useState(0);
  useEffect(()=>{const id=setInterval(()=>setI(x=>Math.min(x+1,t.load.length-1)),800);return()=>clearInterval(id)},[t]);
  return <section><div className="w narrow"><div className="card load"><div className="spin"/><p aria-live="polite">{t.load[i]}</p></div></div></section>}

function Result({t,r,buy,busy,perr,again}){
  const {number:n,mulank:m,bhagyank:b,personalYear:p,aligned}=r;const tr=t.trait;
  const cnt=aligned?0:suggest(r.name,m,b,5).length;const cta=!aligned&&cnt>0?t.dnCta:t.cta;
  const area=(a,i)=>{const intro=typeof a[1]==='function'?a[1](n,b,m,p):a[1];const k=i===0?n:i===1?b:i===2?m:i===3?p:null;
    return <div className="card area" key={i}><h3>{a[0]}</h3><p>{intro}{k&&<> <b>{tr[k]}</b>.</>}</p><div className="blur" aria-hidden="true"><i/><i/><i/><span>{t.lock}</span></div></div>};
  return <>
  <section><div className="w narrow"><button className="link" onClick={again}>{t.again}</button>
    <div className={'card verdict '+(aligned?'ok':'warn')}><small>{t.resFor(r.name)}</small><h1>{aligned?t.yes:t.no}</h1><p>{aligned?t.yesT:t.noT}</p><p className="mu">{t.note}</p></div>
    {!aligned&&<div className="card dosh"><h2>{t.dnH}</h2><p>{t.dnT(cnt)}</p>
      {cnt>0&&<div className="blur" aria-hidden="true"><i/><i/><i/><span>{t.dnLock}</span></div>}
      <button className="btn big" disabled={busy} onClick={buy}>{busy?t.payBusy:cta}</button>
      {perr&&<p className="err" role="alert">{t.payErr}</p>}<p className="mu small">{t.dnNote}</p></div>}
    <div className="card"><h2>{t.yn}</h2><div className="nums">
      {[[t.nn,n],[t.mu,m],[t.bh,b]].map(([l,v],i)=><div key={i}><span>{l}</span><strong>{v}</strong></div>)}</div>
      <p className="mu center">{t.sum(r.total)}</p></div>
    <div className="card pair"><h2>{t.pairH(n,m,b)}</h2><p>{t.pairT(n,m,b)}</p></div>
    <div className="card why"><h2>{t.whyH}</h2><p>{t.whyT}</p></div>
  </div></section>
  <section><div className="w"><h2 className="center">{t.lockH}</h2><p className="mu center">{t.lockS}</p>
    <div className="grid2">{t.areas.map(area)}</div><p className="center"><button className="btn big" disabled={busy} onClick={buy}>{busy?t.payBusy:cta}</button></p><p className="safe">{t.secure}</p>{perr&&<p className="err center" role="alert">{t.payErr}</p>}</div></section>
  <section className="alt"><div className="w narrow"><h2 className="center">{t.baH}</h2><p className="mu center">{t.baS}</p>
    <div className="ba">{['ASHISH','AASHISH'].map((nm,i)=>{const x=calculateNameNumber(nm,'chaldean');
      return <div key={i} className={'card '+(i?'after':'before')}><small>{i?t.after:t.before}</small><div className="nm">{nm}</div><div className="mu">{x.letters.map(l=>l.value).join(' + ')} = {x.total} → <b>{x.number}</b></div></div>})}</div></div></section>
  <section><div className="w narrow"><h2 className="center">{t.benH}</h2><div className="grid2">{t.ben.map((x,i)=><div className="card tick" key={i}>{x}</div>)}</div></div></section>
  <section className="alt"><div className="w"><h2 className="center">{t.forH}</h2><div className="grid2">
    <div className="card yes"><h3>{t.yesH}</h3><ul>{t.forY.map((x,i)=><li key={i}>{x}</li>)}</ul></div>
    <div className="card no"><h3>{t.noH}</h3><ul>{t.forN.map((x,i)=><li key={i}>{x}</li>)}</ul></div></div></div></section>
  <Faq title={t.faqH} items={t.faq}/>
  <section><div className="w narrow"><div className="band"><h2>{t.endH}</h2><p>{t.endT}</p><button className="btn gold" disabled={busy} onClick={buy}>{busy?t.payBusy:cta}</button></div></div></section></>;
}

function Faq({title,items,id}){const [o,setO]=useState(0);
  return <section id={id}><div className="w narrow"><h2 className="center">{title}</h2>{items.map((f,i)=><div className={'fq'+(o===i?' open':'')} key={i}>
    <button aria-expanded={o===i} onClick={()=>setO(o===i?-1:i)}>{f[0]}<span>{o===i?'−':'+'}</span></button>{o===i&&<p>{f[1]}</p>}</div>)}</div></section>}

const top=()=>{window.scrollTo({top:0,behavior:'smooth'});setTimeout(()=>document.querySelector('.form input')?.focus(),400)};
function HomeSections({t,h}){
  const ex=['ASHISH','AASHISH'].map(n=>calculateNameNumber(n,'chaldean'));
  return <>
  <section><div className="w narrow"><h2>{h.symH}</h2><ul className="plain">{h.sym.map((x,i)=><li key={i}>{x}</li>)}</ul><p className="mu">{h.symN}</p></div></section>
  <section className="alt"><div className="w narrow"><h2>{h.ideaH}</h2>{h.idea.map((x,i)=><p key={i}>{x}</p>)}<p><b>{h.ideaB}</b></p></div></section>
  <section><div className="w narrow"><h2 className="center">{h.oneH}</h2><p className="mu center">{h.oneS}</p>
    <div className="ba">{ex.map((x,i)=><div key={i} className={'card '+(i?'after':'before')}><small>{i?t.after:t.before}</small><div className="nm">{i?<>A<em>A</em>SHISH</>:'ASHISH'}</div><div className="mu">{x.letters.map(l=>l.value).join('+')} = {x.total} → <b>{x.number}</b></div></div>)}</div>
    <p className="mu center small">{h.oneCap}</p><p className="center"><button className="btn" onClick={top}>{h.oneCta}</button></p></div></section>
  <section className="alt"><div className="w narrow"><h2>{h.freeH}</h2><ul className="ticks">{t.pts.map((p,i)=><li key={i}>{p}</li>)}</ul>
    <div className="card notice"><b>{h.notH}.</b> {h.notT}</div></div></section>
  <section id="how"><div className="w narrow"><h2 className="center">{h.stH}</h2><div className="steps">{h.st.map((x,i)=><div className="card" key={i}><div className="ic">{x[0]}</div><h3>{x[1]}</h3><p className="mu">{x[2]}</p></div>)}</div></div></section>
  <section className="alt"><div className="w narrow"><h2>{h.trH}</h2><ul className="ticks">{h.tr.map((p,i)=><li key={i}>{p}</li>)}</ul></div></section>
  <section><div className="w narrow"><h2 className="center">{h.nlH}</h2><div className="grid2">{h.nl.map((x,i)=><div className="card tick" key={i}>{x}</div>)}</div></div></section>
  <Faq id="faq" title={h.faqH} items={h.faq}/>
  <section><div className="w narrow"><div className="band"><h2>{h.endH}</h2><p>{h.endT}</p><button className="btn gold" onClick={top}>{h.endCta}</button><p className="s">{h.endS}</p></div></div></section></>;
}
function InfoPage({h,lang,k,back}){
  const pg=PAGES[lang][k];const L=pg.labels;const C=CONTACT;
  return <section><div className="w narrow"><button className="link" onClick={back}>{h.back}</button>
    <div className="card legal"><h1>{pg.title}</h1>
      {pg.sections.map((x,i)=><div key={i}>{x.h&&<h2>{x.h}</h2>}
        {x.p&&x.p.map((t,j)=><p key={j}>{t}</p>)}
        {x.ul&&<ul>{x.ul.map((t,j)=><li key={j}>{t}</li>)}</ul>}
        {x.p2&&x.p2.map((t,j)=><p key={'b'+j}>{t}</p>)}</div>)}
      {pg.card&&<div className="contact">
        <a className="crow" href={'mailto:'+C.email}><span>✉️ {L.email}</span><b>{C.email}</b></a>
        <a className="crow" href={'tel:'+C.phone.replace(/\s/g,'')}><span>📞 {L.phone}</span><b>{C.phone}</b></a>
        <a className="btn" href={'https://wa.me/'+C.whatsapp} target="_blank" rel="noreferrer">💬 {L.wa}</a>
        <p className="mu small">🕘 {L.hours}: {C.hours[lang]}</p>
        {C.address&&<p className="mu small">📍 {L.addr}: {C.address}</p>}
        <p className="mu small">{L.pay}</p></div>}
      {k!=='contact'&&<p className="mu small">{lang==='mr'?'अपडेट':'Updated'}: {C.updated[lang]}</p>}
    </div></div></section>}

// Payment page: Razorpay UPI QR (scan to pay), polls the backend until the payment is confirmed.
function PayPage({p,order,form,onPaid,back,checkout}){
  const [qr,setQr]=useState(null);const [err,setErr]=useState(false);const [left,setLeft]=useState(0);
  const mk=async()=>{setErr(false);setQr(null);try{setQr(await api(`/api/order/${order.orderId}/qr`,{}))}catch{setErr(true)}};
  useEffect(()=>{mk()},[order.orderId]);
  useEffect(()=>{const id=setInterval(async()=>{try{const j=await fetch('/api/status/'+order.orderId).then(r=>r.json());if(j.paid&&j.token)onPaid(j.token)}catch{}},3000);return()=>clearInterval(id)},[order.orderId]);
  useEffect(()=>{if(!qr)return;const tick=()=>setLeft(Math.max(0,Math.round((qr.expiresAt-Date.now())/1000)));tick();const id=setInterval(tick,1000);return()=>clearInterval(id)},[qr]);
  const expired=qr&&left===0;const mm=String(Math.floor(left/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0');
  return <section><div className="w narrow"><button className="link" onClick={back}>{p.back}</button>
    <div className="card pay"><h1>{p.h}</h1><p className="mu">{p.sub}</p>
      <div className="sumrow"><span>{p.for}</span><b>{form?.name}</b></div>
      <div className="sumrow"><span>{p.amt}</span><b className="amt">₹{order.amount/100}</b></div>
      <h2>{p.scan}</h2><p className="mu small">{p.scanS}</p>
      <div className="qrbox">
        {!qr&&!err&&<div className="qrph"><div className="spin"/><p>{p.loading}</p></div>}
        {err&&<div className="qrph"><p className="err">{p.err}</p><button className="btn" onClick={mk}>{p.retry}</button></div>}
        {qr&&!expired&&(qr.mock||qr.imageUrl==='mock'?<div className="qrph"><p>▦ QR (test)</p><p className="mu small">{p.mockT}</p></div>:<img src={qr.imageUrl} alt="UPI QR" width="260" height="260"/>)}
        {expired&&<div className="qrph"><p>{p.expired}</p><button className="btn" onClick={mk}>{p.renew}</button></div>}
      </div>
      {qr&&!expired&&<p className="center mu small">{p.left} <b>{mm}</b></p>}
      <p className="center waiting" aria-live="polite"><span className="dot"/>{p.wait}</p><p className="center mu small">{p.waitS}</p>
      <div className="or"><span>{p.or}</span></div>
      <button className="btn big" onClick={checkout}>{order.mock?p.mockB:p.alt}</button>
      <p className="mu small center">{order.mock?p.mockT:p.altS}</p>
      <p className="mu small center">{p.after}</p><p className="safe">{p.secure}</p>
    </div></div></section>}

function Paid({t,token,lang,form}){
  const href=`/api/report/${token}?lang=${lang}`;const demo=token==='demo';
  const [st,setSt]=useState(demo?'idle':'auto'); // idle | busy | auto | err
  const fname=`AnkVeda-Report-${(form?.name||'name').replace(/\W+/g,'_')}.pdf`;
  // Fallback: build the PDF in the browser (demo preview, or if the server could not make it)
  const local=async()=>{if(!form){setSt('err');return}setSt('busy');
    try{await saveBlob(await makePdfBlob(form,lang),fname);setSt('idle')}catch(e){console.error(e);setSt('err')}};
  // Real flow: ask the server for the PDF; if that fails and we still have the form, fall back to the browser PDF
  const server=async()=>{setSt('busy');
    try{const r=await fetch(href);if(!r.ok||!(r.headers.get('content-type')||'').includes('pdf'))throw new Error('x');await saveBlob(await r.blob(),fname);setSt('idle')}
    catch{if(form)return local();setSt('err')}};
  useEffect(()=>{if(!demo)server()},[token]);
  const click=()=>demo?local():server();
  return <section><div className="w narrow"><div className="card paid"><div className="big-star">✦</div><h1>{t.paidH}</h1><p>{t.paidT}</p>
    <button className="btn gold big" disabled={st==='busy'} onClick={click}>{st==='busy'?t.pdfBusy:t.dl}</button>
    {st==='err'&&<p className="err" role="alert">{t.pdfErr}</p>}<p className="mu small">{t.dlN}</p></div></div></section>}
const SIGNS='♈♉♊♋♌♍♎♏♐♑♒♓'.split('').map(c=>c+'\uFE0E');
export function Mandala({className=''}){return <svg className={'mandala '+className} viewBox="-300 -300 600 600" aria-hidden="true">
  <g fill="none" stroke="currentColor" strokeWidth="1"><circle r="290"/><circle r="248"/><circle r="205" strokeDasharray="2 6"/><circle r="150"/><circle r="96"/>
  {Array.from({length:12},(_,i)=><line key={i} x1="0" y1="-96" x2="0" y2="-248" transform={`rotate(${i*30})`}/>)}
  {Array.from({length:12},(_,i)=><path key={'p'+i} d="M0 -150 Q22 -123 0 -96 Q-22 -123 0 -150Z" transform={`rotate(${i*30+15})`}/>)}</g>
  {SIGNS.map((g,i)=><text key={i} transform={`rotate(${i*30}) translate(0 -268)`} textAnchor="middle" fontSize="22" fill="currentColor" dominantBaseline="middle">{g}</text>)}</svg>}