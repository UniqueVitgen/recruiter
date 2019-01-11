import { ContactType } from '../enums/contact-type.enum';

export class ContactDetails {
  contactType: ContactType;
  contactDetails: string;
  preferred?: boolean;
}
