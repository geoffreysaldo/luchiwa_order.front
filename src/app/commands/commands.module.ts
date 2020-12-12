import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common'

import { ThemeRoutingModule } from '../theme/theme-routing.module';
import { ThemeModule } from '../theme/theme.module';
import { CommandsRoutingModule } from './commands-routing.module'
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { OrderService } from '../createCommand/infra/order.service'

import {CommandsDashboardComponent} from './components/commands-dashboard/commands-dashboard.component';

@NgModule({
    declarations:[CommandsDashboardComponent],
    imports: [
        CommandsRoutingModule,
        CommonModule,
        HttpClientModule,
        ThemeModule,
        ThemeRoutingModule,
        MatCardModule,
        MatButtonModule,
    ],
    providers: [
      OrderService
    ]

})

export class CommandsModule {}
