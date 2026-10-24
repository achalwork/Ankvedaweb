import {analyze} from '../src/lib/analyze.js';
import {suggest} from '../src/lib/variants.js';
import {reportHtml} from '../src/lib/reportHtml.js';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import puppeteer from 'puppeteer';
const dir=path.dirname(fileURLToPath(import.meta.url));
const font=readFileSync(path.join(dir,'fonts/NotoSansDevanagari.ttf')).toString('base64');
const fontFace=`@font-face{font-family:NS;src:url(data:font/ttf;base64,${font});font-weight:100 900}`;

export async function buildReport({name,d,m,y},lang='mr'){
  const r=analyze({name,d,m,y});if(r.error)throw new Error('bad input');
  const sug=suggest(name,r.mulank,r.bhagyank,5);
  const browser=await puppeteer.launch({headless:true,executablePath:process.env.CHROME_PATH||undefined,args:['--no-sandbox','--disable-setuid-sandbox']});
  try{const pg=await browser.newPage();await pg.setContent(reportHtml(r,sug,lang==='en'?'en':'mr',fontFace),{waitUntil:'load'});
    await pg.evaluate(()=>document.fonts.ready);
    return Buffer.from(await pg.pdf({format:'A4',printBackground:true,preferCSSPageSize:true}));
  }finally{await browser.close()}
}
