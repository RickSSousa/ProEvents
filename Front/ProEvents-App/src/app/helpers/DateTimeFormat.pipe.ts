import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from './../util/constants';

//essa vai ser nosso formatador de datas
@Pipe({
  name: 'DateFormatPipe',
})
//aqui vou extender o Date do próprio angular e transformar algo q já existe sobrescrevendo ele
export class DateTimeFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, Constants.DATE_TIME_FMT);
  }
}

//devemos ir em @Declarations no app.module e declarar nosso DateTimeFormatPipe
