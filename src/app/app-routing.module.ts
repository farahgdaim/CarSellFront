import { NgModule } from '@angular/core';
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
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { ConversationListComponent } from './components/conversation-list/conversation-list.component';
import { ConversationDetailComponent } from './components/conversation-detail/conversation-detail.component';
import { ExpertsListComponent } from './components/experts-list/experts-list.component';
import { ExpertProfileComponent } from './components/expert-profile/expert-profile.component';
import { MesAnnoncesComponent } from './components/mes-annonces/mes-annonces.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { RepportedAnnoncesComponent } from './components/repported-annonces/repported-annonces.component';
import { RepportedAnnoncesDetailsComponent } from './components/repported-annonces-details/repported-annonces-details.component';
import { SelectionExpertComponent } from './components/selection-expert/selection-expert.component';
import { RapportComponent } from './components/rapport/rapport.component';

import { MesAnnoncesDetailsComponent } from './components/mes-annonces-details/mes-annonces-details.component';
import { UpdateAnnonceComponent } from './components/update-annonce/update-annonce.component';

import { RepportedRapportComponent } from './components/repported-rapport/repported-rapport.component';
import { RepportedRapportDetailsComponent } from './components/repported-rapport-details/repported-rapport-details.component';
import { MyRequestsComponent } from './components/my-requests/my-requests.component';
import { MyRequestDetailComponent } from './components/my-request-detail/my-request-detail.component';
import { AchatVehiculeComponent } from './components/achat-vehicule/achat-vehicule.component';
import { VideoconferenceComponent } from './components/videoconference/videoconference.component';
const routes: Routes = [
  { path: '', redirectTo: 'annonces', pathMatch: 'full' },
  { path: 'admin/login', component: AdminLoginComponent },
  { path: 'admin/register', component: AdminRegisterComponent },
  {
    path: 'admin/profile',
    component: AdminProfileComponent,
    canActivate: [AdminGuard],
  },
  { path: 'admin/expert-requests', component: AdminExpertRequestsComponent },
  {
    path: 'admin/expert-request/:id',
    component: AdminExpertRequestDetailComponent,
    canActivate: [AdminGuard],
  },
  { path: 'admin/dashboard', component: AdminDashboardComponent,canActivate: [AdminGuard], },
  {
    path: 'admin/repported-annonces',
    component: RepportedAnnoncesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/repported-annonces/:id',
    component: RepportedAnnoncesDetailsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/repported-rapport',
    component: RepportedRapportComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin/repported-rapport/:id',
    component: RepportedRapportDetailsComponent,
    canActivate: [AdminGuard],
  },
  
  { path: 'visioconference', component: VideoconferenceComponent ,canActivate: [AuthGuard] },

  { path: 'AchatVehicule/:id', component: AchatVehiculeComponent, canActivate: [AuthGuard]  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'mesAnnonces', component: MesAnnoncesComponent, canActivate: [AuthGuard] },
  { path: 'selection-expert/:id', component: SelectionExpertComponent, canActivate: [AuthGuard] },
  { path: 'rapport/:id', component: RapportComponent , canActivate: [AuthGuard]},
  { path: 'update-annonce/:id', component: UpdateAnnonceComponent, canActivate: [AuthGuard] },
  { path: 'annonces', component: AnnoncesComponent },
  { path: 'annonce/:id', component: AnnoncesDetailsComponent , canActivate: [AuthGuard]},
  { path: 'mon-annonce/:id', component: MesAnnoncesDetailsComponent , canActivate: [AuthGuard]},
  {
    path: 'devenir-expert',
    component: ExpertFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'update-profile',
    component: UpdateProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: 'mes-demandes', component: MyRequestsComponent, canActivate: [AuthGuard] },
  { path: 'mes-demandes/:id', component: MyRequestDetailComponent, canActivate: [AuthGuard] },
  {
    path: 'creerAnnonce',
    component: CreateAnnonceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'notifications',
    component: NotificationListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    component: PublicProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'conversations',
    component: ConversationListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'conversation/:userId1/:userId2',
    component: ConversationDetailComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'experts',
    component: ExpertsListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'expert-profile/:id',
    component: ExpertProfileComponent,
    canActivate: [AuthGuard],
  },
  {path: 'expert', loadChildren: () => import('./expert/expert.module').then(m => m.ExpertModule) },





 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {

      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64],
    }),
  ],

  exports: [RouterModule],
})
export class AppRoutingModule {}
