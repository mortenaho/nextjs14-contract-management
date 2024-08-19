import { NextRequest, NextResponse } from 'next/server';
import { LoginCookiName } from './app/_lib/general-var';
import { Token } from './app/dtos/response/token';

export function middleware(req: NextRequest) {
    // خواندن توکن از کوکی‌ها
    const token = req.cookies.get(LoginCookiName)?.value ;
    // اگر توکن وجود نداشته باشد، هدایت به صفحه ورود
    if (token==undefined) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
    
    // ادامه پردازش درخواست
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'], // تعریف مسیرهایی که Middleware باید روی آن‌ها اعمال شود
};
