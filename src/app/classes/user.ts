import {UserStatus} from '../enums/user-status.enum';
import {Role} from './role';

export class User {
  id?: number;
  surname?: string;
  name: string;
  email: string;
  password: string;
  userStatus?: UserStatus;
  roles?: Role[];
}
