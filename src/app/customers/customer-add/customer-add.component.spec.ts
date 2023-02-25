import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Store, StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';
import { CustomerAddComponent } from './customer-add.component';

import { EmailValidator } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CustomerAddComponent', () => {
  let component: CustomerAddComponent;
  let fixture: ComponentFixture<CustomerAddComponent>;
  const initialState = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [Store, EmailValidator],
      declarations: [CustomerAddComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the input values correctly', () => {
    component.customerForm.patchValue({
      first_name: 'John',
      last_name: 'Doe',
      status: 'active',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    });
    fixture.detectChanges();

    const firstNameInput = fixture.nativeElement.querySelector('#first-name');
    const lastNameInput = fixture.nativeElement.querySelector('#last-name');
    const statusInput = fixture.nativeElement.querySelector('#status');
    const emailInput = fixture.nativeElement.querySelector('#email');
    const phoneInput = fixture.nativeElement.querySelector('#phone');

    expect(firstNameInput.value).toEqual('John');
    expect(lastNameInput.value).toEqual('Doe');
    expect(statusInput.value).toEqual('active');
    expect(emailInput.value).toEqual('johndoe@example.com');
    expect(phoneInput.value).toEqual('123-456-7890');
  });

  it('should emit the customer data on save', () => {
    spyOn(component.customerSaved, 'emit');
    const saveButton = fixture.nativeElement.querySelector('#save-button');

    component.customerForm.patchValue({
      first_name: 'John',
      last_name: 'Doe',
      status: 'active',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    });
    fixture.detectChanges();

    saveButton.click();

    expect(component.customerSaved.emit).toHaveBeenCalledWith({
      first_name: 'John',
      last_name: 'Doe',
      status: 'active',
      email: 'johndoe@example.com',
      phone: '123-456-7890',
    });
  });
  it('should display the element', () => {
    fixture.detectChanges(); // trigger change detection
    const debugElement = fixture.debugElement.query(By.css('#email'));
    expect(debugElement).toBeTruthy(); // check that the element is present
    const element = debugElement.nativeElement;
    expect(element.textContent).toEqual(''); // access the element's properties
  });
});
function provideMockStore(arg0: { initialState: any }): any {
  throw new Error('Function not implemented.');
}
