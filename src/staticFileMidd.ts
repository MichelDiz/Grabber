import { Context, Router, send } from "./deps.ts";

export const staticFileMidd = async (ctx: Context, next: Function) => {
  const path = `${Deno.cwd()}/build${ctx.request.url.pathname}`;

  if (ctx.request.url.pathname == "/") {
    ctx.response.redirect("http://localhost:8008/index.html?home");
  }
  if (ctx.request.url.pathname == "/settings") {
    ctx.response.redirect("http://localhost:8008/index.html?settings");
  }
  if (ctx.request.url.pathname == "/login") {
    ctx.response.redirect("http://localhost:8008/index.html?login");
  }

  if (await fileExists(path)) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/build`,
    });
  } else {
    await next();
  }
};

async function fileExists(path: string) {
  try {
    const stats = await Deno.lstat(path);
    return stats && stats.isFile;
  } catch (error) {
    if (error && error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error;
    }
  }
}
