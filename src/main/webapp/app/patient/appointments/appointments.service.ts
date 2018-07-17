import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Appointment } from './appointments.model';
import { createRequestOption } from '../../shared/util/request-util';

@Injectable()
export class AppointmentsService {

    private resourceUrl = 'api/appointments';

    constructor(private http: HttpClient) { }

    create(appointment: Appointment): Observable<HttpResponse<Appointment>> {
        return this.http.post<Appointment>(this.resourceUrl, appointment, {observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<Appointment[]>> {
        const options = createRequestOption(req);
        return this.http.get<Appointment[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

}
