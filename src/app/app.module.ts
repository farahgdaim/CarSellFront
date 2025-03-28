
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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnnoncesListComponent } from './components/annonces-list/annonces-list.component';
import { AnnonceDetailComponent } from './components/annonce-detail/annonce-detail.component';


import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ExpertFormComponent } from './components/expert-form/expert-form.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateAnnonceComponent } from './components/create-annonce/create-annonce.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/admin-register/admin-register.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { AdminExpertRequestsComponent } from './components/admin-expert-requests/admin-expert-requests.component';
import { AdminExpertRequestDetailComponent } from './components/admin-expert-request-detail/admin-expert-request-detail.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';






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
   
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AnnoncesListComponent,
    AnnonceDetailComponent,
    ExpertFormComponent,
    UpdateProfileComponent,
    ProfileComponent,
    CreateAnnonceComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminProfileComponent,
    AdminExpertRequestsComponent,
    AdminExpertRequestDetailComponent,
    NotificationListComponent
    
    
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    AppRoutingModule, 
    ReactiveFormsModule

   
  ],
  /* imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
   
  ], */
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
