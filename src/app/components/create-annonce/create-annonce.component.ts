import { Component } from '@angular/core';
import { AnnonceService } from '../../services/annonce.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-annonce',
  templateUrl: './create-annonce.component.html',
  styleUrls: ['./create-annonce.component.css']
})
export class CreateAnnonceComponent {
  currentStep: number = 1;
  step2Error: string = '';
  submittedStep1: boolean = false;
  submittedStep3: boolean = false;
  
  // Error handling properties
  photoError: string = '';
  submissionError: string = '';

  // Data model for the announcement
  annonce: any = {
    vehicule: {
      Categorie: '',
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
      // Temporary array for equipment choices
      equipements: []
    },
    titre: '',
    description: '',
    prix: '',
    photos: [] // We'll store a FileList here
    // Additional fields (region, delegation, telephone, etc.) can be added if needed
  };

  // Equipment options (Step 2)
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
  
  // Sponsoring packages (Step 4)
  sponsoringPackages = [
    { id: 'standard', name: 'Pack Standard', description: "Votre annonce sera mise en avant pendant 7 jours.", price: 15 },
    { id: 'gold', name: 'Pack Gold', description: "Votre annonce sera mise en avant pendant 14 jours.", price: 25 },
    { id: 'premium', name: 'Pack Premium', description: "Votre annonce sera mise en avant pendant 30 jours.", price: 45 },
    { id: 'none', name: 'Pas de Boost', description: "Publier votre annonce sans boost.", price: 0 }
  ];

  selectedSponsoring: any = null;

  constructor(private annonceService: AnnonceService, private router: Router) {}

  // Validate and advance to the next step (using a form when applicable)
  nextStep(form?: NgForm) {
    if (this.currentStep === 1 && form) {
      this.submittedStep1 = true;
      Object.keys(form.controls).forEach(field => {
        form.controls[field].markAsTouched();
      });
      // Check required radio buttons for "etat" and "boiteVitesse"
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
    // Step 2: Equipment selection must have at least one choice.
    if (this.currentStep === 2 && this.annonce.vehicule.equipements.length === 0) {
      this.step2Error = "Veuillez sélectionner au moins 1 équipement (plusieurs choix possibles).";
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

  // Toggle equipment selection on a single click event.
  toggleEquipment(equipName: string) {
    const index = this.annonce.vehicule.equipements.indexOf(equipName);
    if (index === -1) {
      this.annonce.vehicule.equipements.push(equipName);
    } else {
      this.annonce.vehicule.equipements.splice(index, 1);
    }
  }

  onPhotosSelected(event: any) {
    const files = event.target.files;
    if (!files || files.length < 3) {
      this.photoError = "Minimum 3 photos requises.";
      this.annonce.photos = [];
    } else {
      this.photoError = "";
      this.annonce.photos = files; // FileList is stored here.
    }
  }

  selectSponsoring(pack: any) {
    this.selectedSponsoring = pack;
  }

  submitAnnonce() {
    // Final check before submission
    if (!this.annonce.titre || !this.annonce.description || !this.annonce.prix || !this.annonce.photos || this.annonce.photos.length < 3) {
      this.submissionError = "Veuillez remplir tous les champs requis et télécharger au moins 3 photos.";
      // Optionally, send the user back to the information step
      this.currentStep = 3;
      return;
    }

    // Transform equipment array into a comma-separated string.
    const equipementString = this.annonce.vehicule.equipements.join(', ');

    // Create FormData to send files and other fields.
    const formData = new FormData();
    formData.append('titre', this.annonce.titre);
    formData.append('description', this.annonce.description);
    formData.append('prix', this.annonce.prix);

    // Append vehicule data using bracket notation.
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

    // Append each photo file.
    for (let i = 0; i < this.annonce.photos.length; i++) {
      formData.append('images[]', this.annonce.photos[i]);
    }

    console.log('Payload sent to backend:', formData);

    // Call the annonce service with the FormData payload.
    this.annonceService.createAnnonce(formData).subscribe({
      next: (res: any) => {
        // Inform the user of success
        alert('Votre annonce a été créée avec succès!');
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        console.error('Erreur lors de la création de l\'annonce:', err);
        this.submissionError = err.error && err.error.message
          ? err.error.message
          : "Une erreur est survenue lors de la création de l'annonce. Veuillez réessayer.";
      }
    });
  }
}
