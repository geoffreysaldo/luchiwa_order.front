import { Injectable } from '@angular/core';
import { jsPDF } from "jspdf";
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrderPrintService {
  public order;
  public y: number = 10;
  public doc;
  constructor(private datepipe: DatePipe) { }

  buildTicket(order) {
    this.order = order;
    this.doc = new jsPDF('p', 'mm', [72, 210]);
    this.setPdfConfig();
    this.setHeader();
    this.setOrderDetails();
    this.setProductsLines();
    this.setTotals();
    this.setTaxes();
    this.save();
  }

  public reducer = (accumulator, currentValue) => accumulator + currentValue;

  setPdfConfig() {
    this.doc.setFontSize(6);
    this.doc.setFont('Calibri');
  }

  setHeader() {
    this.doc.text("L'UCHIWA",32,this.y);
    this.doc.setFontSize(5);
    this.y = this.y + 2;
    this.doc.text("14 RUE GAMBETTA", 28,this.y);
    this.y = this.y + 2;
    this.doc.text("83500 La Seyne Sur Mer", 27, this.y);
    this.y = this.y + 4;
    this.doc.text("===============================================================", 5, this.y);
  }

  setOrderDetails() {
    const now = new Date();
    this.y = this.y + 4;
    this.doc.text(this.order.mode,5,this.y);
    this.y = this.y + 2;
    this.doc.text("Date reçue: "+ this.datepipe.transform(now, 'dd/MM/yyyy').toString() + " heure: " + now.getHours().toString() + ':' + now.getMinutes().toString() + ':'+  now.getSeconds().toString(),5,this.y);
    this.y = this.y + 2;
    this.order.mode === 'LIVRAISON' ? this.doc.text('Horaire livraison: '+ this.order.hour, 5, this.y) : this.doc.text('Horaire livraison: '+ this.order.hour, 5, this.y)
    this.y = this.y + 4;
    this.doc.text("===================================================== Devise EUR", 5, this.y);
  }

  setProductsLines() {
    this.y = this.y + 2;
    this.order.products.map((item,index) => {
      this.doc.text(item.quantity+" x "+item.product.name,5,this.y);
      this.doc.text((item.product.price*item.quantity).toFixed(2),60,this.y);
      this.y = this.y + 2;
    })
    this.doc.text("----------------------------------------------- "+this.order.products.length+" article(s) ----------------------------------------------", 5, this.y);
  }

  setTotals() {
    this.y = this.y + 2;
    this.doc.text("Total HT",5,this.y);
    this.doc.text(this.order.totalHT.toString(), 60, this.y);
    this.y = this.y + 2;
    this.doc.text("Total TVA",5,this.y);
    this.doc.text((this.order.total - this.order.totalHT).toFixed(2), 60, this.y);
    this.y = this.y + 2;
    this.doc.setFontSize(6);
    this.doc.text("Total TTC (Eur)",5,this.y);
    this.doc.text(this.order.total.toFixed(2), 60, this.y);
    this.doc.setFontSize(5);
    this.y = this.y + 2;
    this.doc.text("-----------------------------------------------------------------------------------------------------------", 5, this.y);
  }

  setTaxes() {
    this.y = this.y + 2;
    this.doc.text("TVA %",5,this.y);
    this.doc.text("CA HT Eur",30,this.y);
    this.doc.text("Mnt TVA Eur",57,this.y);
    this.y = this.y + 2
    let taxRateArray: number[] = [];
    let totalHT: number[] = [];
    let totalTax: number[] = [];
    this.order.products.map(item => {
      !taxRateArray.find(tva => item.product.tva === tva) ? taxRateArray.push(item.product.tva) : null;
    })
    taxRateArray.map(tax => {
      let totalByTax = this.order.products.filter(item => tax === item.product.tva).map(item => item.product.price*item.quantity / (1+(tax/100))).reduce(this.reducer, 0)
      totalHT.push(totalByTax)
    })
    taxRateArray.map(tax => {
      let totalByTax = this.order.products.filter(item => tax === item.product.tva).map(item => (item.product.price*item.quantity / (1+(tax/100)))*(tax/100)).reduce(this.reducer, 0)
      totalTax.push(totalByTax)
    })
    taxRateArray.map((item,index) => {
      this.doc.text(item.toFixed(2),5,this.y+(index)*2);
      this.doc.text(totalHT[index].toFixed(2),32,this.y+(index)*2);
      this.doc.text(totalTax[index].toFixed(2),60,this.y+(index)*2);
    })
  }

  save() {
    this.doc.save("hello.pdf");
  }


}
