import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const LEGACY: Record<string, string> = {
  "/ai-calling-agent": "/ai-automation",
  "/ai-calling-agent/clinic": "/ai-automation/clinic",
  "/ai-calling-agent/real-estate": "/ai-automation/real-estate",
};

const PORTFOLIO = new Set([
  "/about",
  "/projects",
  "/contact",
  "/schedule",
  "/resume",
  "/experience",
]);

function redirectTo(request: NextRequest, pathname: string) {
  const url = new URL(request.url);

  url.pathname = pathname;

  return NextResponse.redirect(url, 308);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const normalized =
    pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const destination = LEGACY[normalized];

  if (destination) {
    return redirectTo(request, destination);
  }

  if (PORTFOLIO.has(normalized) || normalized === "/blog" || normalized.startsWith("/blog/")) {
    return redirectTo(request, "/");
  }

  if (normalized !== pathname) {
    return redirectTo(request, normalized);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/|.*\\..*).*)"],
};
