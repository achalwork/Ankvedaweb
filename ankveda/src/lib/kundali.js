// Vedic (sidereal, Lahiri) birth chart. Planet positions come from the open-source astronomy-engine library.
import * as A from 'astronomy-engine';

const norm=x=>((x%360)+360)%360;
const rad=Math.PI/180;
export const PLANETS=['Sun','Moon','Mars','Mercury','Jupiter','Venus','Saturn','Rahu','Ketu'];
const BODY={Sun:A.Body.Sun,Moon:A.Body.Moon,Mars:A.Body.Mars,Mercury:A.Body.Mercury,Jupiter:A.Body.Jupiter,Venus:A.Body.Venus,Saturn:A.Body.Saturn};

// Lahiri (Chitrapaksha) ayanamsa, mean value (accurate to about an arc-minute for 1900-2100)
export const ayanamsa=date=>{const y=2000+(date.getTime()-Date.UTC(2000,0,1,12))/(365.2425*86400000);return 23.853+0.013969*(y-2000)};

function tropicalLon(body,t){
  const v=A.GeoVector(body,t,true);return norm(A.Ecliptic(v).elon);
}
function meanNode(t){const T=(t.tt)/36525;return norm(125.04452-1934.136261*T+0.0020708*T*T)}

/** Ascendant (tropical) from sidereal time, longitude (east +) and latitude. */
function ascendant(date,lat,lon){
  const t=A.MakeTime(date);const T=t.tt/36525;
  const eps=(23.439291-0.0130042*T)*rad;
  const ramc=norm(A.SiderealTime(date)*15+lon)*rad,phi=lat*rad;
  const y=Math.cos(ramc),x=-(Math.sin(ramc)*Math.cos(eps)+Math.tan(phi)*Math.sin(eps));
  return norm(Math.atan2(y,x)/rad);
}

/** Convert a local civil time at birth to a UTC Date. tz in hours (IST = 5.5). */
export const toUtc=(y,m,d,hh,mm,tz)=>new Date(Date.UTC(y,m-1,d,hh,mm)-tz*3600000);

export function tzFor(lat,lon){return lon>=68&&lon<=98&&lat>=6&&lat<=37?5.5:Math.round(lon/15*2)/2}

const SEQ=['Ketu','Venus','Sun','Moon','Mars','Rahu','Jupiter','Saturn','Mercury'];
const YRS={Ketu:7,Venus:20,Sun:6,Moon:10,Mars:7,Rahu:18,Jupiter:16,Saturn:19,Mercury:17};
const addYears=(d,y)=>new Date(d.getTime()+y*365.2425*86400000);

export function dashas(moonSid,birth,now=new Date()){
  const span=360/27,idx=Math.floor(moonSid/span),frac=(moonSid%span)/span;
  const first=SEQ[idx%9];let start=addYears(birth,-frac*YRS[first]);
  const list=[];
  for(let i=0;i<9+1;i++){const p=SEQ[(idx+i)%9];const end=addYears(start,YRS[p]);list.push({planet:p,start,end,years:YRS[p]});start=end}
  const cur=list.find(x=>now>=x.start&&now<x.end)||list[0];
  // antardashas inside the current mahadasha
  let s=cur.start;const ad=[];const k=SEQ.indexOf(cur.planet);
  for(let i=0;i<9;i++){const p=SEQ[(k+i)%9];const e=addYears(s,YRS[cur.planet]*YRS[p]/120);ad.push({planet:p,start:s,end:e});s=e}
  const curAd=ad.find(x=>now>=x.start&&now<x.end)||ad[0];
  return{list:list.filter(x=>x.end>birth).slice(0,9),cur,ad,curAd,balance:{planet:first,years:(1-frac)*YRS[first]}};
}

/**
 * input: {y,m,d, hh,mm (24h, optional), lat,lon, tz?}
 * If time is unknown (hh==null) noon is used and the Moon sign is used as the chart's first house.
 */
export function kundali({y,m,d,hh=null,mm=0,lat,lon,tz}){
  const unknown=hh==null;
  const zone=tz??tzFor(lat,lon);
  const date=toUtc(y,m,d,unknown?12:hh,unknown?0:mm,zone);
  const t=A.MakeTime(date),ay=ayanamsa(date);
  const pos={};
  for(const p of Object.keys(BODY))pos[p]=norm(tropicalLon(BODY[p],t)-ay);
  const rahu=norm(meanNode(t)-ay);pos.Rahu=rahu;pos.Ketu=norm(rahu+180);
  const ascSid=norm(ascendant(date,lat,lon)-ay);
  const firstLon=unknown?pos.Moon:ascSid;               // chart anchor
  const lagnaSign=Math.floor(firstLon/30);               // 0..11
  const sunIdx=Math.floor(pos.Sun/30);
  const rows=PLANETS.map(p=>{const l=pos[p],sign=Math.floor(l/30),house=((sign-lagnaSign+12)%12)+1;
    const nk=Math.floor(l/(360/27));const pada=Math.floor((l%(360/27))/(360/108))+1;
    const nav=Math.floor(l*9/30)%12;
    return{planet:p,lon:l,sign,deg:l%30,house,nak:nk,pada,navSign:nav}});
  const ascRow={planet:'Asc',lon:firstLon,sign:lagnaSign,deg:firstLon%30,house:1,nak:Math.floor(firstLon/(360/27)),pada:Math.floor((firstLon%(360/27))/(360/108))+1,navSign:Math.floor(firstLon*9/30)%12};
  const moon=rows[1];
  // tithi (lunar day) 1..30
  const tithiN=Math.floor(norm(pos.Moon-pos.Sun)/12)+1;
  const mars=rows[2];const manglik=[1,2,4,7,8,12].includes(mars.house);
  // Sade Sati: Saturn now vs natal Moon sign
  const nowT=A.MakeTime(new Date());const satNow=Math.floor(norm(tropicalLon(A.Body.Saturn,nowT)-ayanamsa(new Date()))/30);
  const diff=(satNow-moon.sign+12)%12;const sadeSati=diff===11||diff===0||diff===1;
  const sadePhase=diff===11?1:diff===0?2:diff===1?3:0;
  return{unknown,tz:zone,date,ayanamsa:ay,asc:ascRow,lagnaSign,rows,moon,sun:rows[0],tithiN,manglik,mars,sadeSati,sadePhase,satNow,
    dasha:dashas(pos.Moon,date),navLagna:ascRow.navSign};
}

/** House occupants for a chart: returns array[12] of planet codes for houses 1..12.  mode 'D1' | 'D9' */
export function houses(k,mode='D1'){
  const first=mode==='D1'?k.lagnaSign:k.navLagna;const out=Array.from({length:12},()=>[]);
  k.rows.forEach(r=>{const s=mode==='D1'?r.sign:r.navSign;out[(s-first+12)%12].push(r.planet)});return{first,out};
}