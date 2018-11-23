import { Injectable } from '@angular/core';
import {Candidate} from '../../classes/candidate';

@Injectable({
  providedIn: 'root'
})
export class UserWorker {
  formatFullName(candidate: Candidate) {
    return candidate.surname +  ' ' + candidate.name;
  }
}
