import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { RepportedAnnoncesService } from 'src/app/service/repported-annonces.service';
import { DetailAnnonceService } from 'src/app/service/detail-annonce.service';

@Component({
  selector: 'app-repported-annonces',
  templateUrl: './repported-annonces.component.html',
  styleUrls: ['./repported-annonces.component.css']
})
export class RepportedAnnoncesComponent implements OnInit {
 annonces:any ;
 error: string | null = null;
   constructor(private dataService: RepportedAnnoncesService,private router: Router) { }
   ngOnInit(): void {
     this.getMesAnnoncesData()
   }
   getMesAnnoncesData() {
     this.dataService.getRepportedAnnonces().subscribe((res) => {
       //this.annonces = res;
       console.log(res);
       // Vérifier si 'res' est un objet et contient 'data'
       if (res && typeof res === 'object' && 'data' in res) {
         this.annonces = res.data;
       } else {
         console.error('Format inattendu :', res);
         this.annonces = [];
        // this.router.navigate(['/admin/login']);  Évite une erreur si la réponse n'est pas correcte
       }
     });
   }
   goToAnnonceDetails(id: string) {
     this.router.navigate(['/admin/repported-annonces', id]) /* .then(() => {
       this.viewportScroller.scrollToPosition([0, 0]);
     }) */; // Redirige vers /annonce/{id}
   }
 
  }
  


