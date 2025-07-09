import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private baseUrl = 'http://localhost:3000/invoices';

  constructor(private http: HttpClient) {}

  sendInvoice(invoice: Invoice) {
    return this.http.post(this.baseUrl, invoice);
  }
}
