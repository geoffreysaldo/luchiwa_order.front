import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import {CommandsDashboardComponent} from './components/commands-dashboard/commands-dashboard.component';
import {OrdersResolver} from './infra/orders.resolver';
const routes: Routes = [
    {
        path: '',
        component:CommandsDashboardComponent,
        resolve: {
          orders: OrdersResolver,
        }
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule],
    providers:[
        OrdersResolver,
    ]
})

export class CommandsRoutingModule {}
