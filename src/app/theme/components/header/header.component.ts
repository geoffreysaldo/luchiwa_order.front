import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  state: string;
  constructor() { }

  ngOnInit(): void {
  }

  setPart(event){
    console.log(event)
    this.state = event;
  }

}
