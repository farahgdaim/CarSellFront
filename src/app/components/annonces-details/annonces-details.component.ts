import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-annonces-details',
  templateUrl: './annonces-details.component.html',
  styleUrls: ['./annonces-details.component.css']
})
export class AnnoncesDetailsComponent implements OnInit {
  annonce: any;


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://127.0.0.1:8000/api/annonces/${id}`).subscribe((data: any) => {
      this.annonce = data;
    });
  }

}
