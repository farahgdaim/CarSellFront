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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AnnoncesListComponent } from './components/annonces-list/annonces-list.component';
import { AnnonceDetailComponent } from './components/annonce-detail/annonce-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
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


const routes: Routes = [
  { path: '', component: AnnoncesComponent },
  { path: 'annonce/:id', component: AnnoncesDetailsComponent },
  { path: '**', redirectTo: '' } ,
  { path: '', redirectTo: 'annonces', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'devenir-expert', component: ExpertFormComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'update-profile', component: UpdateProfileComponent, canActivate: [AuthGuard] },
  { path: 'creerAnnonce', component: CreateAnnonceComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationListComponent, canActivate: [AuthGuard] },


  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/register', component: AdminRegisterComponent },
  { path: 'admin/profile', component: AdminProfileComponent, canActivate: [AdminGuard] },
  { path: 'admin/expert-requests', component: AdminExpertRequestsComponent, canActivate: [AdminGuard] },
  { path: 'admin/expert-request/:id', component: AdminExpertRequestDetailComponent, canActivate: [AdminGuard] },
  
  { path: 'annonces', component: AnnoncesListComponent },
  { path: 'annonce/:id', component: AnnonceDetailComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'annonces' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top' // Force le scroll vers le haut
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
