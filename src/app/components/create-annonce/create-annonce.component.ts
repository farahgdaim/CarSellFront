import { Component } from '@angular/core';
import { AnnonceService } from '../../services/annonce.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingService } from '../../services/loading.service';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create-annonce',
  templateUrl: './create-annonce.component.html',
  styleUrls: ['./create-annonce.component.css']
})
export class CreateAnnonceComponent {
  currentStep: number = 3;
  step2Error: string = '';
  submittedStep1: boolean = false;
  submittedStep3: boolean = false;

  estimating = false;
  estimatedPrice: number|null = null;
  errorEstimation = '';
  
  // Error management
  photoError: string = '';
  submissionError: string = '';

  // Separate arrays for car and truck marques
  carMarques: string[] = [
    'Toyota', 'BMW', 'Mercedes-Benz', 'Honda', 'Ford', 'Audi', 'Chevrolet',
    'Nissan', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Volvo',
    'Jaguar', 'Land Rover', 'Peugeot', 'Renault', 'Citroën', 'Fiat', 'Alfa Romeo',
    'Lexus', 'Acura', 'Infiniti', 'Mitsubishi', 'Suzuki'
  ];
  truckMarques: string[] = [
    'Scania', 'MAN', 'Volvo Trucks', 'Iveco', 'DAF', 'Freightliner',
    'Kenworth', 'Peterbilt', 'Mack', 'Isuzu', 'Hino'
  ];

  // Separate model options for cars and trucks
  carModelOptions: { [key: string]: string[] } = {
    Toyota: ['Corolla', 'Camry', 'Prius', 'RAV4', 'Hilux'],
    BMW: ['3 Series', '5 Series', 'X3', 'X5'],
    'Mercedes-Benz': ['Classe A', 'Classe C', 'Classe E', 'Classe S'],
    Honda: ['Civic', 'Accord', 'CR-V', 'Pilot'],
    Ford: ['Focus', 'Fiesta', 'Mustang', 'Explorer', 'F-150'],
    Audi: ['A3', 'A4', 'A6', 'Q5', 'Q7'],
    Chevrolet: ['Malibu', 'Impala', 'Camaro', 'Silverado'],
    Nissan: ['Sentra', 'Altima', 'Maxima', 'GT-R', 'Navara'],
    Volkswagen: ['Golf', 'Passat', 'Tiguan', 'Transporter'],
    Hyundai: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe'],
    Kia: ['Rio', 'Optima', 'Sportage', 'Sorento'],
    Mazda: ['Mazda3', 'Mazda6', 'CX-5', 'CX-9'],
    Subaru: ['Impreza', 'Legacy', 'Forester', 'Outback'],
    Volvo: ['S60', 'XC90', 'V90'],
    Jaguar: ['XE', 'XF', 'F-Pace'],
    'Land Rover': ['Discovery', 'Range Rover', 'Defender'],
    Peugeot: ['208', '308', '508', 'Partner'],
    Renault: ['Clio', 'Megane', 'Talisman', 'Master'],
    Citroën: ['C3', 'C4', 'C5', 'Berlingo'],
    Fiat: ['500', 'Panda', 'Tipo', 'Ducato'],
    'Alfa Romeo': ['Giulia', 'Stelvio', '4C'],
    Lexus: ['IS', 'ES', 'RX', 'LX'],
    Acura: ['TLX', 'MDX', 'RDX'],
    Infiniti: ['Q50', 'Q60', 'QX60'],
    Mitsubishi: ['Lancer', 'Outlander', 'Eclipse Cross'],
    Suzuki: ['Swift', 'Vitara', 'Celerio']
  };

  truckModelOptions: { [key: string]: string[] } = {
    Scania: ['R-Series', 'S-Series', 'P-Series'],
    MAN: ['TGX', 'TGS', 'TGL'],
    'Volvo Trucks': ['FH', 'FM', 'FL'],
    Iveco: ['Stralis', 'Eurocargo', 'Daily'],
    DAF: ['XF', 'LF', 'CF'],
    Freightliner: ['Cascadia', 'M2 106', 'Argosy'],
    Kenworth: ['T680', 'T880'],
    Peterbilt: ['579', '389'],
    Mack: ['Anthem', 'Pinnacle'],
    Isuzu: ['N-Series', 'F-Series', 'C-Series'],
    Hino: ['500 Series', '300 Series']
  };

  // Separate dynamic options for fuel types
  carFuelOptions: { [key: string]: string[] } = {
    Toyota: ['Essence', 'Diesel', 'Hybrid', 'Electrique'],
    BMW: ['Essence', 'Diesel'],
    'Mercedes-Benz': ['Essence', 'Diesel', 'Hybrid', 'Electrique'],
    Honda: ['Essence', 'Hybrid'],
    Ford: ['Essence', 'Diesel', 'Hybrid'],
    Audi: ['Essence', 'Diesel', 'Electrique'],
    Chevrolet: ['Essence', 'Diesel'],
    Nissan: ['Essence', 'Diesel', 'Hybrid'],
    Volkswagen: ['Essence', 'Diesel', 'Electrique'],
    Hyundai: ['Essence', 'Diesel', 'Hybrid'],
    Kia: ['Essence', 'Diesel', 'Hybrid'],
    Mazda: ['Essence', 'Diesel'],
    Subaru: ['Essence', 'Diesel'],
    Volvo: ['Essence', 'Diesel', 'Hybrid'],
    Jaguar: ['Essence', 'Hybrid'],
    'Land Rover': ['Essence', 'Diesel'],
    Peugeot: ['Essence', 'Diesel', 'Electrique'],
    Renault: ['Essence', 'Diesel', 'Hybrid', 'Electrique'],
    Citroën: ['Essence', 'Diesel'],
    Fiat: ['Essence', 'Diesel'],
    'Alfa Romeo': ['Essence'],
    Lexus: ['Essence', 'Hybrid'],
    Acura: ['Essence', 'Hybrid'],
    Infiniti: ['Essence', 'Hybrid'],
    Mitsubishi: ['Essence', 'Diesel', 'Hybrid'],
    Suzuki: ['Essence']
  };
  truckFuelOptions: { [key: string]: string[] } = {
    Scania: ['Diesel'],
    MAN: ['Diesel'],
    'Volvo Trucks': ['Diesel'],
    Iveco: ['Diesel'],
    DAF: ['Diesel'],
    Freightliner: ['Diesel'],
    Kenworth: ['Diesel'],
    Peterbilt: ['Diesel'],
    Mack: ['Diesel'],
    Isuzu: ['Diesel'],
    Hino: ['Diesel']
  };

  // Separate dynamic options for cylinder configurations
  carCylinderOptions: { [key: string]: string[] } = {
    Toyota: ['4', '6'],
    BMW: ['4', '6', '8'],
    'Mercedes-Benz': ['4', '6', '8'],
    Honda: ['4', '6'],
    Ford: ['4', '6', '8'],
    Audi: ['4', '6', '8'],
    Chevrolet: ['4', '6', '8'],
    Nissan: ['4', '6', '8'],
    Volkswagen: ['4', '6', '8'],
    Hyundai: ['4', '6'],
    Kia: ['4', '6'],
    Mazda: ['4', '6'],
    Subaru: ['4', '6'],
    Volvo: ['4', '6', '8'],
    Jaguar: ['4', '6', '8'],
    'Land Rover': ['4', '6', '8'],
    Peugeot: ['4', '6'],
    Renault: ['4', '6'],
    Citroën: ['4', '6'],
    Fiat: ['4', '6'],
    'Alfa Romeo': ['4', '6'],
    Lexus: ['4', '6'],
    Acura: ['4', '6'],
    Infiniti: ['4', '6', '8'],
    Mitsubishi: ['4', '6'],
    Suzuki: ['4']
  };
  truckCylinderOptions: { [key: string]: string[] } = {
    Scania: ['6', '8', '10'],
    MAN: ['6', '8', '10'],
    'Volvo Trucks': ['6', '8', '10'],
    Iveco: ['6', '8', '10'],
    DAF: ['6', '8', '10'],
    Freightliner: ['6', '8', '10'],
    Kenworth: ['6', '8', '10'],
    Peterbilt: ['6', '8', '10'],
    Mack: ['6', '8', '10'],
    Isuzu: ['6', '8', '10'],
    Hino: ['6', '8', '10']
  };

  // Separate dynamic options for fiscal power (Puissance)
  carPuissanceOptions: { [key: string]: string[] } = {
    Toyota: ['5 CV', '7 CV', '9 CV'],
    BMW: ['7 CV', '9 CV', '11 CV'],
    'Mercedes-Benz': ['7 CV', '9 CV', '11 CV'],
    Honda: ['5 CV', '7 CV'],
    Ford: ['5 CV', '7 CV', '9 CV'],
    Audi: ['7 CV', '9 CV', '11 CV'],
    Chevrolet: ['5 CV', '7 CV', '9 CV'],
    Nissan: ['5 CV', '7 CV', '9 CV'],
    Volkswagen: ['5 CV', '7 CV', '9 CV'],
    Hyundai: ['5 CV', '7 CV'],
    Kia: ['5 CV', '7 CV'],
    Mazda: ['5 CV', '7 CV'],
    Subaru: ['5 CV', '7 CV'],
    Volvo: ['7 CV', '9 CV', '11 CV'],
    Jaguar: ['7 CV', '9 CV'],
    'Land Rover': ['7 CV', '9 CV'],
    Peugeot: ['5 CV', '7 CV', '9 CV'],
    Renault: ['5 CV', '7 CV', '9 CV'],
    Citroën: ['5 CV', '7 CV'],
    Fiat: ['5 CV', '7 CV'],
    'Alfa Romeo': ['5 CV', '7 CV'],
    Lexus: ['7 CV', '9 CV'],
    Acura: ['7 CV', '9 CV'],
    Infiniti: ['7 CV', '9 CV'],
    Mitsubishi: ['5 CV', '7 CV', '9 CV'],
    Suzuki: ['5 CV', '7 CV']
  };
  truckPuissanceOptions: { [key: string]: string[] } = {
    Scania: ['15 CV', '20 CV', '25 CV'],
    MAN: ['15 CV', '20 CV', '25 CV'],
    'Volvo Trucks': ['15 CV', '20 CV', '25 CV'],
    Iveco: ['15 CV', '20 CV', '25 CV'],
    DAF: ['15 CV', '20 CV', '25 CV'],
    Freightliner: ['15 CV', '20 CV', '25 CV'],
    Kenworth: ['15 CV', '20 CV', '25 CV'],
    Peterbilt: ['15 CV', '20 CV', '25 CV'],
    Mack: ['15 CV', '20 CV', '25 CV'],
    Isuzu: ['15 CV', '20 CV', '25 CV'],
    Hino: ['15 CV', '20 CV', '25 CV']
  };

  // The vehicle announcement object
  annonce: any = {
    vehicule: {
      Categorie: '', // 'Voiture' for car or 'Camion' for truck
      Marque: '',
      "Modèle": '',
      Puissance: '', 
      TypeCarburant: '',
      Cylindre: '',
      DateDeMiseEnCirculation: '',
      Kilométrage: '',
      nbPortes: '',
      etat: '',
      boiteVitesse: '',
      equipements: []  // Selected equipments
    },
    titre: '',
    description: '',
    prix: '',
    photos: [] // Photo files
  };

  // Equipment options (step 2)
  equipmentOptions = [
    { name: 'Jantes aluminium', icon: 'assets/equipements/jauntes.png' },
    { name: 'ABS', icon: 'assets/equipements/ABS.png' },
    { name: 'Direction assistée', icon: 'assets/equipements/assistee.png' },
    { name: 'ESP', icon: 'assets/equipements/esp.png' },
    { name: 'Climatisation', icon: 'assets/equipements/climatiseur.png' },
    { name: 'Vitres électriques', icon: 'assets/equipements/windows.png' },
    { name: 'Système de navigation', icon: 'assets/equipements/gps.png' },
    { name: 'Airbags', icon: 'assets/equipements/Airbag.png' },
    { name: 'MP3 Bluetooth', icon: 'assets/equipements/bluetooth.png' },
    { name: 'Radar de recul', icon: 'assets/equipements/parking.png' },
    { name: 'Antipatinage', icon: 'assets/equipements/antipatinage.png' },
    { name: 'Fermeture centrale', icon: 'assets/equipements/Fermeture.png' },
    { name: 'Limiteur de vitesse', icon: 'assets/equipements/regulateur-de-vitesse.png' },
    { name: 'Régulateur de vitesse', icon: 'assets/equipements/regulateur_de_vitesse.png' },
    { name: 'Toit ouvrant', icon: 'assets/equipements/toit-ouvrant.png' }
  ];
  
  // Sponsoring options (step 4)
  sponsoringPackages = [
    { id: 'standard', name: 'Pack Standard', description: "Votre annonce sera mise en avant pendant 7 jours.", price: 15 },
    { id: 'gold', name: 'Pack Gold', description: "Votre annonce sera mise en avant pendant 14 jours.", price: 25 },
    { id: 'premium', name: 'Pack Premium', description: "Votre annonce sera mise en avant pendant 30 jours.", price: 45 },
    { id: 'none', name: 'Pas de Boost', description: "Publiez sans boost.", price: 0 }
  ];

  selectedSponsoring: any = null;

  constructor(
    private annonceService: AnnonceService, 
    private router: Router,
    private loadingService: LoadingService,
    private http: HttpClient
  ) {}
  
  private roundUp(value: number, unit: number = 100): number {
    return Math.ceil(value / unit) * unit;
  }
  estimatePrice() {
    this.errorEstimation = '';
    this.estimating     = true;
    
    const v = this.annonce.vehicule;
    const puissance = parseInt(v.Puissance.replace(/\D+/g,''), 10);
    const cylindre = parseInt(v.Cylindre.replace(/\D+/g,''), 10);
    const km        = parseFloat(String(v.Kilométrage).replace(/\s+/g,''));
    const payload = {
      Categorie: v.Categorie,
      Marque: v.Marque,
      Modèle: v.Modèle,
      TypeCarburant: v.TypeCarburant,
      Puissance: puissance,
      Cylindre: cylindre,
      DateDeMiseEnCirculation: v.DateDeMiseEnCirculation,
      Kilométrage: km,
      etat: v.etat,
      boiteVitesse: v.boiteVitesse
    };
    this.loadingService.show();
    this.http.post<any>('http://localhost:8000/api/predict-price', payload)
      .pipe(finalize(() => {
        this.estimating = false;
        this.loadingService.hide(); // Hide loader after estimation
      }))
      .subscribe({
        next: res => {
          if (res.success) {
            this.estimatedPrice =  this.roundUp(res.prix_estime, 100);
            if (this.estimatedPrice !== null) {
              this.annonce.prix = this.estimatedPrice.toString();
            }
          } else {
            this.errorEstimation = 'Impossible d’estimer le prix';
          }
        },
        error: () => {
          this.errorEstimation = 'Service indisponible';
        }
      });
  }

  // Getter for marques based on selected category
  getMarques(): string[] {
    return this.annonce.vehicule.Categorie === 'Camion' ? this.truckMarques : this.carMarques;
  }

  // Getter for model options based on selected marque and category
  getModelOptions(): string[] {
    if (this.annonce.vehicule.Categorie === 'Camion') {
      return this.truckModelOptions[this.annonce.vehicule.Marque] || [];
    }
    return this.carModelOptions[this.annonce.vehicule.Marque] || [];
  }

  // Getter for fuel options based on selected marque and category
  getFuelOptions(): string[] {
    if (this.annonce.vehicule.Categorie === 'Camion') {
      return this.truckFuelOptions[this.annonce.vehicule.Marque] || [];
    }
    return this.carFuelOptions[this.annonce.vehicule.Marque] || [];
  }

  // Getter for cylinder options
  getCylinderOptions(): string[] {
    if (this.annonce.vehicule.Categorie === 'Camion') {
      return this.truckCylinderOptions[this.annonce.vehicule.Marque] || [];
    }
    return this.carCylinderOptions[this.annonce.vehicule.Marque] || [];
  }

  // Getter for puissance options
  getPuissanceOptions(): string[] {
    if (this.annonce.vehicule.Categorie === 'Camion') {
      return this.truckPuissanceOptions[this.annonce.vehicule.Marque] || [];
    }
    return this.carPuissanceOptions[this.annonce.vehicule.Marque] || [];
  }

  // Navigation between steps with validation
  nextStep(form?: NgForm) {
    if (this.currentStep === 1 && form) {
      this.submittedStep1 = true;
      Object.keys(form.controls).forEach(field => {
        form.controls[field].markAsTouched();
      });
      if (!this.annonce.vehicule.etat || !this.annonce.vehicule.boiteVitesse) {
        return;
      }
      if (!form.valid) {
        return;
      }
    }
    if (this.currentStep === 3 && form) {
      this.submittedStep3 = true;
      Object.keys(form.controls).forEach(field => {
        form.controls[field].markAsTouched();
      });
      if (!form.valid) {
        return;
      }
    }
    if (this.currentStep === 2 && this.annonce.vehicule.equipements.length === 0) {
      this.step2Error = "Veuillez sélectionner au moins un équipement.";
      return;
    } else if (this.currentStep === 2) {
      this.step2Error = '';
    }
    this.currentStep++;
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Toggle equipment selection
  toggleEquipment(equipName: string) {
    const index = this.annonce.vehicule.equipements.indexOf(equipName);
    if (index === -1) {
      this.annonce.vehicule.equipements.push(equipName);
    } else {
      this.annonce.vehicule.equipements.splice(index, 1);
    }
  }

  // Photo selection handler
  onPhotosSelected(event: any) {
    const files = event.target.files;
    if (!files || files.length < 3) {
      this.photoError = "Minimum 3 photos requises.";
      this.annonce.photos = [];
    } else {
      this.photoError = "";
      this.annonce.photos = files;
    }
  }

  selectSponsoring(pack: any) {
    this.selectedSponsoring = pack;
  }

  // Final submission of the announcement
  submitAnnonce() {
    if (!this.annonce.titre || !this.annonce.description || !this.annonce.prix || !this.annonce.photos || this.annonce.photos.length < 3) {
      this.submissionError = "Veuillez remplir tous les champs requis et télécharger au moins 3 photos.";
      this.currentStep = 3;
      return;
    }
    const equipementString = this.annonce.vehicule.equipements.join(', ');
    const formData = new FormData();
    formData.append('titre', this.annonce.titre);
    formData.append('description', this.annonce.description);
    formData.append('prix', this.annonce.prix);
    formData.append('vehicule[Categorie]', this.annonce.vehicule.Categorie);
    formData.append('vehicule[Marque]', this.annonce.vehicule.Marque);
    formData.append('vehicule[Modèle]', this.annonce.vehicule["Modèle"]);
    formData.append('vehicule[TypeCarburant]', this.annonce.vehicule.TypeCarburant);
    formData.append('vehicule[Puissance]', this.annonce.vehicule.Puissance);
    formData.append('vehicule[DateDeMiseEnCirculation]', this.annonce.vehicule.DateDeMiseEnCirculation);
    formData.append('vehicule[Cylindre]', this.annonce.vehicule.Cylindre);
    formData.append('vehicule[Kilométrage]', String(this.annonce.vehicule['Kilométrage']));
    formData.append('vehicule[nbPortes]', String(this.annonce.vehicule.nbPortes));
    formData.append('vehicule[boiteVitesse]', this.annonce.vehicule.boiteVitesse);
    formData.append('vehicule[etat]', this.annonce.vehicule.etat);
    formData.append('vehicule[equipement]', equipementString);
    
    
    for (let i = 0; i < this.annonce.photos.length; i++) {
      formData.append('images[]', this.annonce.photos[i]);
    }
    this.loadingService.show();
    this.annonceService.createAnnonce(formData).subscribe({
      next: (res: any) => {
        
        this.loadingService.hide();
        // alert('Votre annonce a été créée avec succès!');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.loadingService.hide();
        console.error("Erreur lors de la création de l'annonce :", err);
        this.submissionError = err.error && err.error.message ? err.error.message : "Une erreur est survenue lors de la création de l'annonce. Veuillez réessayer.";
      }
    });
  }
}
