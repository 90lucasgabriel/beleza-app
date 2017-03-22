import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { OrderListPage }                  from './order-list/order-list';
import { OrderCreatePage }                from './order-create/order-create';

import { OrderResource }                  from './order.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(OrderListPage),
    IonicModule.forRoot(OrderCreatePage)
  ],
  declarations: [
    OrderListPage,
    OrderCreatePage
  ],
  exports: [
    OrderListPage,
    OrderCreatePage
  ]
})
export class OrderModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule  : OrderModule,
      providers : [
        OrderResource
      ]
    };
  }
}
