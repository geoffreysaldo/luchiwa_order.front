import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { jsPDF } from "jspdf";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order;
  @Input() mode;
  @Output() deleteEmitter = new EventEmitter();
  expanded = false
  constructor(private datepipe: DatePipe) { }

  ngOnInit(): void {
    console.log(this.order)
  }

  expandProduct(){
    this.expanded = !this.expanded
  }

  deleteOrder(){
    this.deleteEmitter.emit(this.order._id)
  }

  printOrder() {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const now = new Date();
    const doc = new jsPDF('p', 'mm', [72, 210]);
    doc.setFontSize(6);
    doc.setFont('Calibri');
    let y = 10;
    doc.text("L'UCHIWA",32,y);
    doc.setFontSize(5);
    y = y + 2;
    doc.text("14 RUE GAMBETTA", 28, y);
    y = y + 2;
    doc.text("83500 La Seyne Sur Mer", 27, y);
    y = y + 4;
    doc.text("===============================================================", 5, y);
    y = y + 4;
    doc.text(this.order.mode,5,y);
    y = y + 2;
    doc.text("Date reçue: "+ this.datepipe.transform(now, 'dd/MM/yyyy').toString() + " heure: " + now.getHours().toString() + ':' + now.getMinutes().toString() + ':'+  now.getSeconds().toString(),5,y);
    y = y + 2;
    this.order.mode === 'LIVRAISON' ? doc.text('Horaire livraison: '+ this.order.hour, 5, y) : doc.text('Horaire livraison: '+ this.order.hour, 5, y)
    y = y + 4;
    doc.text("===================================================== Devise EUR", 5, y);
    y = y + 2;
    this.order.products.map((item,index) => {
      doc.text(item.quantity+" x "+item.product.name,5,y);
      doc.text((item.product.price*item.quantity).toFixed(2),60,y);
      y = y + 2;
      console.log(y)
    })
    doc.text("----------------------------------------------- "+this.order.products.length+" article(s) ----------------------------------------------", 5, y);
    y= y + 2;
    doc.text("Total HT",5,y);
    doc.text(this.order.totalHT.toString(), 60, y);
    console.log(y)
    y = y + 2;
    doc.text("Total TVA",5,y);
    doc.text((this.order.total - this.order.totalHT).toFixed(2), 60, y);
    y = y + 2;
    doc.setFontSize(6);
    doc.text("Total TTC (Eur)",5,y);
    doc.text(this.order.total.toFixed(2), 60, y);
    doc.setFontSize(5);
    y = y + 2;
    doc.text("-----------------------------------------------------------------------------------------------------------", 5, y);
    y = y + 2;
    doc.text("TVA %",5,y);
    doc.text("CA HT Eur",30,y);
    doc.text("Mnt TVA Eur",57,y);
    y = y + 2
    let taxRateArray: number[] = [];
    let totalHT: number[] = [];
    let totalTax: number[] = [];
    this.order.products.map(item => {
      console.log(item.product.tva)
      !taxRateArray.find(tva => item.product.tva === tva) ? taxRateArray.push(item.product.tva) : null;
    })
    taxRateArray.map(tax => {
      let totalByTax = this.order.products.filter(item => tax === item.product.tva).map(item => item.product.price*item.quantity / (1+(tax/100))).reduce(reducer, 0)
      totalHT.push(totalByTax)
    })
    taxRateArray.map(tax => {
      let totalByTax = this.order.products.filter(item => tax === item.product.tva).map(item => (item.product.price*item.quantity / (1+(tax/100)))*(tax/100)).reduce(reducer, 0)
      totalTax.push(totalByTax)
    })
    taxRateArray.map((item,index) => {
      doc.text(item.toFixed(2),5,y+(index)*2);
      doc.text(totalHT[index].toFixed(2),32,y+(index)*2);
      doc.text(totalTax[index].toFixed(2),60,y+(index)*2);
    })
    doc.save("hello.pdf");
  }
}
