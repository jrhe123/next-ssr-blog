import { NextRequest } from "next/server";

const PUBLIC_PATH = /\.(.*)$/;

export function middleware(req: NextRequest) {
  // 1. logging
  if (!PUBLIC_PATH.test(req?.nextUrl?.pathname)) {
    // console.log(req.nextUrl.href);
    // console.log(req.referrer);
    // console.log(req.ua);
    // console.log(req.geo);
  }

  // 2. redirect
  if (req?.nextUrl?.pathname === "/tag") {
    // return NextResponse?.redirect('/user/2');
  }

  // 3.
  // return new Response("Hello world")
}
