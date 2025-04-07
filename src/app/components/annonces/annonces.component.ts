import { Component,OnInit} from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent implements OnInit  {
  annonces:any;
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
    equipements: []
  };
  equipementsOptions = [
    'Jantes aluminium', 'ABS', 'Direction assistée', 'ESP', 'Climatisation',
    'Vitres électriques', 'Système de navigation', 'Airbags', 'MP3 Bluetooth',
    'Radar De Recul', 'Antipatinage', 'Fermeture centrale', 'Limiteur De Vitesse',
    'Régulateur de vitesse', 'Toit ouvrant'
  ];
  constructor(private dataService:DataService,private router: Router){}
  ngOnInit(): void{
    this.getAnnoncesData();
  }
  getAnnoncesData(){
    
    this.dataService.getData().subscribe(res=>{
      // Vérifier si 'res' est un objet et contient 'data'
    if (res && typeof res === 'object' && 'data' in res) {
      this.annonces = res.data; 
    } else {
      console.error("Format inattendu :", res);
      this.annonces = []; // Évite une erreur si la réponse n'est pas correcte
    }
      
    });
  }
  goToAnnonceDetails(id: string) {
    this.router.navigate(['/annonce', id]); // Redirige vers /annonce/{id}
  }
  
  onSearch() {
    this.dataService.searchAnnonces(this.searchCriteria).subscribe((data: any) => {
      this.annonces = data.data; // Met à jour la liste des annonces affichées
    });
  }
  getEquipementIcon(equipement: string): string {
    const iconsMap: { [key: string]: string } = {
        "Climatisation": "fas fa-snowflake",
        "GPS": "fas fa-map-marker-alt",
        "Sièges chauffants": "fas fa-chair",
        "Caméra de recul": "fas fa-video",
        "Bluetooth": "fas fa-bluetooth",
        "Toit ouvrant": "fas fa-sun",
        "Régulateur de vitesse": "fas fa-tachometer-alt",
        "Airbags": "fas fa-car-crash"
    };
    return iconsMap[equipement] || "fas fa-check"; // Icône par défaut
}
handleImageError(event: Event, url: string) {
  console.log("Image URL:", url);
  console.error("Erreur de chargement de l'image:", event);
}

logAnnonce(ann: any) {
  console.log('Annonce cliquée :', ann);
}



}
