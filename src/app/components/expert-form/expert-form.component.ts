import { Component } from '@angular/core';
import { ExpertService } from '../../services/expert.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-expert-form',
  templateUrl: './expert-form.component.html',
  styleUrls: ['./expert-form.component.css']
})
export class ExpertFormComponent {
  expert = {
    domaineExpertise: '',
    anneesExperience: 0,
    certificationFile: null as File | null
  };

  error: string | null = null;
  success: string | null = null;

  constructor(private expertService: ExpertService, private loadingService: LoadingService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.expert.certificationFile = file;
      this.error = null; // Réinitialise l'erreur
    } else {
      this.error = "Veuillez sélectionner un fichier PDF valide.";
      this.expert.certificationFile = null;
    }
  }

  submitForm() {
    if (!this.expert.certificationFile) {
      this.error = "Le fichier de certification est requis.";
      return;
    }
    // Réinitialiser les messages de feedback
    this.error = null;
    this.success = null;
 
    // Préparer les données avec FormData
    const formData = new FormData();
    formData.append('certification', this.expert.certificationFile);
    formData.append('domaineExpertise', this.expert.domaineExpertise);
    formData.append('anneesExperience', this.expert.anneesExperience.toString());

    this.loadingService.show();
    this.expertService.requestExpertRole(formData).subscribe({
      next: (res: any) => {
        this.loadingService.hide();
        if (res.status === 200 || res.status === 201) {
          this.success = "Votre candidature a été envoyée avec succès. Veuillez attendre la réponse de l'administration.";
        } else if (res.status === 400) {
          this.error = res.data || "Une demande est déjà en cours ou vous êtes déjà expert.";
        } else {
          this.error = "Une réponse inattendue a été reçue.";
        }
      },
      error: (err: any) => {
        this.loadingService.hide();
        this.error = err.error.data || "Erreur lors de l'envoi de la candidature.";
      }
    });
  }
}
