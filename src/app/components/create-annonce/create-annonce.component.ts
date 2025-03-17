import { Component } from '@angular/core';
import { AnnonceService } from '../../services/annonce.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-annonce',
  templateUrl: './create-annonce.component.html',
  styleUrls: ['./create-annonce.component.css']
})
export class CreateAnnonceComponent {
  currentStep: number = 1;

  // Data model for the announcement
  annonce: any = {
    vehicule: {
      Categorie: '',
      Marque: '',
      "Modèle": '',
      Puissance: '', // Will be numeric
      TypeCarburant: '',
      Cylindre: '',
      DateDeMiseEnCirculation: '',
      Kilométrage: '', // Will be numeric
      nbPortes: '',
      etat: '',
      boiteVitesse: '',
      // We'll collect equipment as an array then join it later
      equipements: []
    },
    titre: '',
    description: '',
    prix: '', // numeric
    // We will use a separate property for file objects; later transformed into images array
    photos: [],
    // Extra fields like region, delegation, telephone or sponsoring are not part of backend validation,
    // so we ignore them here.
  };

  // Equipment options (Step 2)
  equipmentOptions = [
    { name: 'Jantes aluminium', icon: 'fa fa-car' },
    { name: 'ABS', icon: 'fa fa-lock' },
    { name: 'Direction assistée', icon: 'fa fa-cogs' },
    { name: 'ESP', icon: 'fa fa-shield' },
    { name: 'Climatisation', icon: 'fa fa-snowflake-o' },
    { name: 'Vitres électriques', icon: 'fa fa-window-maximize' },
    { name: 'Système de navigation', icon: 'fa fa-map' },
    { name: 'Airbags', icon: 'fa fa-life-ring' },
    { name: 'MP3 Bluetooth', icon: 'fa fa-bluetooth' },
    { name: 'Radar de recul', icon: 'fa fa-video-camera' },
    { name: 'Antipatinage', icon: 'fa fa-ban' },
    { name: 'Fermeture centrale', icon: 'fa fa-unlock-alt' },
    { name: 'Limiteur de vitesse', icon: 'fa fa-tachometer' },
    { name: 'Régulateur de vitesse', icon: 'fa fa-dashboard' },
    { name: 'Toit ouvrant', icon: 'fa fa-sun-o' }
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

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
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
      alert("Veuillez sélectionner au moins 3 photos.");
      return;
    }
    // Store the File objects
    this.annonce.photos = files;
  }

  selectSponsoring(pack: any) {
    this.selectedSponsoring = pack;
    // The sponsoring package is not part of the backend validation for annonce,
    // so we could send it later as extra info if needed.
  }

  submitAnnonce() {
    // Transform equipment array into a string as expected by the backend (key: equipement)
    this.annonce.vehicule.equipement = this.annonce.vehicule.equipements.join(', ');
    // Remove the temporary "equipements" property if it exists
    delete this.annonce.vehicule.equipements;

    // Process photos: transform the File objects into an images array
    let images = [];
    for (let i = 0; i < this.annonce.photos.length; i++) {
      let file = this.annonce.photos[i];
      images.push({
        chemin: file.name,
        format: file.type,
        taille: file.size.toString()
      });
    }
    // Add images array to the payload
    this.annonce.images = images;
    // Remove the temporary photos property
    delete this.annonce.photos;

    // Build the payload according to backend validation requirements
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
        Kilométrage: Number(this.annonce.vehicule.Kilométrage),
        nbPortes: this.annonce.vehicule.nbPortes,
        boiteVitesse: this.annonce.vehicule.boiteVitesse,
        etat: this.annonce.vehicule.etat,
        equipement: this.annonce.vehicule.equipement
      },
      images: this.annonce.images
    };

    // Debug log to verify payload structure
    console.log('Payload sent to backend:', payload);

    // Call the service to create the annonce
    this.annonceService.createAnnonce(payload).subscribe({
      next: (res: any) => {
        alert("Votre annonce a été publiée avec succès !");
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        alert("Erreur lors de la création de l'annonce.");
        console.error(err);
      }
    });
  }
}
