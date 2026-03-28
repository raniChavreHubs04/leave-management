import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // LocalStorage se token lo
  const token = localStorage.getItem('token');

  // Agar token mila to request mein attach karo
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // Agar token nahi hai to simple request bhejo
  return next(req);
};