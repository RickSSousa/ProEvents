import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.scss'],
})
export class DetailEventComponent implements OnInit {
  form!: FormGroup;

  //esse método vai dar uma limpada no meu html, na hr d chamar os controls
  get f(): any {
    return this.form.controls;
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.validation();
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
}
