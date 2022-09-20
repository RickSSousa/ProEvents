import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  //o Input permite que eu chame ele como uma propriedade na tag do componente
  @Input() title: string = '';

  constructor() {}

  ngOnInit(): void {}
}
