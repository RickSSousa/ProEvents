import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Event } from '@app/models/Event';
import { EventService } from '@app/services/event.service';
import { LotService } from '@app/services/lot.service';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Lot } from './../../../models/Lot';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss'],
})
export class DetailEventComponent implements OnInit {
  modalRef = {} as BsModalRef
  eventId!: number;
  form!: FormGroup;
  //atribuindo um objeto vazio do tipo evento, pra n reclamar d var n inicializada
  _event = {} as Event;
  //esse state servirá pra sinalizar quando eu to querendo criar um evento ou atualizar um já existente. estou setando lá no loadEvent
  saveState = 'post';
  currentLot = {id: 0, name:'', index: 0}

  //vai me retornar verdade se o savestate for put (modo editar)
  get editMode():boolean{
    return this.saveState === 'put'
  }

  get lots(): FormArray{
    return this.form.get('lots') as FormArray
  }

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
              private activatedRouter: ActivatedRoute,
              private eventService: EventService,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              private router: Router,
              private lotService: LotService,
              private modalService: BsModalService) {
    this.localeService.use('pt-br')
  }

  public loadEvent(): void{
    //aqui to pegando o Id do meu evento clicado
    this.eventId = +this.activatedRouter.snapshot.paramMap.get('id')!;

    if (this.eventId !== null && this.eventId !== 0){
      //o state recebe 'put' se existir algo em eventIdParam, significando q eu abri um evento já existente
      this.saveState = 'put';

      this.spinner.show();
      //dps q verifiquei se n é nulo, chamo o service e converto pra inteiro o id pego ali em cima, fazendo um observer no subscribe
      this.eventService.getEventById(this.eventId).subscribe(
        (event: any) => {
          this._event = {...event};
          this.form.patchValue(this._event);
          this._event.lots.forEach(lot => this.lots.push(this.createLot(lot)))
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
      lots: this.formBuilder.array([]) //deve ser add um array d fb pois são vários obj lots
    });
  }

  //tenho um get q pega os lots, q é um item dentro do meu formulário, crio um agrupamento e adiciono no meu array d lots, isso permite a validação individualmente
  addLot():void{
    this.lots.push(
      this.createLot({id: 0} as Lot)
    )
  }

  createLot(lot: Lot): FormGroup{
    return this.formBuilder.group({
        id:[lot.id],
        name:[lot.name, Validators.required],
        price:[lot.price, Validators.required],
        amount:[lot.amount, Validators.required],
        initialDate:[lot.initialDate],
        finalDate:[lot.finalDate],
      })
  }

  public changeDate(value: Date, index: number, field: string): void{
    this.lots.value[index][field] = value
  }

  //método pra limpar o formulário (vou chamar ele no click do btn "cancelar alterações")
  public resetForm(): void {
    this.form.reset();
  }

  // jeito menos verboso de validar os campos no html desse componente
  public cssValidator(fieldForm: FormControl | AbstractControl | null) : any {
    return {'is-invalid': fieldForm?.errors && fieldForm?.touched}
  }

  public saveEvent(): void {
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
        (eventResponse: Event) => {
          this.toastr.success("Evento salvo com sucesso", "Salvo!")
          //isso é o reload da página quando cria um evento
          this.router.navigate([`eventos/detalhes/${eventResponse.id}`])
        },
        (error: any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error("Erro ao salvar evento", "Erro!");
        },
        () => {this.spinner.hide();}
      )
    }
  }

  public saveLots(): void {
    if(this.form.controls.lots.valid){
      this.spinner.show()
      this.lotService.saveLot(this.eventId, this.form.value.lots).subscribe(
        () => {
          this.toastr.success('Lotes salvos com Sucesso!', 'Sucesso!')
        },
        (error: any) => {
          this.toastr.error('Erro ao salvar lotes', 'Erro!')
          console.error(error)
        }
        ).add(() => this.spinner.hide())
    }
  }

  public removeLot(template: TemplateRef<any>, index: number): void{
    this.currentLot.id = this.lots.get(index + '.id')?.value
    this.currentLot.name = this.lots.get(index + '.name')?.value
    this.currentLot.index = index

    this.modalRef = this.modalService.show(template, {class:'modal-sm'})
  }

  confirmDeleteLot(): void{
    this.modalRef.hide()
    this.spinner.show()

    this.lotService.deleteLot(this.eventId, this.currentLot.id).subscribe(
      () => {
        this.toastr.success('Lot deletado com sucesso.', 'Sucesso!')
        this.lots.removeAt(this.currentLot.index)
      },
      (error) => {
        this.toastr.error(`Erro ao tentar deletar o lote ${this.currentLot.name}`)
        console.error(error)
      }
    ).add(() => this.spinner.hide())
  }
  declineDeleteLot(): void {
    this.modalRef.hide()
  }

  public returnLotTitle(name: string): string{
    return name === null || name === '' ? 'Nome do lote' : name
  }
}
