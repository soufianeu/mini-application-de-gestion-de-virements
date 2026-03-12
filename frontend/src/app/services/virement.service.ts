import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateVirementRequest, TransferStatus, Virement } from '../models/virement.model';

@Injectable({
  providedIn: 'root'
})
export class VirementService {
  private readonly apiUrl = 'http://localhost:8080/api/virements';

  constructor(private readonly http: HttpClient) {}

  createVirement(payload: CreateVirementRequest): Observable<Virement> {
    return this.http.post<Virement>(this.apiUrl, payload);
  }

  getVirements(): Observable<Virement[]> {
    return this.http.get<Virement[]>(this.apiUrl);
  }

  updateStatus(id: number, status: TransferStatus): Observable<Virement> {
    return this.http.patch<Virement>(`${this.apiUrl}/${id}/status`, { status });
  }
}
