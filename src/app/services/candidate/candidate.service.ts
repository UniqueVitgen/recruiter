import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';
import { Candidate } from 'src/app/classes/candidate';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private configService: ConfigService) { }

  get(id: number): Observable<Candidate> {
    return this.configService.get('candidate/' + id);
  }

  getAll(): Observable<Candidate[]> {
    return this.configService.get('candidates');
  }

  add(candidate: Candidate): Observable<Candidate> {
    return this.configService.post('candidates', candidate);
  }

  update(candidate: Candidate): Observable<Candidate> {
    return this.configService.put('candidate/' + candidate.id, candidate);
  }

  delete(candidate: Candidate): Observable<Candidate> {
    return this.configService.delete('candidate/' + candidate.id)
  }
}
