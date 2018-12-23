import {Injectable} from '@angular/core';
import {Attachment} from '../../classes/attachment';


@Injectable({
  providedIn: 'root'
})
export class FileWorker {
  downloadFile(attachment: Attachment) {
    const data = new Blob([attachment.data]);
    const file = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = file;

    link.download = this.getFilename(attachment.filePath) ;
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  }
  getFilename(url: string) {
    let filename: string;
    filename = url.substring(url.lastIndexOf('/') + 1);
    filename = url.substring(filename.lastIndexOf('\\') + 1);
    return filename;
    // alert(filename);
  }
}
