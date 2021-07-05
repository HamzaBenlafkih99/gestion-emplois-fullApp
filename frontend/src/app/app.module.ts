import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FiliereService } from './services/filiere.service';
import { MatiereSalleService } from './services/matiere-salle.service';
import { EmploiService } from './services/emploi.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { ClassEmploiComponent } from './components/class-emploi/class-emploi.component';
import { ProfEmploiComponent } from './components/prof-emploi/prof-emploi.component';
import { AddEmploiComponent } from './components/add-emploi/add-emploi.component';
import { RapportComponent } from './components/rapport/rapport.component';
import { GestionEmploiComponent } from './components/gestion-emploi/gestion-emploi.component';
import { HomeRoutingModule } from './home-routing.module';
import { SalleListComponent } from './components/salle-list/salle-list.component';
import { ProfListComponent } from './components/prof-list/prof-list.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TestFormComponent } from './components/test-form/test-form.component';
import { ProfDashboardComponent } from './components/prof-dashboard/prof-dashboard.component';
import { ProfSidebarComponent } from './components/prof-sidebar/prof-sidebar.component';
import { ProfNavbarComponent } from './components/prof-navbar/prof-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    ClassEmploiComponent,
    ProfEmploiComponent,
    AddEmploiComponent,
    RapportComponent,
    GestionEmploiComponent,
    SalleListComponent,
    ProfListComponent,
    TestFormComponent,
    ProfDashboardComponent,
    ProfSidebarComponent,
    ProfNavbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [FiliereService, MatiereSalleService, EmploiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
