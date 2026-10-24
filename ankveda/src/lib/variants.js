import {calculateNameNumber} from './engine.js';
import {FR} from './analyze.js';
const V='AEIOU';
// Single-word spelling variants: double a vowel, add trailing H after A, double last consonant, drop a doubled letter.
function wordVariants(w){
  const o=new Set();
  for(let i=0;i<w.length;i++){
    if(V.includes(w[i])&&w[i+1]!==w[i])o.add(w.slice(0,i+1)+w[i]+w.slice(i+1));
    if(w[i]===w[i+1])o.add(w.slice(0,i)+w.slice(i+1));
  }
  if(w.endsWith('A'))o.add(w+'H');
  if(!V.includes(w.at(-1))&&w.length>2)o.add(w+w.at(-1));
  o.delete(w);return [...o];
}
/** Variants of the full name (one word changed at a time) whose number suits both Mulank and Bhagyank. */
export function suggest(name,mulank,bhagyank,limit=5){
  const words=name.trim().toUpperCase().split(/\s+/);const out=[];
  words.forEach((w,wi)=>wordVariants(w).forEach(v=>{
    const nm=words.map((x,i)=>i===wi?v:x).join(' ');const r=calculateNameNumber(nm,'chaldean');
    if(r.error)return;const ok=FR[mulank].includes(r.number)&&FR[bhagyank].includes(r.number);
    out.push({name:nm,word:w,changed:v,number:r.number,total:r.total,letters:r.letters,ok,first:wi===0});
  }));
  return out.filter(x=>x.ok).sort((a,b)=>(b.first-a.first)||(a.changed.length-b.changed.length)).slice(0,limit);
}
