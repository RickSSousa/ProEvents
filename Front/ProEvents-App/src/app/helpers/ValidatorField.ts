import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidatorField {
  //esse método vai verificar se a senha é igual ao confirmar senha (ele receberá os controlNames desses inputs como parametro)
  static MustMatch(controlName: string, matchingControlName: string): any {
    return (group: AbstractControl) => {
      //crio variáveis q terão controle dos inputs passados como param
      const formGroup = group as FormGroup;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      //valido se há erros do tipo mustMatch definidos abaixo
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return null;
      }

      //valido se os campos são iguais e, caso n, atribuo um erro específico
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }
}
