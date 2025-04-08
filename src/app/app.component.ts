import { Component, OnInit } from '@angular/core';
import { NavbarService } from './service/navbar.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Frontend';
  isAdmin: boolean = false;

  constructor(private navbarService: NavbarService ,private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isAdmin = this.router.url.startsWith('/admin');
      }
    });
  }
  
  ngOnInit() {
    this.navbarService.updateNavbar();
  }


}



