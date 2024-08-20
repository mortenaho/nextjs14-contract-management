import { NextRequest, NextResponse } from 'next/server';
import { LoginCookiName } from './app/_lib/general-var';

export  function middleware(req: NextRequest) {
    // خواندن توکن از کوکی‌ها
     
    // اگر توکن وجود نداشته باشد، هدایت به صفحه ورود
    if (req.cookies.get(LoginCookiName)?.value==undefined) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
   
    if (req.nextUrl.pathname.startsWith('/api')) {
        const token =JSON.parse(req.cookies.get(LoginCookiName)?.value) ;
        const requestHeaders = new Headers(req.headers)
         
         
        requestHeaders.set("Authorization", `${token?.tokenType} ${token?.accessToken}`)
       return NextResponse.next({
            request: {
              // New request headers
              headers: requestHeaders,
            },
          })
      }
    
    // ادامه پردازش درخواست
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*','/api/:path*'], // تعریف مسیرهایی که Middleware باید روی آن‌ها اعمال شود
};
