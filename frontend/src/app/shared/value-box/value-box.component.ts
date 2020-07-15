import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mean-value-box',
  templateUrl: './value-box.component.html'
})
export class ValueBoxComponent implements OnInit {

  @Input() value:string;
  @Input() text:string;
  @Input() background:string;
  @Input() icon:string;

  constructor() { }

  ngOnInit() {
  }

}
