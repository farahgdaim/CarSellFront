import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.updateNavbar());
  }

  public updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const isHome = ['/', '/annonces'].includes(this.router.url);
    
    if (navbar) {
      navbar.classList.remove('scrolled', 'home-page');
      
      if (isHome) {
        navbar.classList.add('home-page');
        this.setupScrollBehavior(navbar);
      } else {
        navbar.classList.add('scrolled');
      }
    }
  }

  private setupScrollBehavior(navbar: Element) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
}