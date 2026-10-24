// Everything the report needs, in one place. Used by the server (PDF) and by the browser fallback PDF.
import {analyze} from './analyze.js';
import {suggest} from './variants.js';
import {kundali} from './kundali.js';
import {resolvePlace} from './places.js';

export const parseTob=t=>{const m=/^([01]?\d|2[0-3]):([0-5]\d)$/.exec(String(t||''));return m?{hh:+m[1],mm:+m[2]}:null};

export async function buildContext(form){
  const r=analyze(form);if(r.error)throw new Error('bad input');
  const sug=suggest(form.name,r.mulank,r.bhagyank,5);
  let k=null,place=null;
  if(form.pob){
    place=(Number.isFinite(+form.plat)&&Number.isFinite(+form.plon)&&form.plat!==''&&form.plon!=='')?{lat:+form.plat,lon:+form.plon,label:form.pob,source:'picked'}:await resolvePlace(form.pob);
    if(place){const t=parseTob(form.tob);
      try{k=kundali({y:form.y,m:form.m,d:form.d,hh:t?t.hh:null,mm:t?t.mm:0,lat:place.lat,lon:place.lon})}catch(e){console.error('kundali failed',e);k=null}}
  }
  return{r,sug,k,place,form,time:parseTob(form.tob)};
}