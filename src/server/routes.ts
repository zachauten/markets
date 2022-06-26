import { RouteParams, RouterContext } from "../../deps.ts";
import { InitialState } from "./models.ts";
import { ssr } from "../client/index.ts";

export enum Routes {
  HEALTH = "/api/health",
  INDEX = "/",
  ICS = "/api/ics/:id"
}

export async function ics(ctx: RouterContext<Routes.ICS, RouteParams<Routes.ICS>, InitialState>, next: () => Promise<unknown>) {
  ctx.request
}

const index_html = ssr()
export async function idx(ctx: RouterContext<Routes.INDEX, RouteParams<Routes.INDEX>, InitialState>, next: () => Promise<unknown>) {
  ctx.response.body = index_html;
  next()
}

