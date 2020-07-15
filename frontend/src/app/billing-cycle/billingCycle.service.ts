import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillingCycle } from '../model/billingCycle.model';
import { MEAN_API } from '../app.api';

import { map } from 'rxjs/operators';

@Injectable()
export class BillingCycleService {

    constructor(private httpClient: HttpClient) {}

    create(billingCycle: BillingCycle): Observable<string> {
        return this.httpClient.post<BillingCycle>(`${MEAN_API}/billingCycles`, billingCycle).pipe(map(b => b['_id']))
    }

    all(): Observable<BillingCycle[]> {
        return this.httpClient.get<BillingCycle[]>(`${MEAN_API}/billingCycles`)
    }
}