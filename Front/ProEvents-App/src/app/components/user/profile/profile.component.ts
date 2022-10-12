import { Component, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.validation();
  }

  private validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword'),
    };

    this.form = this.fb.group(
      {
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', Validators.required],
        function: ['', Validators.required],
        description: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      formOptions
    );
  }

  public resetForm(event: any): void {
    //evita q a tela de reload quando eu clicar em "cancelar alterações"
    event.preventDefault();
    this.form.reset();
  }
}
