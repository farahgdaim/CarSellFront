import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string | null = null;

    // If the request URL includes '/admin/', use the admin token
    if (req.url.includes('/admin/')) {
      token = this.tokenService.getAdminToken();
    } else {
      token = this.tokenService.getToken();
    }

    // Add the Authorization header if token exists
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    }

    // Proceed without modification if no token exists
    return next.handle(req);
  }
}