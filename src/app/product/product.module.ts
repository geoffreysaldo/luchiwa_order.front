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
import { ProductFormComponent } from './components/product-form/product-form.component';

@NgModule({
    declarations:[ProductPageComponent, ProductFormComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ThemeModule,
        ThemeRoutingModule,
        ProductRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatListModule,
    ],

})

export class ProductModule {}