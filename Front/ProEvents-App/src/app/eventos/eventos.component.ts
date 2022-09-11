import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public events: any = [];
  //a variável abaixo é necessária para que, quando os eventos forem filtrados e eu apagar o filtro do input, ele não atribuir ao array events algo vazio, o q n retornaria nada. fazendo um outro array, eu posso atribuir a ele todos os eventos trazidos pelo event
  public eventsFiltered: any = [];
  marginImg: number = 2;
  viewImg: boolean = true;

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

  filterEvents(filterBy: string): any {
    filterBy = filterBy.toLocaleLowerCase(); //dxando td em letras minúsculas
    return this.events.filter(
      //a cada evento, dentro de eventos, to pegando o tema ou local, pondo tudo em letras minúsculas e filtrando pelo meu parâmetro de entrada
      (event: any) =>
        event.theme.toLocaleLowerCase().indexOf(filterBy) !== -1 ||
        event.local.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getEvents();
  }

  alterImgState() {
    this.viewImg = !this.viewImg;
  }

  public getEvents(): void {
    this.http.get('https://localhost:5001/api/event').subscribe(
      (response) => {
        this.events = response;
        this.eventsFiltered = response; //aqui é só pra eu popular essa variavel msm, pra aparecer tds os eventos quando eu carregar a pag d primeira
      },
      (error) => console.log(error)
    );
  }
}
