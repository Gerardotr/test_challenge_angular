import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerAddComponent } from '../customer-add/customer-add.component';
import { CustomerEditComponent } from '../customer-edit/customer-edit.component';
import { CustomerListComponent } from '../customer-list/customer-list.component';

import { CustomerComponent } from './customer.component';

import { Store, StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
      ],

      providers: [Store],

      declarations: [
        CustomerComponent,
        CustomerAddComponent,
        CustomerEditComponent,
        CustomerListComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
