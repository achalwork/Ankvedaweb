// Birth-place lookup: built-in list of Indian cities (instant, offline) + OpenStreetMap Nominatim fallback for anything else.
// [name, state, lat, lon]
const P=`Mumbai,Maharashtra,19.076,72.8777
Pune,Maharashtra,18.5204,73.8567
Nagpur,Maharashtra,21.1458,79.0882
Nashik,Maharashtra,19.9975,73.7898
Aurangabad (Chh. Sambhajinagar),Maharashtra,19.8762,75.3433
Solapur,Maharashtra,17.6599,75.9064
Kolhapur,Maharashtra,16.705,74.2433
Amravati,Maharashtra,20.9374,77.7796
Akola,Maharashtra,20.7096,77.0021
Latur,Maharashtra,18.4088,76.5604
Nanded,Maharashtra,19.1383,77.321
Jalgaon,Maharashtra,21.0077,75.5626
Dhule,Maharashtra,20.9042,74.7749
Ahmednagar (Ahilyanagar),Maharashtra,19.0948,74.748
Sangli,Maharashtra,16.8524,74.5815
Satara,Maharashtra,17.6805,74.0183
Ratnagiri,Maharashtra,16.9902,73.312
Chandrapur,Maharashtra,19.9615,79.2961
Wardha,Maharashtra,20.7453,78.6022
Yavatmal,Maharashtra,20.3899,78.1307
Buldhana,Maharashtra,20.5293,76.1842
Washim,Maharashtra,20.1113,77.1331
Beed,Maharashtra,18.9891,75.7601
Osmanabad (Dharashiv),Maharashtra,18.1861,76.0419
Parbhani,Maharashtra,19.2704,76.7747
Hingoli,Maharashtra,19.7173,77.1496
Jalna,Maharashtra,19.8347,75.8816
Gondia,Maharashtra,21.4624,80.192
Bhandara,Maharashtra,21.1667,79.65
Gadchiroli,Maharashtra,20.1849,80.0
Malegaon,Maharashtra,20.5579,74.5089
Bhiwandi,Maharashtra,19.3002,73.0635
Thane,Maharashtra,19.2183,72.9781
Kalyan,Maharashtra,19.2437,73.1355
Navi Mumbai,Maharashtra,19.033,73.0297
Vasai-Virar,Maharashtra,19.3919,72.8397
Pimpri-Chinchwad,Maharashtra,18.6298,73.7997
Ichalkaranji,Maharashtra,16.6912,74.4605
Barshi,Maharashtra,18.2333,75.6917
Pandharpur,Maharashtra,17.6792,75.3319
Baramati,Maharashtra,18.1514,74.5815
Karad,Maharashtra,17.2894,74.1818
Shirdi,Maharashtra,19.7667,74.4777
Chiplun,Maharashtra,17.5333,73.5167
Ramtek,Maharashtra,21.3944,79.3269
Delhi,Delhi,28.6139,77.209
Bengaluru,Karnataka,12.9716,77.5946
Hyderabad,Telangana,17.385,78.4867
Chennai,Tamil Nadu,13.0827,80.2707
Kolkata,West Bengal,22.5726,88.3639
Ahmedabad,Gujarat,23.0225,72.5714
Surat,Gujarat,21.1702,72.8311
Vadodara,Gujarat,22.3072,73.1812
Rajkot,Gujarat,22.3039,70.8022
Jaipur,Rajasthan,26.9124,75.7873
Jodhpur,Rajasthan,26.2389,73.0243
Udaipur,Rajasthan,24.5854,73.7125
Lucknow,Uttar Pradesh,26.8467,80.9462
Kanpur,Uttar Pradesh,26.4499,80.3319
Varanasi,Uttar Pradesh,25.3176,82.9739
Agra,Uttar Pradesh,27.1767,78.0081
Prayagraj,Uttar Pradesh,25.4358,81.8463
Noida,Uttar Pradesh,28.5355,77.391
Patna,Bihar,25.5941,85.1376
Ranchi,Jharkhand,23.3441,85.3096
Bhopal,Madhya Pradesh,23.2599,77.4126
Indore,Madhya Pradesh,22.7196,75.8577
Jabalpur,Madhya Pradesh,23.1815,79.9864
Gwalior,Madhya Pradesh,26.2183,78.1828
Ujjain,Madhya Pradesh,23.1765,75.7885
Raipur,Chhattisgarh,21.2514,81.6296
Bhilai,Chhattisgarh,21.2094,81.3784
Chandigarh,Chandigarh,30.7333,76.7794
Amritsar,Punjab,31.634,74.8723
Ludhiana,Punjab,30.901,75.8573
Dehradun,Uttarakhand,30.3165,78.0322
Shimla,Himachal Pradesh,31.1048,77.1734
Srinagar,Jammu & Kashmir,34.0837,74.7973
Jammu,Jammu & Kashmir,32.7266,74.857
Guwahati,Assam,26.1445,91.7362
Bhubaneswar,Odisha,20.2961,85.8245
Cuttack,Odisha,20.4625,85.883
Visakhapatnam,Andhra Pradesh,17.6868,83.2185
Vijayawada,Andhra Pradesh,16.5062,80.648
Tirupati,Andhra Pradesh,13.6288,79.4192
Warangal,Telangana,17.9689,79.5941
Mysuru,Karnataka,12.2958,76.6394
Mangaluru,Karnataka,12.9141,74.856
Hubballi,Karnataka,15.3647,75.124
Belagavi,Karnataka,15.8497,74.4977
Kalaburagi,Karnataka,17.3297,76.8343
Kochi,Kerala,9.9312,76.2673
Thiruvananthapuram,Kerala,8.5241,76.9366
Kozhikode,Kerala,11.2588,75.7804
Coimbatore,Tamil Nadu,11.0168,76.9558
Madurai,Tamil Nadu,9.9252,78.1198
Panaji,Goa,15.4909,73.8278
Margao,Goa,15.2993,73.9862
Puducherry,Puducherry,11.9416,79.8083`.split('\n').map(l=>{const[a,b,c,d]=l.split(',');return{name:a,state:b,lat:+c,lon:+d}});

export const PLACES=P;
export const placeLabel=p=>`${p.name}, ${p.state}`;
const key=s=>String(s||'').toLowerCase().replace(/\(.*?\)/g,'').replace(/[^a-z\u0900-\u097f ]/g,' ').replace(/\s+/g,' ').trim();

/** Match free text to the built-in list. "Nagpur", "nagpur, maharashtra" and "Nagpur, Maharashtra" all match. */
export function findLocal(text){
  const q=key(text.split(',')[0]);if(!q)return null;
  return P.find(p=>key(p.name)===q)||P.find(p=>[...p.name.matchAll(/\(([^)]*)\)/g)].some(m=>key(m[1])===q))||null;
}

/** Resolve place text to {lat,lon,label,source}. Returns null if unknown / lookup fails. Works in browser and Node 18+. */
export async function resolvePlace(text){
  const t=String(text||'').trim();if(!t)return null;
  const l=findLocal(t);if(l)return{lat:l.lat,lon:l.lon,label:placeLabel(l),source:'list'};
  try{
    const ctl=typeof AbortController!=='undefined'?new AbortController():null;const to=ctl&&setTimeout(()=>ctl.abort(),6000);
    const r=await fetch('https://nominatim.openstreetmap.org/search?format=json&limit=1&q='+encodeURIComponent(t),{headers:{'Accept':'application/json'},signal:ctl?.signal});
    if(to)clearTimeout(to);if(!r.ok)return null;const j=await r.json();
    if(j&&j[0])return{lat:+j[0].lat,lon:+j[0].lon,label:String(j[0].display_name).split(',').slice(0,3).join(','),source:'osm'};
  }catch{}
  return null;
}

const INDIA_BBOX='68.0,6.0,98.5,37.6'; // lon_min,lat_min,lon_max,lat_max
/** Live autocomplete for any town / village in India. Returns [{label,lat,lon}] (built-in cities first, then OpenStreetMap via Photon). */
export async function searchPlaces(q,signal){
  const t=String(q||'').trim();if(t.length<2)return[];
  const k=key(t);
  const local=P.filter(p=>key(p.name).startsWith(k)).slice(0,4).map(p=>({label:placeLabel(p),lat:p.lat,lon:p.lon}));
  let remote=[];
  try{
    const r=await fetch('https://photon.komoot.io/api/?limit=8&lang=en&bbox='+INDIA_BBOX+'&q='+encodeURIComponent(t),{signal});
    if(r.ok){const j=await r.json();
      remote=(j.features||[]).filter(f=>f.properties?.countrycode==='IN'||!f.properties?.countrycode).map(f=>{const x=f.properties||{};
        const parts=[x.name,x.district||x.county,x.state].filter(Boolean);
        return{label:[...new Set(parts)].join(', '),lat:f.geometry.coordinates[1],lon:f.geometry.coordinates[0]}});}
  }catch(e){if(e?.name==='AbortError')throw e}
  const seen=new Set(),out=[];
  for(const x of [...local,...remote]){const id=x.label.toLowerCase();if(!seen.has(id)){seen.add(id);out.push(x)}}
  return out.slice(0,10);
}