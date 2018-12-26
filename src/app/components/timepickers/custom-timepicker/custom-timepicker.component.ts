import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NgxMaterialTimepickerTheme} from 'ngx-material-timepicker/src/app/material-timepicker/models/ngx-material-timepicker-theme.interface';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {TimeInput} from '../../../classes/html/dateTime/time-input';
import {DateTimeWorker} from '../../../workers/date-time/date-time.worker';
import {TranslateWorker} from '../../../workers/translate/translate.worker';

const customValueProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomTimepickerComponent),
  multi: true
};

@Component({
  selector: 'app-custom-timepicker',
  templateUrl: './custom-timepicker.component.html',
  styleUrls: ['./custom-timepicker.component.scss'],
  providers: [customValueProvider]
})
export class CustomTimepickerComponent implements OnInit, ControlValueAccessor {
  @Input() hideUnderline: boolean;
  @Input() fullWidth: boolean;
  timeString: string;
  darkTheme: NgxMaterialTimepickerTheme = {
    container: {
      // bodyBackgroundColor: '#424242',
      buttonColor: '#4285f4'
    },
    dial: {
      dialBackgroundColor: '#4285f4',
    },
    clockFace: {
      // clockFaceBackgroundColor: '#555',
      clockHandColor: '#4285f4',
      // clockFaceTimeInactiveColor: '#fff'
    }
  };
  private time: TimeInput;
  public format: number;
  propagateChange: any = () => {};

  constructor(private dateTimeWorker: DateTimeWorker, private translateWorker: TranslateWorker) { }

  ngOnInit() {
    this.format = this.determineFormat();
    this.changeFormat(this.format);
    this.translateWorker.changeValue.subscribe(res => {
      this.format = this.determineFormat();
      this.changeFormat(this.format);
      console.log('format', this.format);
    });
  }
  determineFormat() {
    let format;
    const language = this.translateWorker.getLanguage();
    if (language === 'en') {
      format = 12;
    } else {
      format = 24;
    }
    return format;
  }
  changeFormat(format) {
    if (this.timeString) {
      if (format === 12) {
        this.timeString = this.dateTimeWorker.parse24FormatToAmPmFormat(this.timeString);
      } else {
        this.timeString = this.dateTimeWorker.parse12FormatTo24Format(this.timeString);
      }
    }
  }
  updateTime() {
    this.time = <TimeInput> this.dateTimeWorker.parseTimeString(this.timeString);
    this.propagateChange(this.time);
  }
  changeTime() {
    this.updateTime();
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: TimeInput): void {
    if (obj) {
      this.time = obj;
      this.timeString = this.dateTimeWorker.convertTimeInputToTimeString(this.time, this.format);
    }
  }

}
