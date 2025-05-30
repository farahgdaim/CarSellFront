import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailAnnonceService } from 'src/app/service/detail-annonce.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-achat-vehicule',
  templateUrl: './achat-vehicule.component.html',
  styleUrls: ['./achat-vehicule.component.css']
})
export class AchatVehiculeComponent implements OnInit {
annonce: any = { images: [] };
user: any = null;
  constructor(
    private authService: AuthService, 
    private route: ActivatedRoute,
    private annonceService: DetailAnnonceService
  ) {}

ngOnInit(): void {
  //const id = this.route.snapshot.paramMap.get('id');
  this.getAnnonceDetail();
  this.getUserDetail();
}
getAnnonceDetail(){
  const id=this.route.snapshot.paramMap.get('id')!;
  this.annonceService.getAnnonceById(id).subscribe((res:any)=>{
    this.annonce= res.data;
  });
}

getUserDetail(){
  this.authService.getUser().subscribe({
    next:(res:any)=>{
      console.log(res.data);
      
      this.user=res.data;
    }
  })
}
}
