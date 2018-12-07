import {ContactDetails} from '../contact-details';
import {ContactType} from '../../enums/contact-type.enum';
import {FormControl} from '@angular/forms';

export class CandidateContactInput {
  have: boolean;
  value: ContactType;
  methodName: string;
  object?: ContactDetails;
  control: FormControl;
}
