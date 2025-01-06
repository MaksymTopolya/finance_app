import { updateSession } from "@/utils/supabase/midleware";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  if (!user && request.nextUrl.pathname.startsWith("/dashboard"))
    return NextResponse.redirect("/login");

  if (user && request.nextUrl.pathname.startsWith("/login"))
    return NextResponse.redirect("/dashboard");

  return await updateSession(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
