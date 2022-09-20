import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Event } from '../../models/Event';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
  //providers: [EventService] outra oção d injeção
})
export class EventosComponent implements OnInit {
  modalRef = {} as BsModalRef; //esse {} as instancia é a solução d um BO da versão do ts

  public events: Event[] = [];
  //a variável abaixo é necessária para que, quando os eventos forem filtrados e eu apagar o filtro do input, ele não atribuir ao array events algo vazio, o q n retornaria nada. fazendo um outro array, eu posso atribuir a ele todos os eventos trazidos pelo event
  public eventsFiltered: Event[] = [];
  public marginImg: number = 2;
  public viewImg: boolean = true;

  private _listFilter: string = '';

  public get listFilter(): string {
    return this._listFilter;
  }

  public set listFilter(value: string) {
    this._listFilter = value;
    //para filtrar, se houver algo na variável filtro de eventos, vou chamar a função filtrar eventos passando como parâmetro o evento que quero filtrar, se não retorna tds os eventos
    this.eventsFiltered = this.listFilter
      ? this.filterEvents(this.listFilter)
      : this.events;
  }

  public filterEvents(filterBy: string): Event[] {
    filterBy = filterBy.toLocaleLowerCase(); //dxando td em letras minúsculas
    return this.events.filter(
      //a cada evento, dentro de eventos, to pegando o tema ou local, pondo tudo em letras minúsculas e filtrando pelo meu parâmetro de entrada
      (event: any) =>
        event.theme.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        event.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  //estou injetando meu service aqui para eu usar quando eu precisar, nesse componente
  constructor(
    private eventService: EventService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  public ngOnInit(): void {
    //inicia a roda de carregamento
    this.spinner.show();
    this.getEvents();
  }

  public alterImgState(): void {
    this.viewImg = !this.viewImg;
  }

  public getEvents(): void {
    //uso do observable para uma inscrição
    const observer = {
      next: (response: any) => {
        this.events = response;
        this.eventsFiltered = response;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Eventos', 'Erro!');
      },
      complete: () => this.spinner.hide(), //finaliza a roda d carregamento quando isso for completado com sucesso
    };
    this.eventService.getEvents().subscribe(
      observer
      // //abaixo estou tipando a resposta pq realmente é isso q ela recebe da chamada desse métoodo getEvents
      // (response: any) => {
      //   this.events = response;
      //   this.eventsFiltered = response; //aqui é só pra eu popular essa variavel msm, pra aparecer tds os eventos quando eu carregar a pag d primeira
      // },
      // (error) => console.log(error)
    );
  }

  //MODAL
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O Evento foi deletado com sucesso', 'Deletado!'); // a chamada do alerta toastr
  }

  decline(): void {
    this.modalRef.hide();
  }
}
