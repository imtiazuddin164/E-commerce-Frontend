import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from 'src/app/model/invoice.model';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css'],
})
export class InvoiceComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  order!: Invoice;

  ngOnInit(): void {
    const latestOrder = localStorage.getItem('latestOrder');
    if (latestOrder) {
      this.order = JSON.parse(latestOrder);
    }
  }

  printInvoice() {
    window.print();
  }

  downloadPDF() {
    const data = document.getElementById('invoice');
    if (data) {
      html2canvas(data).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice-${this.order.orderCode}.pdf`);
      });
    }
  }
}
