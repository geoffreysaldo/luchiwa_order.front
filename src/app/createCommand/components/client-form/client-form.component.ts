import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith, debounceTime} from 'rxjs/operators';
import { Mode } from '../../models/mode.model';
import { OrderService } from '../../infra/order.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnChanges{
  @Input() mode
  @Output() clientEmitter = new EventEmitter();
  @Output() sendDiscount = new EventEmitter();

  commandForm: FormGroup;
  filteredOptions: any[];

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder) { }

  ngOnChanges(){
    this.buildForm();
    this.commandForm.controls.discount.valueChanges.subscribe(value => {
      this.sendDiscountAction(value);
    })
  }

  saveOrder(){
    if(this.commandForm.valid){
      console.log(this.commandForm.value)
      this.clientEmitter.emit(this.commandForm.value)
      this.commandForm.reset()
    }
  }

  buildForm(){
    switch (this.mode){
      case 'LIVRAISON':
        this.commandForm = this.fb.group({
          firstName: ['',[Validators.minLength(2)]],
          lastName:['',[Validators.required, Validators.minLength(2)]],
          address:['', [Validators.required, Validators.minLength(5)]],
          city: ['',[Validators.minLength(3)]],
          zipCode:['', [Validators.required,Validators.pattern('[0-9]{5}')]],
          phoneNumber:['', [Validators.required, Validators.pattern('[0-9]{10}')]],
          cutlery:['', Validators.required],
          hour:['', [Validators.required]],
          table:[''],
          discount:[0,[Validators.required]],
          payment:['Espèces', []]
        })
        break;
      case 'EMPORTER':
        this.commandForm = this.fb.group({
          firstName: ['',[Validators.minLength(2)]],
          lastName:['',[Validators.required, Validators.minLength(2)]],
          address:[''],
          city: [''],
          zipCode:[''],
          phoneNumber:['', [Validators.required, Validators.pattern(/^((\+)33|0)[1-9](\d{2}){4}$/g)]],
          cutlery:['', Validators.required],
          hour:['', [Validators.required]],
          table:[''],
          discount:[10,[Validators.required]],
          payment:['Espèces', []]
        })
        break;
      case 'SUR_PLACE':
        this.commandForm = this.fb.group({
          firstName: [''],
          lastName:[''],
          address:[''],
          city: [''],
          zipCode:[''],
          phoneNumber:[''],
          cutlery:['', Validators.required],
          hour:[''],
          table:['', Validators.required],
          discount:[0,[Validators.required]],
          payment:['Espèces', []]
          })
        break;
      };
      this.commandForm.controls.lastName.valueChanges.pipe(debounceTime(500)).subscribe(value => {
        this.orderService.autocomplete({lastname: value}).subscribe( value => {
          this.filteredOptions = value;
        })
    });
  }

  setClient(client){
    this.commandForm.controls._id.setValue(client._id);
    this.commandForm.controls.firstName.setValue(client.firstName);
    this.commandForm.controls.lastName.setValue(client.lastName);
    this.commandForm.controls.address.setValue(client.address);
    this.commandForm.controls.zipCode.setValue(client.zipCode);
    this.commandForm.controls.city.setValue(client.city);
    this.commandForm.controls.phoneNumber.setValue(client.phoneNumber);
  }

  sendDiscountAction(value) {
    this.sendDiscount.emit(value)
  }

}
