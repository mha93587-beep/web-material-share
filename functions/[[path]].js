import { render } from '../dist/server/entry-server.js';

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);

  try {
    const templateRes = await env.ASSETS.fetch(new URL('/index.html', request.url));
    const template = await templateRes.text();

    const { html: appHtml, helmetContext } = await render(url.pathname + url.search);
    const { helmet } = helmetContext ?? {};

    const headTags = helmet
      ? [
          helmet.title?.toString() ?? '',
          helmet.meta?.toString() ?? '',
          helmet.link?.toString() ?? '',
          helmet.script?.toString() ?? '',
        ]
          .filter((s) => s.trim())
          .join('\n    ')
      : '';

    const html = template
      .replace('<!--ssr-head-->', headTags)
      .replace('<!--app-html-->', appHtml);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html;charset=UTF-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (e) {
    console.error('SSR error:', e);
    const fallback = await env.ASSETS.fetch(new URL('/index.html', request.url));
    return fallback;
  }
}
