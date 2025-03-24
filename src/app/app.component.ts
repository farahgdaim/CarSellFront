import { Component , OnInit  } from '@angular/core';
import { NavbarService } from './service/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Frontend';
  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
    this.navbarService.updateNavbar();
  }
}
