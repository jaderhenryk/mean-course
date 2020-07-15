import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mean-content-header',
  templateUrl: './content-header.component.html'
})
export class ContentHeaderComponent implements OnInit {

  @Input() title:string
  @Input() info:string

  constructor() { }

  ngOnInit() {
  }

}
