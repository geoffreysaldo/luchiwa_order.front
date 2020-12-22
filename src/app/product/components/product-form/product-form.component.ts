import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductInterface } from '../../../createCommand/models/product.interface';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'

enum Mode {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
}

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  mode: Mode = Mode.ADD;
  public _product = null;
  public formProduct: FormGroup;
  @Input() set product(product: ProductInterface){
    if(product){
      this.mode = Mode.UPDATE;
      this._product = product;
      this.formProduct.patchValue(this._product);
    }
    };
  @Input() categories: string[];
  @Output() updateEmitter = new EventEmitter();
  @Output() deleteEmitter = new EventEmitter();
  @Output() addEmitter = new EventEmitter();

  constructor(private formBuilder: FormBuilder) {
      this.formProduct = this.formBuilder.group({
        _id:[''],
        name:['',[Validators.required]],
        category:['',[Validators.required]],
        price:['',[Validators.required]],
        tva:[10,[Validators.required]],
      })
   }

  ngOnInit(): void {
    console.log(this.mode);

  }

  getMode() {
    return this.mode;
  }

  saveUpdate() {
    if(this.formProduct.valid){
      if(this.mode === Mode.UPDATE) {
        this.updateEmitter.emit(this.formProduct.value);
      } else {
        delete this.formProduct.value._id;
        console.log(this.formProduct.value)
        this.addEmitter.emit(this.formProduct.value);
      }
  }
  }

  delete() {
    if(this.mode = Mode.UPDATE) {
      this.deleteEmitter.emit(this._product);
    }
  }

  cancel() {
    if(this.mode = Mode.UPDATE) {
      this.mode = Mode.ADD;
    }
    this.formProduct.reset();
  }

}
