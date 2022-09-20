import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SpeakersComponent } from './components/speakers/speakers.component';

//adicionando rotas para a navegação entre os componentes pela navbar
const routes: Routes = [
  { path: 'eventos', component: EventosComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'palestrantes', component: SpeakersComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'contatos', component: ContactsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, //se eu por nd na url, ele me manda pro dashboard
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }, // se eu por na url qualquer coisa q n ta ali em cima, ele me leva tbm pro dashboard
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
