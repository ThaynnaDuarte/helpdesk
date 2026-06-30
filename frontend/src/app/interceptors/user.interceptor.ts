import { HttpInterceptorFn } from '@angular/common/http';

export const userInterceptor: HttpInterceptorFn = (req, next) => {
  const userId = sessionStorage.getItem('userId');

  if (userId) {
    const cloned = req.clone({
      setHeaders: { 'X-User-Id': userId }
    });
    return next(cloned);
  }

  return next(req);
};
