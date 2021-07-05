import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestFormComponent } from './components/test-form/test-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassEmploiComponent } from './components/class-emploi/class-emploi.component';
import { ProfEmploiComponent } from './components/prof-emploi/prof-emploi.component';
import { AddEmploiComponent } from './components/add-emploi/add-emploi.component';
import { RapportComponent } from './components/rapport/rapport.component';
import { GestionEmploiComponent } from './components/gestion-emploi/gestion-emploi.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'test', component: TestFormComponent },
  { path: 'emploi-par-classe', component: ClassEmploiComponent },
  { path: 'emploi-par-prof', component: ProfEmploiComponent },
  { path: 'ajouter-emploi', component: AddEmploiComponent },
  { path: 'rapport', component: RapportComponent },
  { path: 'gestion', component: GestionEmploiComponent },
];

@NgModule({
  exports: [RouterModule],
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class HomeRoutingModule {}
