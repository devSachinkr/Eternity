import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const allowedOrigins = ["http://localhost:5173","http://localhost:3000"];
const corsOptions = {
 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
 'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
const isProtectedRoutes = createRouteMatcher([
  "/dashboard(.*)",
  "/payment(.*)",
]);
export default clerkMiddleware(async (auth, request) => {
  const origin = request.headers.get("origin") ??"";
  const isAllowedOrigin = allowedOrigins.includes(origin);
  if(request.method==="OPTIONS"){
    const preflightHeaders={
      ...(isAllowedOrigin && {'Access-Control-Allow-Origin':origin}),
      ...corsOptions,
    }
    return NextResponse.json({}, {headers:preflightHeaders})
  }

    if (isProtectedRoutes(request)) {
      await auth.protect()
    }
    const res=NextResponse.next();
    if(isAllowedOrigin){
      res.headers.set("Access-Control-Allow-Origin",origin);
    }
    Object.entries(corsOptions).forEach(([key,value])=>{
      res.headers.set(key,value);
    })
    return res;
  })



export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
