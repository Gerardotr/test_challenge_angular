import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditComponent } from './customer-edit.component';
import { Store, StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('CustomerEditComponent', () => {
  let component: CustomerEditComponent;
  let fixture: ComponentFixture<CustomerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}),ReactiveFormsModule, MaterialModule, BrowserAnimationsModule],
      providers: [
        Store
      ],
      declarations: [ CustomerEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update customer properties', () => {
    const inputEl = fixture.nativeElement.querySelector('input[type="text"]');
    inputEl.value = 'John';
    inputEl.dispatchEvent(new Event('input'));

    const selectEl = fixture.nativeElement.querySelector('select');
    selectEl.selectedIndex = 1;

    fixture.detectChanges();

    expect(component.customerForm.value).toEqual({
      first_name: 'John',
      last_name: '',
      phone: '',
      status: '',
      email: '',
      id: null
    });
  });
});
