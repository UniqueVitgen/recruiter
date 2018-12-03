import {Injectable} from '@angular/core';
import {Candidate} from '../../classes/candidate';
import {ContactType} from '../../enums/contact-type.enum';
import {ContactDetails} from '../../classes/contact-details';

@Injectable({
  providedIn: 'root'
})
export class CandidateWorker {
  haveEmail(candidate: Candidate): boolean {
    if (candidate.contacts) {
      const targetContact = candidate.contacts.find((value) => {
        return value.contactType === ContactType.EMAIL;
      });
      return targetContact != null;
    }
    // return
  }
  getEmailValue(candidate: Candidate): string {
    if (candidate.contacts) {
      const targetContact = candidate.contacts.find((value) => {
        return value.contactType === ContactType.EMAIL;
      });
      return targetContact.contactDetails;
    }
  }
  getEmailObject(candidate: Candidate): ContactDetails {
    if (candidate.contacts) {
      const targetContact = candidate.contacts.find((value) => {
        return value.contactType === ContactType.EMAIL;
      });
      return targetContact;
    }
  }
  havePhone(candidate: Candidate): boolean {
    if (candidate.contacts) {
      const targetContact = candidate.contacts.find((value) => {
        return value.contactType === ContactType.PHONE;
      });
      return targetContact != null;
    }
    // return
  }
  getPhoneValue(candidate: Candidate): string {
    if (candidate.contacts) {
      const targetContact = candidate.contacts.find((value) => {
        return value.contactType === ContactType.PHONE;
      });
      return targetContact.contactDetails;
    }
  }
  getPhoneObject(candidate: Candidate): ContactDetails {
    if (candidate.contacts) {
      const targetContact = candidate.contacts.find((value) => {
        return value.contactType === ContactType.PHONE;
      });
      return targetContact;
    }
  }
  haveSkype(candidate: Candidate): boolean {
    if (candidate.contacts) {
      const targetContact = candidate.contacts.find((value) => {
        return value.contactType === ContactType.SKYPE;
      });
      return targetContact != null;
      // return
    }
  }
  getSkypeValue(candidate: Candidate): string {
    if (candidate.contacts) {
      const targetContact = candidate.contacts.find((value) => {
        return value.contactType === ContactType.SKYPE;
      });
      return targetContact.contactDetails;
    }
  }
  getSkypeObject(candidate: Candidate): ContactDetails {
    if (candidate.contacts) {
      const targetContact = candidate.contacts.find((value) => {
        return value.contactType === ContactType.SKYPE;
      });
      return targetContact;
    }
  }
}
