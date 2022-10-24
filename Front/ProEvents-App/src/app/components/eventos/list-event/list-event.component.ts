import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { EventService } from '../../../services/event.service';
import { Router } from '@angular/router';
import { Event } from '@app/models/Event';

@Component({
  selector: 'app-list-event',
  templateUrl: './list-event.component.html',
  styleUrls: ['./list-event.component.scss'],
  //providers: [EventService] outra oção d injeção
})
export class ListEventComponent implements OnInit {
  modalRef = {} as BsModalRef; //esse {} as instancia é a solução d um BO da versão do ts

  public events: Event[] = [];
  //a variável abaixo é necessária para que, quando os eventos forem filtrados e eu apagar o filtro do input, ele não atribuir ao array events algo vazio, o q n retornaria nada. fazendo um outro array, eu posso atribuir a ele todos os eventos trazidos pelo event
  public eventsFiltered: Event[] = [];
  public marginImg: number = 2;
  public viewImg: boolean = true;
  public eventId: number = 0;

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
    private spinner: NgxSpinnerService,
    private router: Router
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
  openModal(event: any, template: TemplateRef<any>, eventId: number): void {
    //esse evento n vai dx 2 eventos executarem d 1x caso um esteja dentro do outro, igual nesse caso onde o botão delete ta dentro da area onde eu clico pra ver detalhes do evento e n quero q as 2 coisas aconteção ao msm tempo quando eu clicar em delete
    event.stopPropagation();
    this.eventId = eventId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    //Quando eu clicar no confirm do modal de deletar, vai esconder o modal, iniciar o spinner, deletar com o id d parametro do modal

    this.modalRef.hide();
    this.spinner.show();

    //o resiçtado é any pq o observable do service tbm é, visto q a resposta da API é um objeto com a mensagem em string... daí a verificação abaixo
    this.eventService.delete(this.eventId).subscribe(
      (result: any) => {
        if(result.message === "Event deleted"){
          this.toastr.success('O Evento foi deletado com sucesso', 'Deletado!'); // a chamada do alerta toastr
          this.getEvents();
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventId}`, 'Erro!')
      },
    ).add(() => this.spinner.hide()); //com esse metodo, eu diminuo linhas pois n preciso mais do complete do meu observer, visto q ele só executava o spinner, e nem preciso executar o spinner no next e error mais

  }

  decline(): void {
    this.modalRef.hide();
  }

  detailEvent(id: number): void {
    this.router.navigate([`eventos/detalhes/${id}`]);
  }
}
