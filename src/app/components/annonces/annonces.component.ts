import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css'],
})
export class AnnoncesComponent implements OnInit {
  annonces: any;
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

  constructor(
    private dataService: DataService,
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    this.getAnnoncesData();
    this.loadMarques();
  }

  loadMarques(): void {
    this.dataService.getMarques().subscribe((data) => {
      this.marques = data;
    });
  }

  onMarqueChange(): void {
    this.searchCriteria.marque = this.selectedMarque;

    if (this.selectedMarque) {
      this.dataService.getModeles(this.selectedMarque).subscribe((data) => {
        console.log(this.selectedMarque);
        console.log(data);
        this.modeles = data;
      });
    } else {
      this.modeles = [];
    }
  }

  resetFilters(): void {
    this.searchCriteria = {
      categorie: '',
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
    this.annonces = [];
  }

  getAnnoncesData(): void {
    this.dataService.getData().subscribe((res) => {
      console.log(res);
      if (res && typeof res === 'object' && 'data' in res) {
        this.annonces = res.data;
      } else {
        console.error('Format inattendu :', res);
        this.annonces = [];
      }
    });
  }

  goToAnnonceDetails(id: string): void {
    this.router.navigate(['/annonce', id]);
  }

  onSearch(): void {
    this.dataService
      .searchAnnonces(this.searchCriteria)
      .subscribe((data: any) => {
        this.annonces = data.data;
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
    console.log('Image URL:', url);
    console.error("Erreur de chargement de l'image:", event);
  }

  logAnnonce(ann: any): void {
    console.log('Annonce cliquée :', ann);
  }
}
