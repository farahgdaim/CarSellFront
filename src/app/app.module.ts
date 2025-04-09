import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AnnoncesDetailsComponent } from './components/annonces-details/annonces-details.component';
import { CarCarouselComponent } from './components/car-carousel/car-carousel.component';
import { FooterComponent } from './components/footer/footer.component';
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

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ExpertsListComponent } from './components/experts-list/experts-list.component';
import { ExpertProfileComponent } from './components/expert-profile/expert-profile.component';
import { NgxSpinnerModule } from "ngx-spinner";
/* Example routes if needed in the future
const appRoutes: Routes = [
  { path: '', component: AnnoncesComponent },
  { path: 'annonce/:id', component: AnnoncesDetailsComponent }
];
*/

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
    ExpertProfileComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }