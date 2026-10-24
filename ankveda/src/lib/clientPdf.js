// Browser-side PDF (used for the demo preview, and as a fallback if the server cannot make the PDF).
// Renders the same report HTML in a hidden iframe, then slices it into A4 pages with html2canvas + jsPDF.
import {buildContext} from './context.js';
import {reportHtml} from './reportHtml.js';
const CDN='https://cdnjs.cloudflare.com/ajax/libs/';
const load=(src,test)=>new Promise((ok,no)=>{if(test())return ok();const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)});
const FONTS='<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet">';

export async function makePdfBlob(form,lang){
  await Promise.all([load(CDN+'html2canvas/1.4.1/html2canvas.min.js',()=>window.html2canvas),load(CDN+'jspdf/2.5.1/jspdf.umd.min.js',()=>window.jspdf)]);
  const ctx=await buildContext(form);const {r,sug}=ctx;
  let html=reportHtml(r,sug,lang==='en'?'en':'mr','',ctx);
  html=html.replace('</head>',FONTS+'<style>@page{margin:0}body{width:688px;margin:0;padding:0}.cover{margin-bottom:10mm}</style></head>');
  const fr=document.createElement('iframe');
  fr.style.cssText='position:fixed;left:-10000px;top:0;width:688px;height:1200px;border:0';
  document.body.appendChild(fr);
  try{
    await new Promise(ok=>{fr.onload=ok;fr.srcdoc=html});
    const doc=fr.contentDocument;
    await Promise.race([doc.fonts.ready,new Promise(ok=>setTimeout(ok,4000))]);
    await new Promise(ok=>setTimeout(ok,200));
    const body=doc.body,H=body.scrollHeight;fr.style.height=H+'px';
    const SC=2,canvas=await window.html2canvas(body,{scale:SC,backgroundColor:'#ffffff',windowWidth:688,windowHeight:H});
    // page = 265mm of content (A4 minus 16mm margins) ; 688px = 182mm
    const pxPerMm=688/182,pageH=265*pxPerMm;
    // keep headings with the block after them, and never split a card/table row group
    const units=[];const kids=[...body.children];
    for(let i=0;i<kids.length;i++){const el=kids[i];const top=el.offsetTop,bot=top+el.offsetHeight;
      if(el.tagName==='H2'&&kids[i+1]){const n=kids[i+1];units.push([top,n.offsetTop+n.offsetHeight]);i++}else units.push([top,bot])}
    const breaks=[0];let start=0;
    for(const [t,b] of units){if(b-start>pageH&&t>start){breaks.push(t);start=t}
      while(b-start>pageH){start+=pageH;breaks.push(start)}}
    breaks.push(H);
    const {jsPDF}=window.jspdf;const pdf=new jsPDF({unit:'mm',format:'a4'});
    for(let i=0;i<breaks.length-1;i++){
      const y0=Math.round(breaks[i]*SC),y1=Math.min(canvas.height,Math.round(breaks[i+1]*SC)),h=y1-y0;if(h<=0)continue;
      const c=document.createElement('canvas');c.width=canvas.width;c.height=h;
      const g=c.getContext('2d');g.fillStyle='#fff';g.fillRect(0,0,c.width,h);g.drawImage(canvas,0,y0,canvas.width,h,0,0,canvas.width,h);
      if(i)pdf.addPage();
      pdf.addImage(c.toDataURL('image/jpeg',0.92),'JPEG',14,16,182,h/SC/pxPerMm);
    }
    return pdf.output('blob');
  }finally{fr.remove()}
}

// Hand the finished file to the user. Order: Claude-artifact "downloads" capability (preview), then a normal browser download.
export async function saveBlob(blob,filename){
  try{const dl=window.claude?.use?await window.claude.use('downloads'):null;
    if(dl){await dl.save({filename,data:blob});return}}catch(e){if(e&&e.code==='declined')return}
  const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),4000);
}