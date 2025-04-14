import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { ExpertsListComponent } from './components/experts-list/experts-list.component';
import { ExpertProfileComponent } from './components/expert-profile/expert-profile.component';
import { MesAnnoncesComponent } from './components/mes-annonces/mes-annonces.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
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
    PublicProfileComponent,
    ExpertsListComponent,
    ExpertProfileComponent,
    MesAnnoncesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}