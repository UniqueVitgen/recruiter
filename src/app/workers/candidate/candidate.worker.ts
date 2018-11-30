import {Injectable} from '@angular/core';
import {Candidate} from '../../classes/candidate';
import {ContactType} from '../../enums/contact-type.enum';
import {ContactDetails} from '../../classes/contact-details';

@Injectable({
  providedIn: 'root'
})
export class CandidateWorker {
  haveEmail(candidate: Candidate): boolean {
    const targetContact = candidate.contacts.find((value) => {
      return value.contactType === ContactType.EMAIL;
    });
    return targetContact != null;
    // return
  }
  havePhone(candidate: Candidate): boolean {
    const targetContact = candidate.contacts.find((value) => {
      return value.contactType === ContactType.PHONE;
    });
    return targetContact != null;
    // return
  }
  haveSkype(candidate: Candidate): boolean {
    const targetContact = candidate.contacts.find((value) => {
      return value.contactType === ContactType.SKYPE;
    });
    return targetContact != null;
    // return
  }
}
