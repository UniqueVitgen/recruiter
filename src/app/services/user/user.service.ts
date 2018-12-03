import { Injectable } from '@angular/core';
import {ConfigService} from '../config/config.service';
import {Observable} from 'rxjs';
import {User} from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private configService: ConfigService) { }

  get(username: string): Observable<User> {
    return this.configService.get('user/' + username);
  }

  login(user: User): Observable<User> {
    return this.configService.get('user/login?username=' + user.email + '&password=' + user.password);
  }

  logout(): Observable<User> {
    return this.configService.get('user/logout');
  }

  add(user: User): Observable<User> {
    return this.configService.post('user', user);
  }

  update(user: User): Observable<User> {
    return this.configService.put('user/' + user.email, user);
  }

  delete(user: User): Observable<any> {
    return this.configService.delete('user/' + user.email);
  }
}
