// import {analyze,FR} from './analyze.js';
// import {N} from '../data/meanings.js';
// import {X} from '../data/extras.js';
// import {weekday,loShu,LOSHU,innerOuter,luckyDates,personalCycle,personalMonth,relation,chartSvg} from './extras.js';
// import {houses} from './kundali.js';
// const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// const dg=(l,x)=>l==='mr'?String(x).replace(/\d/g,d=>'०१२३४५६७८९'[d]):String(x);

// const L={
//  mr:{t:'तुमचा AnkVeda नाव अहवाल',for:'यांच्यासाठी तयार केलेला',gen:'तयार केल्याची तारीख',
//   s1:'तुमचे तीन अंक',nn:'नावाचा अंक',mu:'मूलांक',bh:'भाग्यांक',str:'बलस्थाने',chl:'आव्हाने',refl:'विचार करण्यासाठी प्रश्न',
//   s2:'नाव आणि जन्मांक यांचा संबंध',yes:'तुमच्या नावाचा अंक मूलांक आणि भाग्यांक दोन्हींशी सुसंगत मानल्या जाणाऱ्या अंकांमध्ये येतो.',
//   no:'तुमच्या नावाचा अंक मूलांक किंवा भाग्यांकाशी सुसंगत मानल्या जाणाऱ्या अंकांमध्ये येत नाही. याचा अर्थ काही चुकीचे आहे असा नाही; हे अंक थोड्या वेगळ्या स्वभावाचे आहेत.',
//   fr:'सुसंगत मानले जाणारे अंक',s3:'स्पेलिंगचे पर्याय',s3i:'खालील पर्यायांत नावातील एकाच शब्दात छोटा बदल केला आहे. प्रत्येकाचा अंक कॅल्डियन तक्त्यानुसार काढला आहे.',
//   none:'या पद्धतीनुसार छोट्या बदलाने दोन्ही अंकांशी सुसंगत येणारा पर्याय सापडला नाही. नाव आहे तसे ठेवणे हा देखील पूर्णपणे योग्य निर्णय आहे.',
//   cur:'सध्याचे नाव',opt:'पर्याय',letters:'अक्षरांची बेरीज',num:'नावाचा अंक',
//   s4:'पर्याय वापरताना लक्षात ठेवा',g:['उच्चार नैसर्गिक राहतो का ते आधी तपासा. नाव वाचायला आणि म्हणायला सोपे असले पाहिजे.','कायदेशीर कागदपत्रांतील नाव बदलणे हा मोठा निर्णय आहे. तो करण्यापूर्वी सर्व बाजूंचा विचार करा. हा अहवाल असा कोणताही बदल सुचवत नाही.','वापरायचे ठरवले तर सोशल मीडिया, सही किंवा नवीन ठिकाणी नावापासून सुरुवात करता येते, आणि सातत्य ठेवा.','काही आठवडे वापरून पाहा आणि तुम्हाला कसे वाटते ते निरीक्षण करा.'],
//   s5:'यंदाचे तुमचे वैयक्तिक वर्ष',py:y=>`यंदा तुमचे वैयक्तिक वर्ष ${y} आहे.`,
//   disc:'अंकशास्त्र ही परंपरेवर आधारित समजूत आहे. हा अहवाल निश्चित भविष्य, आरोग्य, आर्थिक किंवा कायदेशीर सल्ला नाही, आणि कोणत्याही निकालाची हमी देत नाही.',
//   method:'पद्धत: कॅल्डियन तक्ता (अक्षर १–८). मूलांक = जन्मदिवसाचा अंक. भाग्यांक = पूर्ण जन्मतारखेतील अंकांची बेरीज एका अंकावर.'},
//  en:{t:'Your AnkVeda Name Report',for:'Prepared for',gen:'Generated on',
//   s1:'Your three numbers',nn:'Name number',mu:'Mulank',bh:'Bhagyank',str:'Strengths',chl:'Challenges',refl:'Question to reflect on',
//   s2:'How your name and birth numbers relate',yes:'Your name number is among the numbers treated as compatible with both your Mulank and Bhagyank.',
//   no:'Your name number is not among the numbers treated as compatible with your Mulank or Bhagyank. That does not mean anything is wrong; these numbers simply have different temperaments.',
//   fr:'Numbers treated as compatible',s3:'Spelling options',s3i:'Each option below changes one word of your name slightly. Every number is worked out with the Chaldean table.',
//   none:'By this method no small spelling change was found that suits both numbers. Keeping your name exactly as it is remains a perfectly valid choice.',
//   cur:'Current name',opt:'Option',letters:'Letter values',num:'Name number',
//   s4:'If you try an option',g:['Check that the pronunciation stays natural. A name should read and sound easy.','Changing your name on legal documents is a big decision to weigh carefully. This report does not suggest any such change.','If you decide to try one, you could start with social media, a signature or new places, and stay consistent.','Try it for a few weeks and observe how it feels to you.'],
//   s5:'Your personal year',py:y=>`This year your personal year number is ${y}.`,
//   disc:'Numerology is a tradition-based belief, not a prediction. This report is not future-telling, health, financial or legal advice and guarantees no outcome.',
//   method:'Method: Chaldean table (letters 1–8). Mulank = birth-day number. Bhagyank = digits of the full birth date reduced to one digit.'}};

// export function reportHtml(r,sug,lang,fontFace='',ctx={}){
//   const t=L[lang],M=N[lang],d=x=>dg(lang,x),meaning=k=>M[k-1];
//   const {form=null,k=null,time=null}=ctx;const E=X[lang],T=E.tx;
//   const card=(label,k)=>{const m=meaning(k);return `<div class="num"><div class="nl">${t[label]}</div><div class="nv">${d(k)}</div><h3>${esc(m[0])}</h3><p>${esc(m[1])}</p><p><b>${t.str}:</b> ${esc(m[2])}</p><p><b>${t.chl}:</b> ${esc(m[3])}</p><p class="q"><b>${t.refl}:</b> ${esc(m[4])}</p></div>`};
//   const rows=[{...r,name:r.input,cur:1},...sug].map((x,i)=>`<tr class="${i?'':'cur'}"><td>${i?t.opt+' '+d(i):t.cur}</td><td class="nm">${esc(x.name||x.input)}</td><td>${x.letters.map(l=>d(l.value)).join(' + ')} = ${d(x.total)}</td><td><b>${d(x.number)}</b></td></tr>`).join('');
//   /* ---------- extended sections ---------- */
//   const pad2=n=>String(n).padStart(2,'0');
//   const degTxt=x=>`${d(Math.floor(x))}°${d(pad2(Math.floor((x%1)*60)))}′`;
//   const mmYY=dt=>`${d(pad2(dt.getMonth()+1))}/${d(dt.getFullYear())}`;
//   const clock=tm=>{const h=tm.hh%12||12;return lang==='mr'?`${d(pad2(h))}:${d(pad2(tm.mm))} ${tm.hh<12?'AM (पूर्वान्ह)':'PM (अपरान्ह)'}`:`${pad2(h)}:${pad2(tm.mm)} ${tm.hh<12?'AM':'PM'}`};
//   const dobTxt=form?`${d(form.d)} ${lang==='mr'?['जानेवारी','फेब्रुवारी','मार्च','एप्रिल','मे','जून','जुलै','ऑगस्ट','सप्टेंबर','ऑक्टोबर','नोव्हेंबर','डिसेंबर'][form.m-1]:['January','February','March','April','May','June','July','August','September','October','November','December'][form.m-1]} ${d(form.y)}`:'';
//   const wd=form?weekday(form.y,form.m,form.d):null;
//   const tithiName=n=>n===15?E.full:n===30?E.new:E.tithi[(n-1)%15];
//   const paksha=n=>n<=15?E.shukla:E.krishna;
//   const kv=(rows)=>`<table class="kv">${rows.filter(Boolean).map(([a,b])=>`<tr><th>${a}</th><td>${b}</td></tr>`).join('')}</table>`;

//   // 1. birth snapshot
//   let snap='';
//   if(form){
//     const rows=[[T.dob,dobTxt],[T.vara,E.days[wd]],[T.age,`${d(r.age)} ${T.yrs}`]];
//     if(form.pob)rows.push([T.pob,esc(ctx.place?.label||form.pob)]);
//     rows.push([T.tob,time?clock(time):T.unk]);
//     if(k){rows.push([T.tithi,`${paksha(k.tithiN)} · ${tithiName(k.tithiN)}`],[T.nak,`${E.nak[k.moon.nak]} (${d(k.moon.pada)})`],[T.moon,E.rashi[k.moon.sign]],[T.lagna,k.unknown?'—':E.rashi[k.asc.sign]],[T.sun,E.rashi[k.sun.sign]])}
//     snap=`<h2>${T.snapH}</h2>${kv(rows)}${k&&k.unknown?`<div class="box warn"><p>${T.unkN}</p></div>`:''}`;
//   }

//   // 2. Mulank profile + Bhagyank relation + inner/outer
//   const pf=E.prof[r.mulank],io=innerOuter(r.input),ld=luckyDates(r.mulank,r.bhagyank);
//   const rel=relation(r.mulank,r.bhagyank);
//   const relTxt=rel==='same'?T.bmSame(d(r.mulank)):rel==='friendly'?T.bmFr(d(r.mulank),d(r.bhagyank)):T.bmDiff(d(r.mulank),d(r.bhagyank));
//   const profile=`<h2>${T.numH}</h2><div class="box"><p><b>${T.numS(d(r.mulank))}</b></p></div>${kv([[T.pl,pf.pl],[T.god,pf.god],[T.day,pf.day],[T.col,pf.col],[T.gem,pf.gem],[T.dates,ld.map(d).join(', ')],[T.car,pf.car],[T.rel,pf.rel]])}<p class="small">${T.gemN}</p>`;
//   const bm=`<h2>${T.bmH}</h2><div class="box"><p>${relTxt}</p></div>`;
//   const inout=(io.inner&&io.outer)?`<h2>${T.inH}</h2><div class="two"><div class="num"><div class="nl">${T.inT}</div><div class="nv">${d(io.inner)}</div><h3>${esc(meaning(io.inner)[0])}</h3><p>${esc(meaning(io.inner)[1])}</p><p class="small">${T.inS}</p></div><div class="num"><div class="nl">${T.outT}</div><div class="nv">${d(io.outer)}</div><h3>${esc(meaning(io.outer)[0])}</h3><p>${esc(meaning(io.outer)[1])}</p><p class="small">${T.outS}</p></div></div>`:'';

//   // 3. Lo Shu grid
//   let lo='';
//   if(form){
//     const g=loShu(form,r.mulank,r.bhagyank);
//     const cells=LOSHU.map(row=>`<tr>${row.map(n=>`<td class="${g.count[n]?'has':'no'}">${g.count[n]?String(n).repeat(g.count[n]).split('').map(d).join(''):'·'}</td>`).join('')}</tr>`).join('');
//     lo=`<h2>${T.lsH}</h2><p>${T.lsS}</p><table class="loshu">${cells}</table>`+
//       `<div class="box"><p><b>${T.lsMiss}:</b> ${g.missing.length?g.missing.map(d).join(', '):T.lsNone}</p>${g.missing.length?`<p>${T.lsMissT}</p><ul>${g.missing.map(n=>`<li><b>${d(n)}</b> — ${E.loshu[n]}</li>`).join('')}</ul>`:''}${g.repeated.map(n=>`<p>${T.lsRepT(d(n))}</p>`).join('')}</div>`;
//   }

//   // 4. weekday
//   const vara=form?`<h2>${T.vaH}</h2><div class="box"><p><b>${E.days[wd]}</b> — ${E.dayT[wd]}</p></div>`:'';

//   // 5. kundali
//   let kun='';
//   if(form&&!k){kun=`<h2>${T.kH}</h2><div class="box warn"><p>${T.noplace}</p></div>`}
//   if(k){
//     const h1=houses(k,'D1'),h9=houses(k,'D9');
//     const occ=h=>h.out.map((arr,i)=>[...(h===h1&&!k.unknown&&i===0?[E.asc]:[]),...arr.map(p=>E.pAbbr[['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].indexOf(p)])]);
//     const occ9=h9.out.map((arr,i)=>[...(!k.unknown&&i===0?[E.asc]:[]),...arr.map(p=>E.pAbbr[['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].indexOf(p)])]);
//     const charts=`<div class="charts"><figure>${chartSvg(occ(h1),h1.first,{size:310,title:T.d1})}<figcaption>${k.unknown?T.d1c:T.d1}</figcaption></figure><figure>${chartSvg(occ9,h9.first,{size:310,title:T.d9})}<figcaption>${T.d9}</figcaption></figure></div><p class="small">${T.chartNote}</p>`;
//     const names=E.planets;
//     const prow=[...(k.unknown?[]:[{...k.asc,label:lang==='mr'?'लग्न':'Ascendant'}]),...k.rows.map((x,i)=>({...x,label:names[i]}))];
//     const ptable=`<table class="pt"><tr><th>${T.planet}</th><th>${T.sign}</th><th>${T.deg}</th><th>${T.house}</th><th>${T.nakp}</th></tr>${prow.map(x=>`<tr><td><b>${x.label}</b></td><td>${E.rashi[x.sign]}</td><td>${degTxt(x.deg)}</td><td>${d(x.house)}</td><td>${E.nak[x.nak]} (${d(x.pada)})</td></tr>`).join('')}</table>`;
//     const reads=`<div class="box"><p><b>${T.read}</b></p>${k.unknown?'':`<p>${T.readLagna({s:E.rashi[k.asc.sign],t:E.rashiT[k.asc.sign]})}</p>`}<p>${T.readMoon({s:E.rashi[k.moon.sign],n:E.nak[k.moon.nak],t:E.rashiT[k.moon.sign]})}</p><p>${T.readSun({s:E.rashi[k.sun.sign],t:E.rashiT[k.sun.sign]})}</p></div>`;
//     const flags=`<div class="box"><p><b>${T.mang}</b></p><p>${k.manglik?T.mangY:T.mangN}</p><p><b>${T.sade}</b></p><p>${k.sadeSati?T.sadeY(k.sadePhase):T.sadeN}</p></div>`;
//     const ds=k.dasha,dTable=`<table class="pt"><tr><th>${T.dasha}</th><th>${T.from}</th><th>${T.to}</th></tr>${ds.list.map(x=>`<tr class="${x.planet===ds.cur.planet&&x.start.getTime()===ds.cur.start.getTime()?'cur':''}"><td><b>${names[['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].indexOf(x.planet)]}</b></td><td>${mmYY(x.start)}</td><td>${mmYY(x.end)}</td></tr>`).join('')}</table>`;
//     const pi=p=>['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].indexOf(p);
//     const dTxt=`<div class="box"><p><b>${T.dCur(names[pi(ds.cur.planet)],names[pi(ds.curAd.planet)])}</b></p><p>${E.dashaT[pi(ds.cur.planet)]}</p><p>${T.dBal(names[pi(ds.balance.planet)],d(ds.balance.years.toFixed(1)))}</p></div>`;
//     kun=`<h2>${T.kH}</h2><p>${T.kS} ${T.tzN}</p>${charts}<h2>${T.tbl}</h2>${ptable}${reads}${flags}<h2>${T.dH}</h2><p>${T.dS}</p>${dTable}${dTxt}<p class="small">${T.dNote}</p>`;
//   }

//   // 6. personal years
//   const yr0=new Date().getFullYear(),cyc=form?personalCycle(form,yr0,3):[];
//   const pm=form?personalMonth(r.personalYear,new Date().getMonth()+1):null;
//   const pyears=form?`<h2>${T.pyH}</h2><p>${T.pyS}</p><table class="pt"><tr><th>${T.year}</th><th>${T.pnum}</th><th>${T.theme}</th></tr>${cyc.map(c=>`<tr class="${c.year===yr0?'cur':''}"><td><b>${d(c.year)}</b></td><td>${d(c.num)}</td><td>${esc(meaning(c.num)[0])} — ${esc(meaning(c.num)[1])}</td></tr>`).join('')}</table><p>${T.pyM(d(pm))} ${T.pyUse}</p>`:'';

//   const coverExtra=form?`<p>${dobTxt}${time?' · '+clock(time):''}${form.pob?' · '+esc(ctx.place?.label||form.pob):''}</p>`:'';

//   return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
// ${fontFace}
// @page{size:A4;margin:16mm 14mm}*{box-sizing:border-box}
// body{font-family:NS,'Noto Sans Devanagari',Inter,sans-serif;color:#3A2418;font-size:11.5pt;line-height:1.7;margin:0}
// .cover{height:255mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;border:2px solid #C8932B;border-radius:14px;background:linear-gradient(#FFFBF3,#FFF1E3);page-break-after:always}
// .cover .star{font-size:46pt;color:#C8932B}.cover h1{font-size:26pt;color:#9A3412;margin:8px 0}.cover .n{font-size:20pt;color:#C8932B;font-weight:700}.cover p{color:#8A6A58;margin:4px}
// h2{break-after:avoid;color:#9A3412;border-bottom:2px solid #F2E1CC;padding-bottom:4px;margin:22px 0 10px;font-size:16pt}
// .num{border:1px solid #F2E1CC;border-radius:12px;padding:12px 16px;margin:10px 0;background:#FFFAF2;break-inside:avoid}.num h3{margin:2px 0;color:#9A3412}.num p{margin:3px 0}
// .nl{color:#8A6A58;font-size:10pt}.nv{float:right;font-size:30pt;font-weight:700;color:#C8932B;line-height:1}
// table{width:100%;border-collapse:collapse;margin:10px 0;break-inside:avoid}th,td{border:1px solid #F2E1CC;padding:7px 9px;text-align:left;font-size:10.5pt}th{background:#FFF1E3}
// tr.cur td{background:#FFF6E0}.nm{font-weight:700;letter-spacing:.04em}
// .box{background:#FFF1E3;border-radius:10px;padding:10px 14px;margin:8px 0;break-inside:avoid}.box.warn{background:#FFF6E0;border:1px dashed #C8932B}ul{padding-left:20px}
// .small{font-size:9.5pt;color:#8A6A58}
// table.kv th{width:34%;background:#FFF8EC;font-weight:600}
// table.loshu{width:240px;margin:12px auto}table.loshu td{width:80px;height:64px;text-align:center;font-size:20pt;font-weight:700;color:#9A3412;background:#FFFAF2}table.loshu td.no{color:#D8C3A8;background:#FBF5EC}
// .two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
// .charts{display:flex;justify-content:space-around;gap:10px;margin:10px 0;break-inside:avoid}.charts figure{margin:0;text-align:center}.charts figcaption{font-weight:700;color:#9A3412;font-size:10.5pt}
// .foot{margin-top:24px;font-size:9pt;color:#8A6A58;border-top:1px solid #F2E1CC;padding-top:8px}
// </style></head><body>
// <div class="cover"><div class="star">✦</div><p>AnkVeda</p><h1>${t.t}</h1><p>${t.for}</p><div class="n">${esc(r.input)}</div>${coverExtra}<p>${t.gen}: ${new Date().toLocaleDateString(lang==='mr'?'mr-IN':'en-IN')}</p></div>
// ${snap}
// <h2>${t.s1}</h2>${card('nn',r.number)}${card('mu',r.mulank)}${card('bh',r.bhagyank)}
// ${inout}
// ${bm}
// <h2>${t.s2}</h2><div class="box"><p>${r.aligned?t.yes:t.no}</p><p><b>${t.nn} ${d(r.number)}</b> · ${t.mu} ${d(r.mulank)} → ${t.fr}: ${FR[r.mulank].map(d).join(', ')} · ${t.bh} ${d(r.bhagyank)} → ${FR[r.bhagyank].map(d).join(', ')}</p></div>
// ${profile}
// ${lo}
// ${vara}
// ${kun}
// <h2>${t.s3}</h2><p>${sug.length?t.s3i:t.none}</p>${sug.length?`<table><tr><th></th><th>Name</th><th>${t.letters}</th><th>${t.num}</th></tr>${rows}</table>`:''}
// <h2>${t.s4}</h2><ul>${t.g.map(x=>`<li>${x}</li>`).join('')}</ul>
// <h2>${t.s5}</h2><p>${t.py(d(r.personalYear))} ${esc(meaning(r.personalYear)[1])}</p>
// ${pyears}
// <div class="foot"><p>${t.method}</p><p>${t.disc}</p></div></body></html>`;
// }
import {analyze,FR} from './analyze.js';
import {N} from '../data/meanings.js';
import {X} from '../data/extras.js';
import {weekday,loShu,LOSHU,innerOuter,luckyDates,personalCycle,personalMonth,relation,chartSvg} from './extras.js';
import {houses} from './kundali.js';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const dg=(l,x)=>l==='mr'?String(x).replace(/\d/g,d=>'०१२३४५६७८९'[d]):String(x);

const L={
 mr:{t:'तुमचा AnkVeda नाव अहवाल',for:'यांच्यासाठी तयार केलेला',gen:'तयार केल्याची तारीख',
  s1:'तुमचे तीन अंक',nn:'नावाचा अंक',mu:'मूलांक',bh:'भाग्यांक',str:'बलस्थाने',chl:'आव्हाने',refl:'विचार करण्यासाठी प्रश्न',
  s2:'नाव आणि जन्मांक यांचा संबंध',yes:'तुमच्या नावाचा अंक मूलांक आणि भाग्यांक दोन्हींशी सुसंगत मानल्या जाणाऱ्या अंकांमध्ये येतो.',
  no:'तुमच्या नावाचा अंक मूलांक किंवा भाग्यांकाशी सुसंगत मानल्या जाणाऱ्या अंकांमध्ये येत नाही. याचा अर्थ काही चुकीचे आहे असा नाही; हे अंक थोड्या वेगळ्या स्वभावाचे आहेत.',
  fr:'सुसंगत मानले जाणारे अंक',s3:'स्पेलिंगचे पर्याय',s3i:'खालील पर्यायांत नावातील एकाच शब्दात छोटा बदल केला आहे. प्रत्येकाचा अंक कॅल्डियन तक्त्यानुसार काढला आहे.',
  none:'या पद्धतीनुसार छोट्या बदलाने दोन्ही अंकांशी सुसंगत येणारा पर्याय सापडला नाही. नाव आहे तसे ठेवणे हा देखील पूर्णपणे योग्य निर्णय आहे.',
  cur:'सध्याचे नाव',opt:'पर्याय',letters:'अक्षरांची बेरीज',num:'नावाचा अंक',
  s4:'पर्याय वापरताना लक्षात ठेवा',g:['उच्चार नैसर्गिक राहतो का ते आधी तपासा. नाव वाचायला आणि म्हणायला सोपे असले पाहिजे.','कायदेशीर कागदपत्रांतील नाव बदलणे हा मोठा निर्णय आहे. तो करण्यापूर्वी सर्व बाजूंचा विचार करा. हा अहवाल असा कोणताही बदल सुचवत नाही.','वापरायचे ठरवले तर सोशल मीडिया, सही किंवा नवीन ठिकाणी नावापासून सुरुवात करता येते, आणि सातत्य ठेवा.','काही आठवडे वापरून पाहा आणि तुम्हाला कसे वाटते ते निरीक्षण करा.'],
  s5:'यंदाचे तुमचे वैयक्तिक वर्ष',py:y=>`यंदा तुमचे वैयक्तिक वर्ष ${y} आहे.`,
  disc:'अंकशास्त्र ही परंपरेवर आधारित समजूत आहे. हा अहवाल निश्चित भविष्य, आरोग्य, आर्थिक किंवा कायदेशीर सल्ला नाही, आणि कोणत्याही निकालाची हमी देत नाही.',
  method:'पद्धत: कॅल्डियन तक्ता (अक्षर १–८). मूलांक = जन्मदिवसाचा अंक. भाग्यांक = पूर्ण जन्मतारखेतील अंकांची बेरीज एका अंकावर.'},
 en:{t:'Your AnkVeda Name Report',for:'Prepared for',gen:'Generated on',
  s1:'Your three numbers',nn:'Name number',mu:'Mulank',bh:'Bhagyank',str:'Strengths',chl:'Challenges',refl:'Question to reflect on',
  s2:'How your name and birth numbers relate',yes:'Your name number is among the numbers treated as compatible with both your Mulank and Bhagyank.',
  no:'Your name number is not among the numbers treated as compatible with your Mulank or Bhagyank. That does not mean anything is wrong; these numbers simply have different temperaments.',
  fr:'Numbers treated as compatible',s3:'Spelling options',s3i:'Each option below changes one word of your name slightly. Every number is worked out with the Chaldean table.',
  none:'By this method no small spelling change was found that suits both numbers. Keeping your name exactly as it is remains a perfectly valid choice.',
  cur:'Current name',opt:'Option',letters:'Letter values',num:'Name number',
  s4:'If you try an option',g:['Check that the pronunciation stays natural. A name should read and sound easy.','Changing your name on legal documents is a big decision to weigh carefully. This report does not suggest any such change.','If you decide to try one, you could start with social media, a signature or new places, and stay consistent.','Try it for a few weeks and observe how it feels to you.'],
  s5:'Your personal year',py:y=>`This year your personal year number is ${y}.`,
  disc:'Numerology is a tradition-based belief, not a prediction. This report is not future-telling, health, financial or legal advice and guarantees no outcome.',
  method:'Method: Chaldean table (letters 1–8). Mulank = birth-day number. Bhagyank = digits of the full birth date reduced to one digit.'}};

export function reportHtml(r,sug,lang,fontFace='',ctx={}){
  const t=L[lang],M=N[lang],d=x=>dg(lang,x),meaning=k=>M[k-1];
  const {form=null,k=null,time=null}=ctx;const E=X[lang],T=E.tx;
  const card=(label,k)=>{const m=meaning(k);return `<div class="num"><div class="nl">${t[label]}</div><div class="nv">${d(k)}</div><h3>${esc(m[0])}</h3><p>${esc(m[1])}</p><p><b>${t.str}:</b> ${esc(m[2])}</p><p><b>${t.chl}:</b> ${esc(m[3])}</p><p class="q"><b>${t.refl}:</b> ${esc(m[4])}</p></div>`};
  const rows=[{...r,name:r.input,cur:1},...sug].map((x,i)=>`<tr class="${i?'':'cur'}"><td>${i?t.opt+' '+d(i):t.cur}</td><td class="nm">${esc(x.name||x.input)}</td><td>${x.letters.map(l=>d(l.value)).join(' + ')} = ${d(x.total)}</td><td><b>${d(x.number)}</b></td></tr>`).join('');
  /* ---------- extended sections ---------- */
  const pad2=n=>String(n).padStart(2,'0');
  const degTxt=x=>`${d(Math.floor(x))}°${d(pad2(Math.floor((x%1)*60)))}′`;
  const mmYY=dt=>`${d(pad2(dt.getMonth()+1))}/${d(dt.getFullYear())}`;
  const clock=tm=>{const h=tm.hh%12||12;return lang==='mr'?`${d(pad2(h))}:${d(pad2(tm.mm))} ${tm.hh<12?'AM (पूर्वान्ह)':'PM (अपरान्ह)'}`:`${pad2(h)}:${pad2(tm.mm)} ${tm.hh<12?'AM':'PM'}`};
  const dobTxt=form?`${d(form.d)} ${lang==='mr'?['जानेवारी','फेब्रुवारी','मार्च','एप्रिल','मे','जून','जुलै','ऑगस्ट','सप्टेंबर','ऑक्टोबर','नोव्हेंबर','डिसेंबर'][form.m-1]:['January','February','March','April','May','June','July','August','September','October','November','December'][form.m-1]} ${d(form.y)}`:'';
  const wd=form?weekday(form.y,form.m,form.d):null;
  const tithiName=n=>n===15?E.full:n===30?E.new:E.tithi[(n-1)%15];
  const paksha=n=>n<=15?E.shukla:E.krishna;
  const kv=(rows)=>`<table class="kv">${rows.filter(Boolean).map(([a,b])=>`<tr><th>${a}</th><td>${b}</td></tr>`).join('')}</table>`;

  // 1. birth snapshot
  let snap='';
  if(form){
    const rows=[[T.dob,dobTxt],[T.vara,E.days[wd]],[T.age,`${d(r.age)} ${T.yrs}`]];
    if(form.pob)rows.push([T.pob,esc(ctx.place?.label||form.pob)]);
    rows.push([T.tob,time?clock(time):T.unk]);
    if(k){rows.push([T.tithi,`${paksha(k.tithiN)} · ${tithiName(k.tithiN)}`],[T.nak,`${E.nak[k.moon.nak]} (${d(k.moon.pada)})`],[T.moon,E.rashi[k.moon.sign]],[T.lagna,k.unknown?'—':E.rashi[k.asc.sign]],[T.sun,E.rashi[k.sun.sign]])}
    snap=`<h2>${T.snapH}</h2>${kv(rows)}${k&&k.unknown?`<div class="box warn"><p>${T.unkN}</p></div>`:''}`;
  }

  // 2. Mulank profile + Bhagyank relation + inner/outer
  const pf=E.prof[r.mulank],io=innerOuter(r.input),ld=luckyDates(r.mulank,r.bhagyank);
  const rel=relation(r.mulank,r.bhagyank);
  const relTxt=rel==='same'?T.bmSame(d(r.mulank)):rel==='friendly'?T.bmFr(d(r.mulank),d(r.bhagyank)):T.bmDiff(d(r.mulank),d(r.bhagyank));
  const profile=`<h2>${T.numH}</h2><div class="box"><p><b>${T.numS(d(r.mulank))}</b></p></div>${kv([[T.pl,pf.pl],[T.god,pf.god],[T.day,pf.day],[T.col,pf.col],[T.gem,pf.gem],[T.dates,ld.map(d).join(', ')],[T.car,pf.car],[T.rel,pf.rel]])}<p class="small">${T.gemN}</p>`;
  const bm=`<h2>${T.bmH}</h2><div class="box"><p>${relTxt}</p></div>`;
  const inout=(io.inner&&io.outer)?`<h2>${T.inH}</h2><div class="two"><div class="num"><div class="nl">${T.inT}</div><div class="nv">${d(io.inner)}</div><h3>${esc(meaning(io.inner)[0])}</h3><p>${esc(meaning(io.inner)[1])}</p><p class="small">${T.inS}</p></div><div class="num"><div class="nl">${T.outT}</div><div class="nv">${d(io.outer)}</div><h3>${esc(meaning(io.outer)[0])}</h3><p>${esc(meaning(io.outer)[1])}</p><p class="small">${T.outS}</p></div></div>`:'';

  // 3. Lo Shu grid
  let lo='';
  if(form){
    const g=loShu(form,r.mulank,r.bhagyank);
    const cells=LOSHU.map(row=>`<tr>${row.map(n=>`<td class="${g.count[n]?'has':'no'}">${g.count[n]?String(n).repeat(g.count[n]).split('').map(d).join(''):'·'}</td>`).join('')}</tr>`).join('');
    lo=`<h2>${T.lsH}</h2><p>${T.lsS}</p><table class="loshu">${cells}</table>`+
      `<div class="box"><p><b>${T.lsMiss}:</b> ${g.missing.length?g.missing.map(d).join(', '):T.lsNone}</p>${g.missing.length?`<p>${T.lsMissT}</p><ul>${g.missing.map(n=>`<li><b>${d(n)}</b> — ${E.loshu[n]}</li>`).join('')}</ul>`:''}${g.repeated.map(n=>`<p>${T.lsRepT(d(n))}</p>`).join('')}</div>`;
  }

  // 4. weekday
  const vara=form?`<h2>${T.vaH}</h2><div class="box"><p><b>${E.days[wd]}</b> — ${E.dayT[wd]}</p></div>`:'';

  // 5. kundali
  let kun='';
  if(form&&!k){kun=`<h2>${T.kH}</h2><div class="box warn"><p>${T.noplace}</p></div>`}
  if(k){
    const h1=houses(k,'D1'),h9=houses(k,'D9');
    const occ=h=>h.out.map((arr,i)=>[...(h===h1&&!k.unknown&&i===0?[E.asc]:[]),...arr.map(p=>E.pAbbr[['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].indexOf(p)])]);
    const occ9=h9.out.map((arr,i)=>[...(!k.unknown&&i===0?[E.asc]:[]),...arr.map(p=>E.pAbbr[['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].indexOf(p)])]);
    const charts=`<div class="charts"><figure>${chartSvg(occ(h1),h1.first,{size:310,title:T.d1})}<figcaption>${k.unknown?T.d1c:T.d1}</figcaption></figure><figure>${chartSvg(occ9,h9.first,{size:310,title:T.d9})}<figcaption>${T.d9}</figcaption></figure></div><p class="small">${T.chartNote}</p>`;
    const names=E.planets;
    const prow=[...(k.unknown?[]:[{...k.asc,label:lang==='mr'?'लग्न':'Ascendant'}]),...k.rows.map((x,i)=>({...x,label:names[i]}))];
    const ptable=`<table class="pt"><tr><th>${T.planet}</th><th>${T.sign}</th><th>${T.deg}</th><th>${T.house}</th><th>${T.nakp}</th></tr>${prow.map(x=>`<tr><td><b>${x.label}</b></td><td>${E.rashi[x.sign]}</td><td>${degTxt(x.deg)}</td><td>${d(x.house)}</td><td>${E.nak[x.nak]} (${d(x.pada)})</td></tr>`).join('')}</table>`;
    const reads=`<div class="box"><p><b>${T.read}</b></p>${k.unknown?'':`<p>${T.readLagna({s:E.rashi[k.asc.sign],t:E.rashiT[k.asc.sign]})}</p>`}<p>${T.readMoon({s:E.rashi[k.moon.sign],n:E.nak[k.moon.nak],t:E.rashiT[k.moon.sign]})}</p><p>${T.readSun({s:E.rashi[k.sun.sign],t:E.rashiT[k.sun.sign]})}</p></div>`;
    const flags=`<div class="box"><p><b>${T.mang}</b></p><p>${k.manglik?T.mangY:T.mangN}</p><p><b>${T.sade}</b></p><p>${k.sadeSati?T.sadeY(k.sadePhase):T.sadeN}</p></div>`;
    const ds=k.dasha,dTable=`<table class="pt"><tr><th>${T.dasha}</th><th>${T.from}</th><th>${T.to}</th></tr>${ds.list.map(x=>`<tr class="${x.planet===ds.cur.planet&&x.start.getTime()===ds.cur.start.getTime()?'cur':''}"><td><b>${names[['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].indexOf(x.planet)]}</b></td><td>${mmYY(x.start)}</td><td>${mmYY(x.end)}</td></tr>`).join('')}</table>`;
    const pi=p=>['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'].indexOf(p);
    const dTxt=`<div class="box"><p><b>${T.dCur(names[pi(ds.cur.planet)],names[pi(ds.curAd.planet)])}</b></p><p>${E.dashaT[pi(ds.cur.planet)]}</p><p>${T.dBal(names[pi(ds.balance.planet)],d(ds.balance.years.toFixed(1)))}</p></div>`;
    kun=`<h2>${T.kH}</h2><p>${T.kS} ${T.tzN}</p>${charts}<h2>${T.tbl}</h2>${ptable}${reads}${flags}<h2>${T.dH}</h2><p>${T.dS}</p>${dTable}${dTxt}<p class="small">${T.dNote}</p>`;
  }

  // 6. personal years
  const yr0=new Date().getFullYear(),cyc=form?personalCycle(form,yr0,3):[];
  const pm=form?personalMonth(r.personalYear,new Date().getMonth()+1):null;
  const pyears=form?`<h2>${T.pyH}</h2><p>${T.pyS}</p><table class="pt"><tr><th>${T.year}</th><th>${T.pnum}</th><th>${T.theme}</th></tr>${cyc.map(c=>`<tr class="${c.year===yr0?'cur':''}"><td><b>${d(c.year)}</b></td><td>${d(c.num)}</td><td>${esc(meaning(c.num)[0])} — ${esc(meaning(c.num)[1])}</td></tr>`).join('')}</table><p>${T.pyM(d(pm))} ${T.pyUse}</p>`:'';

  const coverExtra=form?`<p>${dobTxt}${time?' · '+clock(time):''}${form.pob?' · '+esc(ctx.place?.label||form.pob):''}</p>`:'';

  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
${fontFace}
@page{size:A4;margin:16mm 14mm}*{box-sizing:border-box}
body{font-family:NS,'Noto Sans Devanagari',Inter,sans-serif;color:#3A2418;font-size:11.5pt;line-height:1.7;margin:0}
.cover{height:255mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;border:2px solid #C8932B;border-radius:14px;background:linear-gradient(#FFFBF3,#FFF1E3);page-break-after:always}
.cover .star{font-size:46pt;color:#C8932B}.cover h1{font-size:26pt;color:#9A3412;margin:8px 0}.cover .n{font-size:20pt;color:#C8932B;font-weight:700}.cover p{color:#8A6A58;margin:4px}
h2{break-after:avoid;color:#9A3412;border-bottom:2px solid #F2E1CC;padding-bottom:4px;margin:22px 0 10px;font-size:16pt}
.num{border:1px solid #F2E1CC;border-radius:12px;padding:12px 16px;margin:10px 0;background:#FFFAF2;break-inside:avoid}.num h3{margin:2px 0;color:#9A3412}.num p{margin:3px 0}
.nl{color:#8A6A58;font-size:10pt}.nv{float:right;font-size:30pt;font-weight:700;color:#C8932B;line-height:1}
table{width:100%;border-collapse:collapse;margin:10px 0;break-inside:avoid}th,td{border:1px solid #F2E1CC;padding:7px 9px;text-align:left;font-size:10.5pt}th{background:#FFF1E3}
table.sp{break-inside:auto}table.sp tr{break-inside:avoid}table.sp th{break-inside:avoid}
tr.cur td{background:#FFF6E0}.nm{font-weight:700;letter-spacing:.04em}
.box{background:#FFF1E3;border-radius:10px;padding:10px 14px;margin:8px 0;break-inside:avoid}.box.warn{background:#FFF6E0;border:1px dashed #C8932B}ul{padding-left:20px}
.small{font-size:9.5pt;color:#8A6A58}
table.kv th{width:34%;background:#FFF8EC;font-weight:600}
table.loshu{width:240px;margin:12px auto}table.loshu td{width:80px;height:64px;text-align:center;font-size:20pt;font-weight:700;color:#9A3412;background:#FFFAF2}table.loshu td.no{color:#D8C3A8;background:#FBF5EC}
.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.charts{display:flex;justify-content:space-around;gap:10px;margin:10px 0;break-inside:avoid}.charts figure{margin:0;text-align:center}.charts figcaption{font-weight:700;color:#9A3412;font-size:10.5pt}
.foot{margin-top:24px;font-size:9pt;color:#8A6A58;border-top:1px solid #F2E1CC;padding-top:8px}
</style></head><body>
<div class="cover"><div class="star">✦</div><p>AnkVeda</p><h1>${t.t}</h1><p>${t.for}</p><div class="n">${esc(r.input)}</div>${coverExtra}<p>${t.gen}: ${new Date().toLocaleDateString(lang==='mr'?'mr-IN':'en-IN')}</p></div>
${snap}
<h2>${t.s3}</h2><p>${sug.length?t.s3i:t.none}</p>${sug.length?`<table class="sp"><tr><th></th><th>Name</th><th>${t.letters}</th><th>${t.num}</th></tr>${rows}</table>`:''}
<h2>${t.s1}</h2>${card('nn',r.number)}${card('mu',r.mulank)}${card('bh',r.bhagyank)}
${inout}
${bm}
<h2>${t.s2}</h2><div class="box"><p>${r.aligned?t.yes:t.no}</p><p><b>${t.nn} ${d(r.number)}</b> · ${t.mu} ${d(r.mulank)} → ${t.fr}: ${FR[r.mulank].map(d).join(', ')} · ${t.bh} ${d(r.bhagyank)} → ${FR[r.bhagyank].map(d).join(', ')}</p></div>
${profile}
${lo}
${vara}
${kun}
<h2>${t.s4}</h2><ul>${t.g.map(x=>`<li>${x}</li>`).join('')}</ul>
<h2>${t.s5}</h2><p>${t.py(d(r.personalYear))} ${esc(meaning(r.personalYear)[1])}</p>
${pyears}
<div class="foot"><p>${t.method}</p><p>${t.disc}</p></div></body></html>`;
}