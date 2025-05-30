import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AdminAuthService } from '../services/admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private adminAuthService: AdminAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Vérifie si l'utilisateur est à la fois authentifié ET admin
    if (this.adminAuthService.isAdminLoggedIn()) {
      return true;
    } else {
      // Redirection vers la page de login admin spécifique
      //this.adminAuthService.logout().subscribe();
      this.router.navigate(['/admin/login']); 
      return false;
    }
  }
}
