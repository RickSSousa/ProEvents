import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss'],
})
export class DetailEventComponent implements OnInit {
  form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.validation();
  }

  //esse é o método q vai tornar os inputs controlados, pra eu capturas as reações do formulário. Vc pode notar que é usado um form group com um obj formGroup, esses obj são do evento em si q vou capturar nesse componente d criação d evento. (chamei esse método no onInit do componente, acima)
  public validation(): void {
    this.form = new FormGroup({
      //o primeiro parametro é o q quero q apareça no input logo de cara. O segundo eu to falando q ele é um campo obrigatório
      local: new FormControl('', Validators.required),
      eventDate: new FormControl('', Validators.required),
      //com esse array de validações, tbm to validando o comprimento da string inputada
      theme: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
      ]),
      amountPeople: new FormControl('', [
        Validators.required,
        Validators.max(120000),
      ]),
      imageUrl: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      //validator d email valido
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }
}
