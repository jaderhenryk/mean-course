import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillingSummary } from '../model/billingSummary.model';
import { MEAN_API } from '../app.api';

@Injectable()
export class DashboardService {

    constructor(private httpClient: HttpClient){}

    summary(): Observable<BillingSummary> {
        return this.httpClient.get<BillingSummary>(`${MEAN_API}/billingSummary`)
    }
}