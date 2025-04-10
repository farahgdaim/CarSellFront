import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule ,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AnnoncesDetailsComponent } from './components/annonces-details/annonces-details.component';
import { CarCarouselComponent } from './components/car-carousel/car-carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
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
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationDetailComponent } from './components/conversation-detail/conversation-detail.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';

import { ExpertsListComponent } from './components/experts-list/experts-list.component';
import { ExpertProfileComponent } from './components/expert-profile/expert-profile.component';

import { MesAnnoncesComponent } from './components/mes-annonces/mes-annonces.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NgChartsConfiguration, NgChartsModule } from 'ng2-charts';

import { NgxSpinnerModule } from "ngx-spinner";
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { RepportedAnnoncesComponent } from './components/repported-annonces/repported-annonces.component';
import { RepportedAnnoncesDetailsComponent } from './components/repported-annonces-details/repported-annonces-details.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AnnoncesComponent,
    NavbarComponent,
    AnnoncesDetailsComponent,
    CarCarouselComponent,
    FooterComponent,
    ExpertFormComponent,
    UpdateProfileComponent,
    ProfileComponent,
    CreateAnnonceComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminProfileComponent,
    AdminExpertRequestsComponent,
    AdminExpertRequestDetailComponent,
    NotificationListComponent,
    ConversationListComponent,
    ConversationDetailComponent,
    UserListComponent,
    PublicProfileComponent,
    ExpertsListComponent,
    ExpertProfileComponent,
    MesAnnoncesComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    RepportedAnnoncesComponent,
    RepportedAnnoncesDetailsComponent,
   
    
    
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,

    AppRoutingModule, 
    ReactiveFormsModule,
    NgChartsModule,
    NgxSpinnerModule
   

  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: NgChartsConfiguration, useValue: { generateColors: false } }


    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }