import {Component, OnInit, Inject, OnDestroy, OnChanges, SimpleChanges} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ModalWorker} from '../../../workers/modal/modal.worker';
@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent implements OnInit, OnChanges, OnDestroy {

  constructor(
    private modalWorker: ModalWorker,
    public dialogRef: MatDialogRef<ModalComponentComponent>) { }

  ngOnInit() {
    this.modalWorker.setActive(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.modalWorker.setActive(false);
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
