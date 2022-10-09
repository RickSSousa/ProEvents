import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailEventComponent } from './components/eventos/detail-event/detail-event.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { ListEventComponent } from './components/eventos/list-event/list-event.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { UserComponent } from './components/user/user.component';

//adicionando rotas para a navegação entre os componentes pela navbar
const routes: Routes = [
  {
    path: "user", component: UserComponent,
    children:[
      { path: "login", component: LoginComponent},
      { path: "registration", component: RegistrationComponent}
    ]
  },
  { path: 'user/perfil', component: ProfileComponent },
  { path: 'eventos', redirectTo: 'eventos/lista' },
  {
    path: 'eventos',
    component: EventosComponent,
    //abaixo temos subrotas, ou seja, rotas que estão dentro da rota eventos (para o funcionamento dos botões q abrirão outros componentes)
    children: [
      { path: 'detalhes/:id', component: DetailEventComponent },
      { path: 'detalhes', component: DetailEventComponent },
      { path: 'lista', component: ListEventComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'palestrantes', component: SpeakersComponent },
  { path: 'contatos', component: ContactsComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, //se eu por nd na url, ele me manda pro dashboard
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }, // se eu por na url qualquer coisa q n ta ali em cima, ele me leva tbm pro dashboard
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
