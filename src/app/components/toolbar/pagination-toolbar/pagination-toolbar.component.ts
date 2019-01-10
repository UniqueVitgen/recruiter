import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pagination-toolbar',
  templateUrl: './pagination-toolbar.component.html',
  styleUrls: ['./pagination-toolbar.component.scss']
})
export class PaginationToolbarComponent implements OnInit, OnChanges {
  @Input() itemsPerPageValues: number[];
  @Input() page: number;
  @Input() idPagination: number;
  @Input() placeholder: string;
  @Input() addButtonText: string;
  @Input() isButtonAdd: boolean;
  @Input() size: number;
  @Input()numberOfVacancies: number;
  @Input()numberOfVacanciesTitle: string;
  @Output() sizeChange: EventEmitter<number> = new EventEmitter();
  @Output('clickAddButton') outputClickAddButton: EventEmitter<any> = new EventEmitter();
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  changeSize(size: number) {
    if (size) {
      this.size = size;
    }
    this.sizeChange.emit(this.size);
  }
  changePage(event: number) {
    this.page = event;
    this.pageChange.emit(this.page);
  }
  clickAddButton() {
    this.outputClickAddButton.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.itemsPerPageValues) {
      if (this.size == null) {
        this.changeSize(this.itemsPerPageValues[0]);
      }
      if (this.page == null) {
        this.changePage(1);
      }
    }
  }

}
