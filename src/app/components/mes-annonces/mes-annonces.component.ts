import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.component.html',
  styleUrls: ['./mes-annonces.component.css']
})
export class MesAnnoncesComponent implements OnInit {
  annonces:any ;
  constructor(private dataService: DataService,private router: Router) { }
  ngOnInit(): void {
    this.getMesAnnoncesData()
  }
  getMesAnnoncesData() {
    this.dataService.getMesAnnonces().subscribe((res) => {
      //this.annonces = res;
      console.log(res);
      // Vérifier si 'res' est un objet et contient 'data'
      if (res && typeof res === 'object' && 'data' in res) {
        this.annonces = res.data;
      } else {
        console.error('Format inattendu :', res);
        this.annonces = []; // Évite une erreur si la réponse n'est pas correcte
      }
    });
  }
  goToAnnonceDetails(id: string) {
    this.router.navigate(['/annonce', id]) /* .then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    }) */; // Redirige vers /annonce/{id}
  }

}
