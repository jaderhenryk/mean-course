import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mean-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear()

  constructor() { }

  ngOnInit() {
  }

}
