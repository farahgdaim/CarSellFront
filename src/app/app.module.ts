import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule ,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { AnnoncesDetailsComponent } from './components/annonces-details/annonces-details.component';
import { CarCarouselComponent } from './components/car-carousel/car-carousel.component';
import { FooterComponent } from './components/footer/footer.component';






/* const appRoutes:Routes = [
  { path: '', component: AnnoncesComponent },
  { path: 'annonce/:id', component: AnnoncesDetailsComponent }

  
]; */

@NgModule({
  declarations: [
    AppComponent,
    AnnoncesComponent,
    NavbarComponent,
    AnnoncesDetailsComponent,
    CarCarouselComponent,
    FooterComponent,
   
   
    
    
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
