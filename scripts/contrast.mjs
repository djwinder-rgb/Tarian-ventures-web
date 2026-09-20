import { readFile, writeFile, mkdir } from 'node:fs/promises';
const output = process.argv[2] ?? 'review/brand-refinement';
await mkdir(output, { recursive: true });
const css = await readFile('src/styles/global.css', 'utf8');
const palette = Object.fromEntries([...css.matchAll(/--([a-z]+): (#[a-f0-9]{6});/g)].map(([,name,hex])=>[name,hex.toUpperCase()]));
const luminance = hex => {
  const channels=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4);
  return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722;
};
const ratio=(a,b)=>{const [dark,light]=[luminance(a),luminance(b)].sort((x,y)=>x-y);return (light+.05)/(dark+.05);};
const combinations = [
  ['Forest on White: headings, links, navigation, focus, rules',palette.forest,palette.white,true],
  ['White on Forest: inverse text, CTA, inverse focus',palette.white,palette.forest,true],
  ['Deep Ink on White: body and supporting text',palette.ink,palette.white,true],
  ['White on Charcoal: hero copy, links, focus and CTA hover',palette.white,palette.ink,true],
  ['Rule on Charcoal: motion-control border',palette.rule,palette.ink,true],
  ['Deep Ink on Tint: contact/about/legal text',palette.ink,palette.tint,true],
  ['Forest on Tint: headings, links, focus',palette.forest,palette.tint,true],
  ['Tint on Forest: footer secondary text',palette.tint,palette.forest,true],
  ['White on Forest / Forest on White: CTA default and hover',palette.forest,palette.white,true],
  ['Supplied horizontal logo Midnight on White','#101820',palette.white,true],
  ['Supplied horizontal logo Slate on White','#35434A',palette.white,true],
  ['Supplied favicon/app-icon White on Midnight',palette.white,'#101820',true],
  ['Structural rule on White: decorative separator only',palette.rule,palette.white,false],
  ['Structural rule on Tint: decorative separator only',palette.rule,palette.tint,false],
];
const results=combinations.map(([role,foreground,background,meaningful])=>({role,foreground,background,ratio:Number(ratio(foreground,background).toFixed(2)),meaningful}));
if(results.some(item=>item.meaningful&&item.ratio<4.5))throw new Error('Meaningful colour combination below AA normal-text contrast');
await writeFile(`${output}/contrast.json`,JSON.stringify({palette,results},null,2)+'\n');
console.log(results);
