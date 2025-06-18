import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailAnnonceService } from 'src/app/service/detail-annonce.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { AuthService } from 'src/app/services/auth.service';
import { GererMesAnnoncesService } from 'src/app/service/gerer-mes-annonces.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-mes-annonces-details',
  templateUrl: './mes-annonces-details.component.html',
  styleUrls: ['./mes-annonces-details.component.css']
})
export class MesAnnoncesDetailsComponent implements OnInit{
  annonce: any = { images: [] };
  isLoading: boolean = true;
  error: string | null = null;
  autoScrollInterval: any;
  currentSlide = 0;
  // imagesPerPage = 4;
  categories: any[] = [];
  vehicule:any={};
  loggedInUserId: string = '';
  

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
    'Radar de recul',
    'Antipatinage',
    'Fermeture centrale',
    'Limiteur De Vitesse',
    'Régulateur de vitesse',
    'Toit ouvrant',
  ];

  mappingEquipements = {
    SÉCURITÉ: ['ABS', 'Airbags', 'ESP', 'Antipatinage'],
    INTÉRIEURS: [
      'Climatisation',
      'Vitres électriques',
      'Système de navigation',
      'MP3 Bluetooth',
      'Toit ouvrant',
    ],
    EXTÉRIEURS: ['Jantes aluminium', 'Radar de recul'],
    FONCTIONNELS: [
      'Direction assistée',
      'Fermeture centrale',
      'Limiteur De Vitesse',
      'Régulateur de vitesse',
    ],
  };
  modalVisible1: boolean = false;
  modalSuccess1: boolean = false; // vrai si "hasRequested" est true
  modalMessage1: string = '';
  showContinueButton: boolean = false;
  showReportActions: boolean = false;

  modalVisible: boolean = false;
  modalMessage: string = '';
  modalSuccess: boolean = true;
  hasAlreadyRequested: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private conversationService: ConversationService,
    private router: Router,
    private authService: AuthService,
    private evaluationService: EvaluationService,
    private gererAnnonce : GererMesAnnoncesService,
    private loadingService: LoadingService,
    private annonceService: DetailAnnonceService
  ) {}

  ngOnInit(): void {
    this.loadingService.show(); 
    this.getAnnonceDetail();
   

    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.loggedInUserId = res.data.id || res.data._id;
        this.loadingService.hide(); 
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'utilisateur connecté",err);
        this.loadingService.hide();
      },
    });
  }
  formatPrix(prix ?: number): string {
    if(!prix) return '0';
    return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getAnnonceDetail() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.isLoading = true;
    this.loadingService.show(); 
    this.annonceService.getAnnonceById(id).subscribe((res) => {
      
      if (res && typeof res === 'object' && 'data' in res) {
        this.annonce = res.data;
        this.genererCategories();
      } else {
        console.error('Format inattendu :', res);
        this.annonce = []; // Évite une erreur si la réponse n'est pas correcte
        this.loadingService.hide();
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
    this.currentSlide =
      (this.currentSlide - 1 + this.annonce.images.length) %
      this.annonce.images.length;
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
      console.warn('Les équipements ne sont pas disponibles.');
      return;
    }

    const equipementsAnnonce = this.annonce.vehicule.equipement.split(', ');

    this.categories = Object.entries(this.mappingEquipements).map(
      ([nom, equipements]) => {
        return {
          nom,
          equipements: equipements.map((e) => ({
            nom: e,
            estEnGris: equipementsAnnonce.includes(e),
          })),
        };
      }
    );
  }
  deleteAnnonce(id:string){
    this.loadingService.show();
    this.gererAnnonce.deleteAnnonce(id).subscribe((res: any)=>{
      
      
       if (res.status === 204) {
          this.modalMessage = "l'annonce est supprimé avec succès" ;
          this.modalSuccess = true;
          
        } else {
          this.modalMessage = res.data || 'Une erreur est survenue.';
          this.modalSuccess = false;
        }

        this.modalVisible = true;
        this.loadingService.hide();
      },
      (error) => {
        console.error("Erreur lors du signalement de l'annonce", error);

        // 🔸 On récupère le message d’erreur depuis le backend
        this.modalMessage =
          error.error?.data || 'Une erreur est survenue lors du signalement.';
        this.modalSuccess = false;
        this.modalVisible = true;
        this.loadingService.hide();
      }
    );
      
  }
  closeModal() {
    this.modalVisible = false;
    this.router.navigate(['/mesAnnonces']);
  }
  updateAnnonce(id:string){
    
   /*  console.log("lid de l'annonce",id);
    console.log(this.annonce); */
    this.router.navigate(['/update-annonce',id]);
    
    
  }
  

}
