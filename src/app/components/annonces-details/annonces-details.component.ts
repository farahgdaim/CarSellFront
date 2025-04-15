import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailAnnonceService } from 'src/app/service/detail-annonce.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { EvaluationService } from 'src/app/service/evaluation.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-annonces-details',
  templateUrl: './annonces-details.component.html',
  styleUrls: ['./annonces-details.component.css'],
})
export class AnnoncesDetailsComponent implements OnInit, OnDestroy {
  annonce: any = { images: [] };
  isLoading: boolean = true;
  error: string | null = null;
  autoScrollInterval: any;
  currentSlide = 0;
  categories: any[] = [];
  loggedInUserId: string = '';

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

  modalVisible: boolean = false;
  modalMessage: string = '';
  modalSuccess: boolean = true;

  modalVisible1: boolean = false;
  modalSuccess1: boolean = false;
  modalMessage1: string = '';
  showContinueButton: boolean = false;
  showReportActions: boolean = false;

  modalVisible2: boolean = false;
  modalSuccess2: boolean = false;
  modalMessage2: string = '';

  hasAlreadyRequested: boolean = false;
  pendingAnnonceId: string | null = null;
  demandeStatus: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private conversationService: ConversationService,
    private router: Router,
    private authService: AuthService,
    private evaluationService: EvaluationService,
    private annonceService: DetailAnnonceService
  ) {}

  ngOnInit(): void {
    this.getAnnonceDetail();

    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.loggedInUserId = res.data.id || res.data._id;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'utilisateur connecté", err);
      },
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.autoScrollInterval);
  }

  formatPrix(prix: number): string {
    return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  getAnnonceDetail() {
    const id = this.route.snapshot.paramMap.get('id');
    this.annonceService.getAnnonceById(id).subscribe((res) => {
      if (res && typeof res === 'object' && 'data' in res) {
        this.annonce = res.data;
        this.genererCategories();
      } else {
        console.error('Format inattendu :', res);
        this.annonce = [];
      }
    });
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
    }, 5000);
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

  reportAnnonce(id: string) {
    this.annonceService.reportAnnonces(id).subscribe(
      (response: any) => {
        if (response.status === 200) {
          this.modalMessage = response.data;
          this.modalSuccess = true;
        } else {
          this.modalMessage = response.data || 'Une erreur est survenue.';
          this.modalSuccess = false;
        }
        this.modalVisible = true;
      },
      (error) => {
        console.error("Erreur lors du signalement de l'annonce", error);
        this.modalMessage = error.error?.data || 'Une erreur est survenue lors du signalement.';
        this.modalSuccess = false;
        this.modalVisible = true;
      }
    );
  }

  closeModal() {
    this.modalVisible = false;
  }

  startConversation(targetUserId: string): void {
    this.conversationService
      .getConversationBetweenUsers(this.loggedInUserId, targetUserId)
      .subscribe({
        next: (res: any) => {
          if (res && res.status === 200 && res.data) {
            const conv = res.data;
            const userId1 = conv.Ref_id_user1;
            const userId2 = conv.Ref_id_user2;
            this.router.navigate(['/conversation', userId1, userId2], {
              state: { conversation: conv },
            });
          } else {
            this.createNewConversation(targetUserId);
          }
        },
        error: (err) => {
          console.error('Erreur ou conversation introuvée', err);
          this.createNewConversation(targetUserId);
        },
      });
  }

  private createNewConversation(targetUserId: string): void {
    this.conversationService.createConversation(targetUserId).subscribe({
      next: (createRes: any) => {
        const newConversation = createRes.data;
        const userId1 = newConversation.Ref_id_user1;
        const userId2 = newConversation.Ref_id_user2;
        this.router.navigate(['/conversation', userId1, userId2], {
          state: { conversation: newConversation },
        });
      },
      error: (createErr) => {
        alert('Erreur lors de la création de la conversation.');
        console.error('Erreur création conversation:', createErr);
      },
    });
  }

  Evaluationverif(annonceId: string) {
    this.evaluationService.checkEvaluationRequest(annonceId).subscribe({
      next: (response: any) => {
        this.hasAlreadyRequested = response.hasRequested;
        this.modalSuccess1 = response.hasRequested;
        if (response.hasRequested) {
          this.modalMessage1 =
            'Vous avez déjà soumis une demande d’évaluation pour ce véhicule.';
          this.showContinueButton = false;
          this.showReportActions = true;
        } else {
          this.modalMessage1 =
            'Vous êtes sur le point de demander une évaluation par un expert.';
          this.showContinueButton = true;
          this.pendingAnnonceId = annonceId;
        }
        this.modalVisible1 = true;
      },
      error: (error) => {
        console.error('Erreur lors de la vérification de la demande :', error);
        this.modalSuccess1 = false;
        this.modalMessage1 = "Une erreur s'est produite.";
        this.modalVisible1 = true;
      },
    });
  }

  closeModal1() {
    this.modalVisible1 = false;
  }

  continuerEvaluation() {
    if (this.pendingAnnonceId) {
      this.router.navigate(['/selection-expert', this.pendingAnnonceId]);
      this.modalVisible1 = false;
    }
  }

  consulterRapport(annonceId: string) {
    this.evaluationService.checkRapport(annonceId).subscribe({
      next: (res: any) => {
        this.demandeStatus = res.data.rapport_genere;
        this.modalSuccess2 = this.demandeStatus;
        if (this.modalSuccess2) {
          this.router.navigate(['/rapport', annonceId]);
        } else {
          this.modalMessage2 =
            "L'expert travaille actuellement sur l’évaluation. Vous serez notifié dès que le rapport sera disponible.";
          this.modalVisible2 = true;
        }
      },
      error: (error) => {
        console.error("Erreur lors de la vérification du rapport :", error);
        this.modalMessage2 = "Erreur lors de la récupération du rapport.";
        this.modalSuccess2 = false;
        this.modalVisible2 = true;
      },
    });
  }
}
