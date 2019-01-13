import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import {Candidate} from '../../../classes/candidate';
import {VacancyColorService} from '../../../services/vacancy/vacancy-color.service';
import {Vacancy} from '../../../classes/vacancy';
import {NumberWorker} from '../../../workers/number/number.worker';
import {TranslateWorker} from '../../../workers/translate/translate.worker';

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
  language: string;

  constructor(private vacancyColorService: VacancyColorService, private translateWorker: TranslateWorker, public numberWorker: NumberWorker) {

  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.showInfoAndDeleteIcons = false;
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.showInfoAndDeleteIcons = true;
  }

  goToJobDescriptionPage(vacancy: Vacancy): void {
    this.onGoToJobDescriptionPage.emit(vacancy);
  }

  openDeleteVacancyDialog(vacancyID: number): void {
    this.onOpenDeleteVacancyDialog.emit(vacancyID);
  }

  ngOnInit() {
    this.language = this.translateWorker.getLanguage();
    console.log(this.language);
  }

}
