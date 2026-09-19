// Local validation server for built files. Applies the generated global headers;
// Cloudflare's own routing/preview rules still require post-deployment verification.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root = resolve('dist');
const headerText = await readFile(resolve(root, '_headers'), 'utf8');
const globalBlock = headerText.split('\n\n')[0].split('\n').slice(1);
const headers = Object.fromEntries(globalBlock.filter(line => line.trim()).map(line => {
  const colon = line.indexOf(':');
  return [line.slice(0, colon).trim(), line.slice(colon + 1).trim()];
}));
const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain' };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) throw new Error('Outside build');
    if (pathname === '/_headers') throw new Error('Private deployment configuration');
    let code = 200;
    try {
      if ((await stat(file)).isDirectory()) {
        if (!pathname.endsWith('/')) { res.writeHead(301, { Location: pathname + '/' }); res.end(); return; }
        file = resolve(file, 'index.html');
      }
      await stat(file);
    } catch {
      file = resolve(root, '404.html');
      code = 404;
    }
    res.writeHead(code, { ...headers, 'Content-Type': `${types[extname(file)] ?? 'application/octet-stream'}; charset=utf-8` });
    res.end(await readFile(file));
  } catch {
    res.writeHead(400); res.end('Bad request');
  }
}).listen(4321, '127.0.0.1', () => console.log('Built site with headers: http://127.0.0.1:4321'));
