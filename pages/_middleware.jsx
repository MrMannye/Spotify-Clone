import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req){
    const token = await getToken({req, secret: process.env.JWT_SECRET});
    // If token exists
    if(!token && req.nextUrl.pathname !== '/login'){
        return NextResponse.next();
    }
    if(req.nextUrl.pathname.includes('/api/auth') || token){
        return NextResponse.redirect("http://localhost:3000/login");
    }
}