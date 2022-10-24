import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Event } from '@app/models/Event';
import { EventService } from '@app/services/event.service';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss'],
})
export class DetailEventComponent implements OnInit {
  form!: FormGroup;
  //atribuindo um objeto vazio do tipo evento, pra n reclamar d var n inicializada
  _event = {} as Event;
  //esse state servirá pra sinalizar quando eu to querendo criar um evento ou atualizar um já existente. estou setando lá no loadEvent
  saveState = 'post';

  //esse método vai dar uma limpada no meu html, na hr d chamar os controls
  get f(): any {
    return this.form.controls;
  }

  //propriedade responsável por formatar meu datepicker
  get bsConfig(): any{
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    }
  }

  constructor(private formBuilder: FormBuilder,
              private localeService: BsLocaleService,
              private router: ActivatedRoute,
              private eventService: EventService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
    this.localeService.use('pt-br')
  }

  public loadEvent(): void{
    //aqui to pegando o Id do meu evento clicado
    const eventIdParam = this.router.snapshot.paramMap.get('id');

    if (eventIdParam !== null){
      //o state recebe 'put' se existir algo em eventIdParam, significando q eu abri um evento já existente
      this.saveState = 'put';

      this.spinner.show();
      //dps q verifiquei se n é nulo, chamo o service e converto pra inteiro o id pego ali em cima, fazendo um observer no subscribe
      this.eventService.getEventById(+eventIdParam).subscribe(
        (event: any) => {
          this._event = {...event};
          this.form.patchValue(this._event);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error("Erro ao tentar carregar o evento", "Erro!")
          console.error(error)
        },
        () => {this.spinner.hide();}
      )
    }
  }

  ngOnInit(): void {
    this.validation();
    this.loadEvent();
  }

  //esse é o método q vai tornar os inputs controlados, pra eu capturas as reações do formulário. Vc pode notar que é usado um formBuilder com um obj q são do evento em si q vou capturar nesse componente d criação d evento. (chamei esse método no onInit do componente, acima)
  public validation(): void {
    this.form = this.formBuilder.group({
      //o primeiro parametro é o q quero q apareça no input logo de cara. O segundo eu to falando q ele é um campo obrigatório
      local: ['', Validators.required],
      eventDate: ['', Validators.required],
      //com esse array de validações, tbm to validando o comprimento da string inputada
      theme: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
      amountPeople: ['', [Validators.required, Validators.max(120000)]],
      imageUrl: ['', Validators.required],
      phone: ['', Validators.required],
      //validator d email valido
      email: ['', [Validators.required, Validators.email]],
    });
  }

  //método pra limpar o formulário (vou chamar ele no click do btn "cancelar alterações")
  public resetForm(): void {
    this.form.reset();
  }

  // jeito menos verboso de validar os campos no html desse componente
  public cssValidator(fieldForm: FormControl) : any {
    return {'is-invalid': fieldForm.errors && fieldForm.touched}
  }

  public saveUpdate(): void {
    this.spinner.show();

    //essa refatoração deixa bem menos verboso, eu uso no msm método apenas os valores da variavel de estado podendo ser 2 tipos, podendo chamar 2 métodos do meu service na msm chamada aqui, pois são iguais

    //se meu formulário é valido, faço o post do evento
    if(this.form.valid){
      //aqui verifico o tipo do estado a ser executado
      this._event = (this.saveState === 'post') ?
        //é necessário eu atribuir isso pq o evento pode estar vazio
        {...this.form.value} :
        //aqui devo passar o id no me spread, pra atualizar
        {id: this._event.id, ...this.form.value}


      this.eventService[this.saveState](this._event).subscribe(
        () => {this.toastr.success("Evento salvo com sucesso", "Salvo!")},
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error("Erro ao salvar evento", "Erro!");
        },
        () => {this.spinner.hide();}
      )
    }
  }
}
