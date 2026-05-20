import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
    });
  }

  return next(req).pipe(
    catchError((error) => {
      console.log('HTTP Error:', error);
      throw error;
    }),
  );
};
