//essas constants que vou criar possibilitarão que eu as use no momento em que for necessário. No caso atual, será sobre as datas, onde eu posso usar o formato d data q eu preferir apenas chamando a constant dela
export class Constants {
  static readonly DATE_FMT = 'dd/MM/yyyy'; //apenas data
  static readonly DATE_TIME_FMT = `${Constants.DATE_FMT} hh:mm a`; //data e hora
}
