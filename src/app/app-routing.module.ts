import {NgModule} from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {
        path: 'create_command/:mode',
        loadChildren: () => import('./createCommand/createCommand.module').then(m => m.CreateCommandModule)
    },
    {
        path: 'product',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
    },
    {
        path: 'commands',
        loadChildren: () => import('./commands/commands.module').then(m => m.CommandsModule)
    }

]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {}
