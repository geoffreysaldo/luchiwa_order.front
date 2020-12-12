import { NgModule, LOCALE_ID } from '@angular/core';
import {CommonModule} from '@angular/common'
import { CreateCommandRoutingModule} from './createCommand-routing.module';
import { CreateCommandPageComponent } from './components/create-command-page/create-command-page.component';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProductListComponent } from './components/product-list/product-list.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { OrderService } from './infra/order.service';
import { OrderPrintService } from './infra/order-print.service';
import {ThemeModule} from '../theme/theme.module';

@NgModule({
    declarations: [CreateCommandPageComponent, ProductListComponent, ClientFormComponent],
    imports: [
        CommonModule,
        MatAutocompleteModule,
        HttpClientModule,
        CreateCommandRoutingModule,
        MatCardModule,
        MatButtonModule,
        MatGridListModule,
        MatDividerModule,
        MatListModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        ThemeModule],
    exports: [],
    providers: [
        OrderService,
        OrderPrintService,
    ]
})

export class CreateCommandModule {}
