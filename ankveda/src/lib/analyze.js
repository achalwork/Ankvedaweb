import {calculateNameNumber} from './engine.js';
const red=n=>{while(n>9)n=[...String(n)].reduce((a,d)=>a+ +d,0);return n};
// Simple, disclosed convention: "friendly" numbers for each base number.
export const FR={1:[1,2,3,5,6],2:[1,2,3,5],3:[1,2,3,5,9],4:[1,5,6,7,8],5:[1,3,4,5,6],6:[1,4,5,6,8],7:[1,4,5,6],8:[4,5,6,8],9:[1,2,3,9]};
export function analyze({name,d,m,y}){
  const r=calculateNameNumber(name,'chaldean');if(r.error)return r;
  const dsum=x=>[...String(x)].reduce((a,c)=>a+ +c,0);
  const mulank=red(+d),bhagyank=red(dsum(`${d}${m}${y}`));
  const n=r.number,aligned=FR[mulank].includes(n)&&FR[bhagyank].includes(n);
  const year=new Date().getFullYear(),bd=new Date(year,m-1,d);
  const age=year-y-(bd>new Date()?1:0);
  const personalYear=red(dsum(`${d}${m}${year}`));
  return{...r,mulank,bhagyank,aligned,personalYear,age,first:name.trim().split(/\s+/)[0]};
}
