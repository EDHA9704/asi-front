import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-titulo-page',
  templateUrl: './titulo-page.component.html',
  styleUrls: ['./titulo-page.component.scss']
})
export class TituloPageComponent implements OnInit {
  @Input() titulo: string;
  @Input() descripcion: string;
  @Input() img: string;
  constructor() { }

  ngOnInit() {
  }

}
