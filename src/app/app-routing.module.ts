import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AnnoncesDetailsComponent } from './components/annonces-details/annonces-details.component';
import { CarCarouselComponent } from './components/car-carousel/car-carousel.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Routes = [
  { path: '', component: AnnoncesComponent },
  { path: 'annonce/:id', component: AnnoncesDetailsComponent },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
