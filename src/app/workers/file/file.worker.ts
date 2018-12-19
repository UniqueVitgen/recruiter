import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class FileWorker {
  downloadFile(data: Response) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
