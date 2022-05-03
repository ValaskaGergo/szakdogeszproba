import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  address = 'http://localhost:3000'
  defaultHeader = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private http: HttpClient) { }

  retrieveSlots():Observable<any> {
    return this.http.get( this.address + '/api/retrieveSlots', {headers: this.defaultHeader});
  }

  reserveSlot(reservation: any):Observable<any> {
    let params = new HttpParams({
      fromObject: reservation
    });
    let httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'})
    };
    return this.http.post(this.address + '/api/appointmentCreate', params.toString(), httpOptions);
  }
}
