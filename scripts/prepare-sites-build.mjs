import { mkdir, writeFile } from 'node:fs/promises';

await mkdir(new URL('../dist/server/', import.meta.url), { recursive: true });
await writeFile(
  new URL('../dist/server/index.js', import.meta.url),
  'export default {\n  async fetch(request, env) {\n    if (env.ASSETS?.fetch) return env.ASSETS.fetch(request);\n    return new Response(\"Asset service unavailable\", { status: 503 });\n  },\n};\n',
);
