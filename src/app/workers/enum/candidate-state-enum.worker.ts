import {CandidateState} from '../../enums/candidate-state.enum';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateStateEnumWorker {
  getValue(candidateState: CandidateState) {
    if (candidateState === CandidateState.New) {
      return 1;
    } else if (candidateState === CandidateState.AcceptedForInterview) {
      return 2;
    } else if (candidateState === CandidateState.CvRejected) {
      return 3;
    } else if (candidateState === CandidateState.CvAccepted) {
      return 4;
    }
  }
}
