import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

import { DetailAnnonceService } from 'src/app/service/detail-annonce.service';


@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css'],
})
export class AnnoncesComponent implements OnInit {
  annonces: any;

  user: any ;

  isExpert: boolean = false;

  searchCriteria: any = {
    categorie: '',
    marque: '',
    modele: '',
    puissance: '',
    kilometrage: '',
    energie: '',
    dateMiseEnCirculation: '',
    cylindre: '',
    nbPortes: '',
    boiteVitesse: '',
    etat: '',
    equipements: [],
  };
  equipementsOptions = [
    'Jantes aluminium',
    'ABS',
    'Direction assistée',
    'ESP',
    'Climatisation',
    'Vitres électriques',
    'Système de navigation',
    'Airbags',
    'MP3 Bluetooth',
    'Radar De Recul',
    'Antipatinage',
    'Fermeture centrale',
    'Limiteur De Vitesse',
    'Régulateur de vitesse',
    'Toit ouvrant',
  ];
  marques: any;
  modeles: any;
  selectedMarque: string = '';
  annonce:any;
  constructor(
     private annonceService: DetailAnnonceService,
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private loadingService: LoadingService 
  ) {}

  ngOnInit(): void {
    this.isExpert = this.authService.currentUserIsExpert();
    this.loadingService.show(); // Show loader at start
    this.getAnnoncesData();
    this.loadMarques();
  }


  loadMarques(): void {
    this.loadingService.show(); // Show loader while loading marques
    this.dataService.getMarques().subscribe((data) => {
      this.marques = data;
      this.loadingService.hide(); // Hide loader after marques are loaded
    });
  }

  onMarqueChange(): void {
    this.searchCriteria.marque = this.selectedMarque;

    if (this.selectedMarque) {
      this.loadingService.show(); 
      this.dataService.getModeles(this.selectedMarque).subscribe((data) => {
        this.modeles = data;
        this.loadingService.hide();
      });
    } else {
      this.modeles = [];
    }
  }

  resetFilters(): void {
    this.searchCriteria = {
      marque: '',
      modele: '',
      puissance: null,
      kilometrage: null,
      energie: '',
      dateMiseEnCirculation: null,
      cylindre: '',
      nbPortes: '',
      boiteVitesse: '',
      etat: '',
      equipements: [],
    };
    this.selectedMarque = '';
    this.annonces = []; // Ou recharge les annonces par défaut
  }


  getAnnonceDetails(id:string){
    this.loadingService.show(); 
    this.annonceService.getAnnonceById(id).subscribe((res) => {
      
      if (res && typeof res === 'object' && 'data' in res) {
        this.annonce = res.data;
       
      } else {
        console.error('Format inattendu :', res);
        this.annonce = []; // Évite une erreur si la réponse n'est pas correcte
      }
      this.loadingService.hide(); 
    });
  }


  getAnnoncesData(): void {
    this.loadingService.show(); 
    this.dataService.getData().subscribe((res) => {
      if (res && typeof res === 'object' && 'data' in res) {
        this.annonces = res.data;
      } else {
        console.error('Format inattendu :', res);
        this.annonces = [];
      }
      this.loadingService.hide(); 
    });
  }

goToAnnonceDetails(annonceId: string) {
  this.loadingService.show(); 
  // On récupère l'utilisateur connecté d'abord
  this.authService.getUser().subscribe((userRes: any) => {
    const user = userRes?.data;

    if (!user) {
      console.error("Utilisateur non connecté.");
      this.loadingService.hide();
      return;
    }

    this.annonceService.getAnnonceById(annonceId).subscribe((res: any) => {
      if (res && typeof res === 'object' && 'data' in res) {
        const annonce = res.data;

        if (user.id === annonce.Ref_id_user) {
          this.router.navigate(['/mon-annonce', annonceId]);
         
        } else {
          this.router.navigate(['/annonce', annonceId]);
          
        }

      } else {
        console.error('Format inattendu :', res);
      }
      this.loadingService.hide();
    });

  });
}

  

  onSearch(): void {
    this.loadingService.show(); 
    this.dataService
      .searchAnnonces(this.searchCriteria)
      .subscribe((data: any) => {
        this.annonces = data.data;
        this.loadingService.hide();
      });
  }

  getEquipementIcon(equipement: string): string {
    const iconsMap: { [key: string]: string } = {
      Climatisation: 'fas fa-snowflake',
      GPS: 'fas fa-map-marker-alt',
      'Sièges chauffants': 'fas fa-chair',
      'Caméra de recul': 'fas fa-video',
      Bluetooth: 'fas fa-bluetooth',
      'Toit ouvrant': 'fas fa-sun',
      'Régulateur de vitesse': 'fas fa-tachometer-alt',
      Airbags: 'fas fa-car-crash',
    };
    return iconsMap[equipement] || 'fas fa-check';
  }

  handleImageError(event: Event, url: string): void {
   
    console.error("Erreur de chargement de l'image:", event);
  }

  logAnnonce(ann: any): void {
    console.log('Annonce cliquée :', ann);
  }
}
