import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'

import { ThemeRoutingModule } from './theme-routing.module';
import { HeaderComponent } from './components/header/header.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { OrderListComponent } from './components/order-list/order-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import { OrderCardComponent } from './components/order-card/order-card.component';
import {MatDividerModule} from '@angular/material/divider';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProductService } from './infra/product.service';

@NgModule({
    declarations:[HeaderComponent, OrderListComponent, OrderCardComponent, CategorySliderComponent, ProductGridComponent,],
    imports: [
        CommonModule,
        ThemeRoutingModule, 
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        MatListModule,
        MatIconModule,
        MatDividerModule,
        MatGridListModule],
    exports:[
        HeaderComponent,
        OrderListComponent,
        CategorySliderComponent,
        ProductGridComponent,
    ],
    providers:[
        ProductService
    ]
    
})

export class ThemeModule {}