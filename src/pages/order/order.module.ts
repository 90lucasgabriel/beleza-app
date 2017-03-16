import { NgModule, ModuleWithProviders }  from '@angular/core';
import { IonicModule }                    from 'ionic-angular';

import { OrderListPage }                  from './order-list/order-list';
import { OrderWorkflowPage }              from './order-workflow/order-workflow';

import { OrderResource }                  from './order.resource';

@NgModule({
  imports:      [
    IonicModule.forRoot(OrderListPage),
    IonicModule.forRoot(OrderWorkflowPage)
  ],
  declarations: [
    OrderListPage,
    OrderWorkflowPage
  ],
  exports: [
    OrderListPage,
    OrderWorkflowPage
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
