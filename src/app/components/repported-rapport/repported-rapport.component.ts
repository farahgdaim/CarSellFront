import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepportedRapportService } from 'src/app/service/repported-rapport.service';

@Component({
  selector: 'app-repported-rapport',
  templateUrl: './repported-rapport.component.html',
  styleUrls: ['./repported-rapport.component.css']
})
export class RepportedRapportComponent implements OnInit {
  rapports:any;
  error: string | null = null;
  constructor(private repportedRapport: RepportedRapportService, private router: Router){}

  ngOnInit(): void {
    this.getRapportData();
  }

  getRapportData(){
    this.repportedRapport.getRepportedRapport().subscribe((res : any)=>{
  
      
      if (res && typeof res === 'object' && 'data' in res) {
        this.rapports = res.data;
      } else {
        console.error('Format inattendu :', res);
        this.rapports = [];
        this.router.navigate(['/admin/login']); 
      }
    });
  }
  goToRapportDetails(id:string){
    this.router.navigate(['/admin/repported-rapport',id]);
  }

}
