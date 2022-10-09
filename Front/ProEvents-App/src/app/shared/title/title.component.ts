import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent implements OnInit {
  //o Input permite que eu chame ele como uma propriedade na tag do componente
  @Input() title: string = '';
  @Input() iconClass = 'fa fa-user';
  @Input() subtitle = 'Desde 2022';
  @Input() listButton = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  list(): void {
    this.router.navigate([`/${this.title.toLocaleLowerCase()}/lista`]);
  }
}
