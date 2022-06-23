import type { Context } from "../../deps.ts";

export async function logger(ctx: Context, next: () => Promise<unknown>) {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
}

export async function timing(ctx: Context, next: () => Promise<unknown>) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
}

export async function index(ctx: Context, next: () => Promise<unknown>) {
  try {
    await ctx.send({
      root: `${Deno.cwd()}/src/client`,
      index: "index.html",
    });
  } catch {
    next();
  }
}
