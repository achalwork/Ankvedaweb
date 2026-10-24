import {METHODS} from './engine.js';
import {FR} from './analyze.js';
const red=n=>{while(n>9)n=[...String(n)].reduce((a,d)=>a+ +d,0);return n};
const dsum=x=>[...String(x)].reduce((a,c)=>a+ +c,0);

export const weekday=(y,m,d)=>new Date(Date.UTC(y,m-1,d)).getUTCDay(); // 0 = Sunday

// Lo Shu layout (rows top → bottom)
export const LOSHU=[[4,9,2],[3,5,7],[8,1,6]];
export function loShu({d,m,y},mulank,bhagyank){
  const c=Array(10).fill(0);
  [...`${d}${m}${y}`].forEach(ch=>{if(ch!=='0')c[+ch]++});
  c[mulank]++;c[bhagyank]++;
  const missing=[1,2,3,4,5,6,7,8,9].filter(n=>!c[n]);
  const repeated=[1,2,3,4,5,6,7,8,9].filter(n=>c[n]>2); // present more than twice incl. the added Mulank/Bhagyank
  return{count:c,missing,repeated};
}

/** Chaldean sum of vowels (inner) and consonants (outer). */
export function innerOuter(name){
  const T=METHODS.chaldean;let v=0,c=0;
  for(const ch of String(name).toUpperCase()){const x=T[ch];if(!x)continue;if('AEIOU'.includes(ch))v+=x;else c+=x}
  return{inner:v?red(v):null,outer:c?red(c):null,vTotal:v,cTotal:c};
}
export const luckyDates=(mulank,bhagyank)=>Array.from({length:31},(_,i)=>i+1).filter(d=>red(d)===mulank||red(d)===bhagyank);

export function personalCycle({d,m},fromYear,n=3){
  return Array.from({length:n},(_,i)=>{const y=fromYear+i;return{year:y,num:red(dsum(`${d}${m}${y}`))}});
}
export const personalMonth=(py,month)=>red(py+month);
export const relation=(m,b)=>m===b?'same':(FR[m].includes(b)&&FR[b].includes(m))?'friendly':'diff';

/* ---------- North-Indian style chart as inline SVG ---------- */
const CEN=[[150,75],[75,37],[37,75],[75,150],[37,225],[75,262],[150,225],[225,262],[262,225],[225,150],[262,75],[225,37]];
/**
 * occ: array[12] of arrays of abbreviations (house 1..12). firstSign: 0..11 sign in house 1.
 */
export function chartSvg(occ,firstSign,{size=250,title=''}={}){
  const stroke='#C8932B',txt='#3A2418',mu='#8A6A58';
  let s=`<svg viewBox="0 0 300 300" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${title}"><rect x="1.5" y="1.5" width="297" height="297" fill="#FFFBF3" stroke="${stroke}" stroke-width="2.5"/><path d="M1.5 1.5L298.5 298.5M298.5 1.5L1.5 298.5M150 1.5L298.5 150L150 298.5L1.5 150Z" fill="none" stroke="${stroke}" stroke-width="1.6"/>`;
  for(let h=0;h<12;h++){
    const [cx,cy]=CEN[h];const sign=((firstSign+h)%12)+1;const items=occ[h]||[];
    s+=`<text x="${cx}" y="${cy-(items.length>3?24:18)}" font-size="11" text-anchor="middle" fill="${mu}">${sign}</text>`;
    const per=items.length>4?3:2;const rows=[];for(let i=0;i<items.length;i+=per)rows.push(items.slice(i,i+per).join(' '));
    rows.forEach((row,i)=>{s+=`<text x="${cx}" y="${cy+2+i*15}" font-size="13" font-weight="700" text-anchor="middle" fill="${txt}">${row}</text>`});
  }
  return s+'</svg>';
}