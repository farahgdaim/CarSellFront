import { Component ,OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent {
  notification:any;
  searchTerm: string = '';
  searchResults: any[] = [];
  constructor(private dataService: DataService) { }
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
  

  getNotificationsData(){
    this.dataService.getNotificationsData().subscribe(res=>{
      // console.log(res);
      this.notification = res;
    });
  }
  ngOnInit():void{
    //this.loadNavbarScript();
  }
  /*loadNavbarScript() {
    const script = document.createElement('script');
    script.src = 'assets/navbar.js'; // Chemin relatif au component
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }*/
  onSearch() {
    if (this.searchTerm.trim()) {
      this.dataService.searchAnnonces(this.searchTerm).subscribe(
        (response: any) => {
          if (response.status === 200) {
            this.searchResults = response.data;
          } else {
            this.searchResults = [];
          }
        },
        (error) => {
          console.error('Erreur lors de la recherche :', error);
        }
      );
    }
  }
  

}
