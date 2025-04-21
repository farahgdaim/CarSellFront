import { Component, OnInit, Input } from '@angular/core';
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
export class AnnoncesDetailsComponent implements OnInit {
  annonce: any = { images: [] };
  isLoading: boolean = true;
  error: string | null = null;
  autoScrollInterval: any;
  currentSlide = 0;
  // imagesPerPage = 4;
  categories: any[] = [];
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
    private annonceService: DetailAnnonceService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getAnnonceDetail();
    if(id){
      this.verifierRapport(id);
    }else{
      console.error("l'id de l'annonce est non trouvé ");
    }
    

    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.loggedInUserId = res.data.id || res.data._id;
      },
      error: (err) => {
        console.error(
          "Erreur lors de la récupération de l'utilisateur connecté",
          err
        );
      },
    });
  }
  verifierRapport(annonceId: string) {
    this.rapportChecking = true;
    this.evaluationService.checkRapport(annonceId).subscribe({
      next: (res: any) => {
        this.rapportDisponible = res.data.rapport_genere === true;
        this.rapportChecking = false;
      },
      error: (error) => {
        console.error('Erreur lors de la vérification :', error);
        this.rapportChecking = false;
        this.rapportDisponible = false;
      },
    });
  }
  consulterRapport(annonceId: string) {
    this.router.navigate(['/rapport', annonceId]);
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

  reportAnnonce(id: string) {
    console.log("l'id de l'annonce", id);

    this.annonceService.reportAnnonces(id).subscribe(
      (response: any) => {
        console.log('Annonce signalée avec succès', response);

        // 🔹 Si le backend retourne bien un status 200
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

        // 🔸 On récupère le message d’erreur depuis le backend
        this.modalMessage =
          error.error?.data || 'Une erreur est survenue lors du signalement.';
        this.modalSuccess = false;
        this.modalVisible = true;
      }
    );
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

  closeModal() {
    this.modalVisible = false;
  }
  pendingAnnonceId: string | null = null;
  Evaluationverif(annonceId: string) {
    console.log('hello');

    this.evaluationService.checkEvaluationRequest(annonceId).subscribe({
      next: (response: any) => {
        this.hasAlreadyRequested = response.hasRequested;
        console.log('Déjà demandé ?', this.hasAlreadyRequested);
        this.modalSuccess1 = response.hasRequested; // true ou false
        if (response.hasRequested) {
          this.modalMessage1 =
            'Vous avez déjà soumis une demande d’évaluation pour ce véhicule. Vous pouvez consulter le rapport généré par l’expert ou procéder au paiement si ce n’est pas encore fait.';
          this.showContinueButton = false;
          this.showReportActions = true;
        } else {
          this.modalMessage1 =
            'En poursuivant, vous demandez à nos experts d’évaluer ce véhicule. Une fois la demande envoyée, vous aurez la possibilité de choisir l’expert que vous jugez le plus apte à réaliser cette évaluation en toute objectivité.';
          this.showContinueButton = true;
          this.pendingAnnonceId = annonceId; // utile si tu veux l'utiliser plus tard au clic sur "Continuer"
        }

        this.modalVisible1 = true;
      },
      error: (error) => {
        console.error('Erreur lors de la vérification de la demande :', error);
        this.modalSuccess1 = false;
        this.modalMessage1 =
          "Une erreur s'est produite lors de la vérification.";
        this.modalVisible1 = true;
      },
    });
  }
  closeModal1() {
    this.modalVisible1 = false;
  }
  continuerEvaluation() {
    if (this.pendingAnnonceId) {
      // logiquement, ici tu peux rediriger, ou ouvrir une section, etc.
      console.log(
        "L'utilisateur veut continuer avec l'annonce :",
        this.pendingAnnonceId
      );

      // Exemple : rediriger vers la page de sélection d’expert
      this.router.navigate(['/selection-expert', this.pendingAnnonceId]);

      this.modalVisible1 = false;
    }
  }
  demandeStatus: boolean = false;
  modalVisible2: boolean = false;
  modalSuccess2: boolean = false; // vrai si "hasRequested" est true
  modalMessage2: string = '';
  rapportDisponible: boolean = false;
  rapportChecking: boolean = false;
   /*consulterRapport(annonceId: string) {
    console.log("debut de méthode de consulter rapport  ");
    
    this.rapportChecking = true;
    this.evaluationService.checkRapport(annonceId).subscribe({
      next: (res: any) => {
        this.demandeStatus = res.data.rapport_genere;
        this.rapportDisponible = res.data.rapport_genere === true;
        console.log("var rapport disponible",this.rapportDisponible);
        
        this.rapportChecking = false;
        /* console.log('le status de la demande :', this.demandeStatus);
        
        this.modalSuccess2 = this.demandeStatus;  //true ou false
        
        if (this.rapportDisponible) {
          console.log("le rapport submitted");
          
          this.router.navigate(['/rapport', annonceId]);
        } else {
          console.log("rapport en cours");
          
          this.modalMessage2 = "L'expert travaille actuellement sur l’évaluation.";
          this.modalVisible2 = true;
        }
      },

        if (this.modalSuccess2) {
          console.log('rapport submitted');

          this.router.navigate(['/rapport', annonceId]);
        } else {
          this.modalMessage2 =
            "L'expert a bien reçu votre demande et travaille actuellement sur l’évaluation. Vous serez notifié dès que le rapport sera disponible. ";
        }
        this.modalVisible2 = true;
      }, 
      error: (error) => {
        console.error('Erreur lors de la vérification de la demande :', error);
        this.modalSuccess2 = false;
        this.modalMessage2 =
          "Une erreur s'est produite lors de la vérification.";
        this.modalVisible2 = true;
      },
    });
    // this.router.navigate(['/rapport', this.pendingAnnonceId]);

    // }
  }*/
  payerExpert() {
    // Exemple : ouvrir une page de paiement ou appeler un service
    this.router.navigate(['/paiement', this.pendingAnnonceId]);
  }
  closeModal2() {
    this.modalVisible2 = false;
  }
}
