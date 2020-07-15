import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, ControlContainer } from '@angular/forms';

@Component({
  selector: 'mean-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  types = ['text', 'number', 'checkbox', 'radio', 'email', 'password']

  @Input() label:string
  @Input() id:string
  @Input() placeholder:string
  @Input() type:string

  constructor(public controlContainer: ControlContainer) { }

  ngOnInit() {
    if(this.type) {
      if (this.types.indexOf(this.type) === -1) {
        this.type = 'text'
      }
    }
  }

}
