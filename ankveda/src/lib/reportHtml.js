import {analyze,FR} from './analyze.js';
import {N} from '../data/meanings.js';
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

export function reportHtml(r,sug,lang,fontFace=''){
  const t=L[lang],M=N[lang],d=x=>dg(lang,x),meaning=k=>M[k-1];
  const card=(label,k)=>{const m=meaning(k);return `<div class="num"><div class="nl">${t[label]}</div><div class="nv">${d(k)}</div><h3>${esc(m[0])}</h3><p>${esc(m[1])}</p><p><b>${t.str}:</b> ${esc(m[2])}</p><p><b>${t.chl}:</b> ${esc(m[3])}</p><p class="q"><b>${t.refl}:</b> ${esc(m[4])}</p></div>`};
  const rows=[{...r,name:r.input,cur:1},...sug].map((x,i)=>`<tr class="${i?'':'cur'}"><td>${i?t.opt+' '+d(i):t.cur}</td><td class="nm">${esc(x.name||x.input)}</td><td>${x.letters.map(l=>d(l.value)).join(' + ')} = ${d(x.total)}</td><td><b>${d(x.number)}</b></td></tr>`).join('');
  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><style>
${fontFace}
@page{size:A4;margin:16mm 14mm}*{box-sizing:border-box}
body{font-family:NS,'Noto Sans Devanagari',Inter,sans-serif;color:#3A2418;font-size:11.5pt;line-height:1.7;margin:0}
.cover{height:255mm;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;border:2px solid #C8932B;border-radius:14px;background:linear-gradient(#FFFBF3,#FFF1E3);page-break-after:always}
.cover .star{font-size:46pt;color:#C8932B}.cover h1{font-size:26pt;color:#9A3412;margin:8px 0}.cover .n{font-size:20pt;color:#C8932B;font-weight:700}.cover p{color:#8A6A58;margin:4px}
h2{break-after:avoid;color:#9A3412;border-bottom:2px solid #F2E1CC;padding-bottom:4px;margin:22px 0 10px;font-size:16pt}
.num{border:1px solid #F2E1CC;border-radius:12px;padding:12px 16px;margin:10px 0;background:#FFFAF2;break-inside:avoid}.num h3{margin:2px 0;color:#9A3412}.num p{margin:3px 0}
.nl{color:#8A6A58;font-size:10pt}.nv{float:right;font-size:30pt;font-weight:700;color:#C8932B;line-height:1}
table{width:100%;border-collapse:collapse;margin:10px 0}th,td{border:1px solid #F2E1CC;padding:7px 9px;text-align:left;font-size:10.5pt}th{background:#FFF1E3}
tr.cur td{background:#FFF6E0}.nm{font-weight:700;letter-spacing:.04em}
.box{background:#FFF1E3;border-radius:10px;padding:10px 14px;margin:8px 0}ul{padding-left:20px}
.foot{margin-top:24px;font-size:9pt;color:#8A6A58;border-top:1px solid #F2E1CC;padding-top:8px}
</style></head><body>
<div class="cover"><div class="star">✦</div><p>AnkVeda</p><h1>${t.t}</h1><p>${t.for}</p><div class="n">${esc(r.input)}</div><p>${t.gen}: ${new Date().toLocaleDateString(lang==='mr'?'mr-IN':'en-IN')}</p></div>
<h2>${t.s1}</h2>${card('nn',r.number)}${card('mu',r.mulank)}${card('bh',r.bhagyank)}
<h2>${t.s2}</h2><div class="box"><p>${r.aligned?t.yes:t.no}</p><p><b>${t.nn} ${d(r.number)}</b> · ${t.mu} ${d(r.mulank)} → ${t.fr}: ${FR[r.mulank].map(d).join(', ')} · ${t.bh} ${d(r.bhagyank)} → ${FR[r.bhagyank].map(d).join(', ')}</p></div>
<h2>${t.s3}</h2><p>${sug.length?t.s3i:t.none}</p>${sug.length?`<table><tr><th></th><th>Name</th><th>${t.letters}</th><th>${t.num}</th></tr>${rows}</table>`:''}
<h2>${t.s4}</h2><ul>${t.g.map(x=>`<li>${x}</li>`).join('')}</ul>
<h2>${t.s5}</h2><p>${t.py(d(r.personalYear))} ${esc(meaning(r.personalYear)[1])}</p>
<div class="foot"><p>${t.method}</p><p>${t.disc}</p></div></body></html>`;
}

