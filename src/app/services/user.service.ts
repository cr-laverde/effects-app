import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL = 'https://reqres.in/api';

  constructor( private http: HttpClient ) { }

  getUsers() {
    return this.http.get(`${this.URL}/users?per_page=6&&delay=3`)
      .pipe(
        map( (response: any) => response.data )
      );
  }

  getUserById(id: string) {
    return this.http.get(`${this.URL}/users/${ id }`)
      .pipe(
        map( (response: any) => response.data )
      );
  }
}
