import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent implements OnChanges {

  @Input() richiesteTotali: number = 0;
  @Output() elementsPerPageChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() nextPageEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() previousPageEvent: EventEmitter<void> = new EventEmitter<void>();

  elementsPerPage: number[] = [1, 5, 10];
  selElementsPerPage: number = 5;
  pageNumber: number = 0;
  totalPages: number = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    if ('richiesteTotali' in changes || 'selElementsPerPage' in changes) {
      this.calculatePageNumber();
    }
  }

  calculatePageNumber(): void {
    this.totalPages = Math.ceil(this.richiesteTotali / this.selElementsPerPage);
  }

  onElementsPerPageChange(event: any): void {
    const selectedValue = event.target.value;
    this.selElementsPerPage = parseInt(selectedValue, 10);
    this.elementsPerPageChange.emit(this.selElementsPerPage);
  }

  nextPage(event: MouseEvent): void {
    event.preventDefault();
    if (this.pageNumber < this.totalPages) {
      this.nextPageEvent.emit();
    }
  }

  previousPage(event: MouseEvent): void {
    event.preventDefault();
      this.previousPageEvent.emit();
    
  }
}
