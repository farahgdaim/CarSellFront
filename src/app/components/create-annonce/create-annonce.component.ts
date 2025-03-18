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
  
  // New properties for error handling
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
    photos: [],
    // Additional fields (region, delegation, telephone, etc.)
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
      // Manually check for radio button fields that are not part of form controls
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
    if (files.length < 3) {
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

  submitAnnonce() {
    // Final check before submission
    if (!this.annonce.titre || !this.annonce.description || !this.annonce.prix || !this.annonce.photos || this.annonce.photos.length < 3) {
      this.submissionError = "Veuillez remplir tous les champs requis et télécharger au moins 3 photos.";
      // Optionally, send the user back to the information step
      this.currentStep = 3;
      return;
    }

    // Transform equipment array into a string.
    this.annonce.vehicule.equipement = this.annonce.vehicule.equipements.join(', ');
    delete this.annonce.vehicule.equipements;

    let images = [];
    for (let i = 0; i < this.annonce.photos.length; i++) {
      let file = this.annonce.photos[i];
      images.push({
        chemin: file.name,
        format: file.type,
        taille: file.size.toString()
      });
    }
    this.annonce.images = images;
    delete this.annonce.photos;

    const payload = {
      titre: this.annonce.titre,
      description: this.annonce.description,
      prix: Number(this.annonce.prix),
      vehicule: {
        Categorie: this.annonce.vehicule.Categorie,
        Marque: this.annonce.vehicule.Marque,
        "Modèle": this.annonce.vehicule["Modèle"],
        TypeCarburant: this.annonce.vehicule.TypeCarburant,
        Puissance: this.annonce.vehicule.Puissance,
        DateDeMiseEnCirculation: this.annonce.vehicule.DateDeMiseEnCirculation,
        Cylindre: this.annonce.vehicule.Cylindre,
        Kilométrage: Number(this.annonce.vehicule['Kilométrage']),
        nbPortes: String(this.annonce.vehicule.nbPortes), 
        boiteVitesse: this.annonce.vehicule.boiteVitesse,
        etat: this.annonce.vehicule.etat,
        equipement: this.annonce.vehicule.equipement
      },
      images: this.annonce.images
    };

    console.log('Payload sent to backend:', payload);

    this.annonceService.createAnnonce(payload).subscribe({
      next: (res: any) => {
        // Inform the user of success
        alert('Votre annonce a été créée avec succès!');
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        console.error(err);
        this.submissionError = "Une erreur est survenue lors de la création de l'annonce. Veuillez réessayer.";
      }
    });
  }
}
