import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DetailAnnonceService } from 'src/app/service/detail-annonce.service';

@Component({
  selector: 'app-annonces-details',
  templateUrl: './annonces-details.component.html',
  styleUrls: ['./annonces-details.component.css'],
})
export class AnnoncesDetailsComponent implements OnInit {
  annonce: any = { images: [] };
  isLoading: boolean = true;
  error: string | null = null;
  autoScrollInterval: any;
  currentSlide = 0;
  // imagesPerPage = 4;
  categories: any[] = [];
  
  equipementsOptions = [
    'Jantes aluminium', 'ABS', 'Direction assistée', 'ESP', 'Climatisation',
    'Vitres électriques', 'Système de navigation', 'Airbags', 'MP3 Bluetooth',
    'Radar de recul', 'Antipatinage', 'Fermeture centrale', 'Limiteur De Vitesse',
    'Régulateur de vitesse', 'Toit ouvrant'
  ];

  mappingEquipements = {
    'SÉCURITÉ': ['ABS', 'Airbags', 'ESP', 'Antipatinage'],
    'INTÉRIEURS': ['Climatisation', 'Vitres électriques', 'Système de navigation', 'MP3 Bluetooth', 'Toit ouvrant'],
    'EXTÉRIEURS': ['Jantes aluminium', 'Radar de recul'],
    'FONCTIONNELS': ['Direction assistée', 'Fermeture centrale', 'Limiteur De Vitesse', 'Régulateur de vitesse']
  };


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private annonceService: DetailAnnonceService
  ) {}

  ngOnInit(): void {

    this.getAnnonceDetail();
   

  }
  formatPrix(prix: number): string {
    return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  
  getAnnonceDetail() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.annonceService.getAnnonceById(id).subscribe((res) => {
      console.log("l'annonce el ma7nouna ", res);
      if (res && typeof res === 'object' && 'data' in res) {
        this.annonce = res.data;
        this.genererCategories();
      } else {
        console.error('Format inattendu :', res);
        this.annonce = []; // Évite une erreur si la réponse n'est pas correcte
      }
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.autoScrollInterval);
  }
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.annonce.images.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.annonce.images.length) % this.annonce.images.length;
  }


  goToSlide(index: number) {
    this.currentSlide = index;
  }


  getDotCount() {
    return Array(this.annonce.images.length).fill(0);
  }

  startAutoScroll(): void {
    this.autoScrollInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // 5 secondes de pause entre les phases
  }

  restartAutoScroll(): void {
    clearInterval(this.autoScrollInterval);
    this.startAutoScroll();
  }

  genererCategories() {
    if (!this.annonce.vehicule || !this.annonce.vehicule.equipement) {
      console.warn("Les équipements ne sont pas disponibles.");
      return;
    }
  
    const equipementsAnnonce = this.annonce.vehicule.equipement.split(', ');
  
    this.categories = Object.entries(this.mappingEquipements).map(([nom, equipements]) => {
      return {
        nom,
        equipements: equipements.map(e => ({
          nom: e,
          estEnGris: equipementsAnnonce.includes(e)
        }))
      };
    });
  }
  
}
