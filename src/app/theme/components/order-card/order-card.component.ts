import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order;
  @Input() mode;
  @Output() deleteEmitter = new EventEmitter();
  @Output() printTicketEmitter = new EventEmitter();
  expanded = false
  constructor() { }

  ngOnInit(): void {
  }

  expandProduct(){
    this.expanded = !this.expanded
  }

  deleteOrder(){
    this.deleteEmitter.emit(this.order._id)
  }

  printOrder() {
    this.printTicketEmitter.emit(this.order);
  }
}
