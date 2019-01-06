import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {Candidate} from '../../../classes/candidate';
import {VacancyColorService} from '../../../services/vacancy/vacancy-color.service';
import {Vacancy} from '../../../classes/vacancy';

@Component({
  selector: 'app-vacancy-accordion',
  templateUrl: './vacancy-accordion.component.html',
  styleUrls: ['./vacancy-accordion.component.scss']
})
export class VacancyAccordionComponent implements OnInit {

  @Input() vacancy: Vacancy;
  @Input() vacancyID: number;
  @Output() onGoToJobDescriptionPage: EventEmitter<Vacancy> = new EventEmitter();
  @Output() onOpenDeleteVacancyDialog: EventEmitter<number> = new EventEmitter();
  showInfoAndDeleteIcons: boolean = false;

  @HostListener('mouseleave') onMouseLeave(): void {
    this.showInfoAndDeleteIcons = false;
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.showInfoAndDeleteIcons = true;
  }

  constructor(private vacancyColorService: VacancyColorService) {
  }

  goToJobDescriptionPage(vacancy: Vacancy): void {
    this.onGoToJobDescriptionPage.emit(vacancy);
  }

  openDeleteVacancyDialog(vacancyID: number): void {
    this.onOpenDeleteVacancyDialog.emit(vacancyID);
  }

  ngOnInit() {
  }

}
