import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer/customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { customerReducer } from '../customers/state/customer.reducer';
import { CustomerEffect } from '../customers/state/customer.effects';
import { ReactiveFormsModule } from '@angular/forms';

const customerRoutes: Routes = [{ path: '', component: CustomerComponent }];

@NgModule({
  declarations: [
    CustomerComponent,
    CustomerAddComponent,
    CustomerEditComponent,
    CustomerListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(customerRoutes),
    MaterialModule,
    StoreModule.forFeature('customers', customerReducer),
    EffectsModule.forFeature([CustomerEffect])
  ],
})
export class CustomersModule {}
