import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BillingCycle } from '../model/billingCycle.model';
import { MEAN_API } from '../app.api';

import { map } from 'rxjs/operators';

@Injectable()
export class BillingCycleService {

    ROOT_URL = 'billingCycles'

    constructor(private httpClient: HttpClient) {}

    create(billingCycle: BillingCycle): Observable<string> {
        return this.httpClient.post<BillingCycle>(`${MEAN_API}/${this.ROOT_URL}`, billingCycle).pipe(map(b => b['_id']))
    }

    all(page?: number): Observable<BillingCycle[]> {
        let params: HttpParams
        if (page !== undefined) {
            params = new HttpParams().set('skip', page.toString()).set('limit', '10')
        }
        return this.httpClient.get<BillingCycle[]>(`${MEAN_API}/${this.ROOT_URL}`, {params})
    }

    count():Observable<number> {
        return this.httpClient.get<number>(`${MEAN_API}/${this.ROOT_URL}/count`)
    }

    one(id: string): Observable<BillingCycle> {
        return this.httpClient.get<BillingCycle>(`${MEAN_API}/${this.ROOT_URL}/${id}`)
    }
    
    delete(id: string) {
        return this.httpClient.delete(`${MEAN_API}/${this.ROOT_URL}/${id}`)
    }

    update(billingCycle: BillingCycle) {
        const id = billingCycle['_id']
        return this.httpClient.put(`${MEAN_API}/${this.ROOT_URL}/${id}`, billingCycle)
    }
}