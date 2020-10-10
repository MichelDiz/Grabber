import {
    Router,
    send,
    Context
  } from "./deps.ts";

export const staticFileMidd = async (ctx: Context, next: Function) => {

    const path = `${Deno.cwd()}/build${ctx.request.url.pathname}`;

    if (ctx.request.url.pathname == '/') {
        ctx.response.redirect("http://localhost:8008/index.html");
    }

    if (await fileExists(path)) {
        await send(ctx, ctx.request.url.pathname, {
            root: `${Deno.cwd()}/build`
        })
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
