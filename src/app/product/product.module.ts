import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'

import { ThemeRoutingModule } from '../theme/theme-routing.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ThemeModule } from '../theme/theme.module';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
    declarations:[ProductPageComponent, ProductFormComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        ThemeModule,
        ThemeRoutingModule,
        ProductRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatListModule,
        MatInputModule,
        MatSelectModule,
    ],

})

export class ProductModule {}
