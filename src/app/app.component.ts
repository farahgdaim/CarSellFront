import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { NavbarService } from './service/navbar.service';
import { LoadingService } from './services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  loading: Observable<boolean>;

  constructor(private navbarService: NavbarService, private loadingService: LoadingService, private router: Router) {
    this.loading = this.loadingService.loading$; // Initialize the loading observable
  }

  ngOnInit(): void {
    this.navbarService.updateNavbar();
    this.adjustMargin(); // Adjust margin when the app starts
  }

  @HostListener('window:resize', [])
  onResize(): void {
    this.adjustMargin(); // Update margin dynamically on window resize
  }

  private adjustMargin(): void {
    const footerHeight = document.querySelector('.footer')?.clientHeight || 0;
    const viewportHeight = window.innerHeight;
    const contentHeight = document.querySelector('.content')?.clientHeight || 0;

    // Calculate margin-top if footer is visible without scrolling
    let dynamicMargin = viewportHeight < contentHeight + footerHeight
      ? viewportHeight / 2 // Adjust this value as needed
      : 0;
    dynamicMargin = dynamicMargin + 50; // Add extra spacing
    document.documentElement.style.setProperty('--dynamic-margin', `${dynamicMargin}px`);
  }

  isLoginOrRegister(): boolean {
    const currentRoute = this.router.url;
    return currentRoute === '/login' || currentRoute === '/register';
  }
}