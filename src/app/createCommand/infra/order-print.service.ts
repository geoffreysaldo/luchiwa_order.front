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
    console.log(order)
    this.order = order;
    this.doc = new jsPDF('p', 'mm', [170, 280]);
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
    this.doc.setFontSize(16);
    this.doc.setFont('Arial');

  }

  setHeader() {
    this.doc.text("L'UZUMAKI",50,this.y);
    this.doc.setFontSize(17);
    this.y = this.y + 8;
    this.doc.text("ZAC LES BARLES", 40,this.y);
    this.y = this.y + 8;
    this.doc.text("13470 CARNOUX EN PROVENCE", 20, this.y);
    this.y = this.y + 8;
    this.doc.text("===============================", 10, this.y);
  }

  setOrderDetails() {
    this.doc.setFontSize(15);
    const now = new Date();
    this.y = this.y + 10;
    this.doc.text("Date: "+ this.datepipe.transform(now, 'dd/MM/yyyy').toString() + " heure: " + now.getHours().toString() + ':' + this.addZero(now.getMinutes().toString()) + ':'+  this.addZero(now.getSeconds().toString()),10,this.y);
    this.y = this.y + 8;
    this.doc.text(this.order.mode + " " +  this.order.hour,10,this.y);
    this.y = this.y + 8;
    this.order.payment ? this.doc.text("Paiement: " + this.order.payment,10,this.y) : null;
    this.y = this.y + 8;
    this.order.payment ? this.doc.text("Couverts: " + this.order.cutlery,10,this.y) : null;
    this.y = this.y + 8;
    this.doc.text(this.order.client.firstName + " " + this.order.client.lastName, 10, this.y)
    this.y = this.y + 8;
    this.doc.text(this.order.client.phoneNumber, 10, this.y)
    //this.order.mode === 'LIVRAISON' ? this.doc.text('Livraison: '+, 5, this.y) : this.doc.text('À EMPORTER : '+ this.order.hour, 5, this.y)
    if(this.order.mode === 'LIVRAISON'){
      this.y = this.y + 8;
      this.doc.text(this.order.client.address + ", " + this.order.client.zipCode, 10, this.y);
      this.y = this.y + 8;
      this.doc.text(this.order.client.city, 10, this.y);
    }
    this.y = this.y + 6;
    this.doc.text("=============================== EUR", 10, this.y);
  }

  setProductsLines() {
    this.doc.setFontSize(14);
    this.y = this.y + 7;
    this.order.products.map((item,index) => {
      this.doc.text(item.quantity+" x "+item.product.name,10,this.y);
      this.doc.text((item.product.price*item.quantity).toFixed(2),105,this.y);
      this.y = this.y + 8;
    })
    this.y = this.y - 1
    this.doc.text("============== "+this.order.products.length+" article(s) ===============", 10, this.y);
  }

  setTotals() {
    this.y = this.y + 8;
    if(this.order.discount){
      this.doc.text("Remise",10,this.y);
      this.doc.text(this.order.discount.toString() + "%", 90, this.y);
    }
    this.y = this.y + 9;
    this.doc.text("Total HT",10,this.y);
    this.doc.text(this.order.totalHT.toString(), 90, this.y);
    this.y = this.y + 9;
    this.doc.text("Total TVA",10,this.y);
    this.doc.text((this.order.total - this.order.totalHT).toFixed(2), 90, this.y);
    this.y = this.y + 9;
    this.doc.setFontSize(17);
    this.doc.text("Total TTC (Eur)",10,this.y);
    this.doc.text(this.order.total.toFixed(2), 90, this.y);
    this.doc.setFontSize(18);
    this.y = this.y + 6;
    this.doc.text("=============================", 10, this.y);
  }

  setTaxes() {
    this.doc.setFontSize(14);
    this.y = this.y + 8;
    this.doc.text("TVA %",10,this.y);
    this.doc.text("CA HT Eur",45,this.y);
    this.doc.text("Mnt TVA Eur",80,this.y);
    this.y = this.y + 8
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
      this.doc.text(item.toFixed(2),10,this.y);
      this.doc.text((totalHT[index] - (totalHT[index] * this.order.discount)/100).toFixed(2),50,this.y);
      this.doc.text((totalTax[index] - (totalTax[index] * this.order.discount)/100).toFixed(2),88,this.y);
      this.y = this.y + 8;
    })
  }

  save() {
    const now = new Date()
    this.doc.text("---------------------------------------------------------------", 10, this.y);
    this.y = this.y + 8

    this.doc.setFontSize(14);
    this.doc.text("Siret: 8244848855", 47, this.y);
    this.y = this.y + 9
    this.doc.setFontSize(15);

    this.doc.text("Merci, à bientôt", 47, this.y);

    this.doc.save(this.datepipe.transform(now, 'dd/MM/yyyy').toString()+"_"+now.getHours().toString()+"_"+now.getMinutes().toString()+".pdf");
    this.y = 10;
  }


  addZero(time: string) {
    if(time.length === 2) {
      return time;
    }
    if(time.length === 0) {
      return '00';
    }
    return '0'+time;
  }

}
