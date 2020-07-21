import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mean-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  @Input()
  url: string

  @Input()
  totalPages: number

  current = 1

  hasPrev = false

  hasNext = false

  pagesArray: any[]

  @Output()
  onPageChange = new EventEmitter<number>()

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const pages = this.totalPages || 1
    this.pagesArray = Array(pages).fill(0).map((el, idx) => idx + 1)
    this.hasPrev = this.current > 1
    this.hasNext = this.current < this.totalPages
  }

  isCurrent(i:number) {
    return this.current == i
  }

  next() {
    this.onPageChange.emit(this.current + 1)
    this.updatePagination(this.current + 1)
  }

  prev() {
    this.onPageChange.emit(this.current - 1)
    this.updatePagination(this.current - 1)
  }

  goToPage(page) {
    this.onPageChange.emit(page)
    this.updatePagination(page)
  }

  updatePagination(page) {
    this.current = page
    this.hasPrev = this.current > 1
    this.hasNext = this.current < this.totalPages
  }
}
