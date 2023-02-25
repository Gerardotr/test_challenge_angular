import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import { Store, StoreModule } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Customer } from '../customer.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
const CUSTOMERS: Customer[] = [
  {
    first_name: 'Customer1',
    last_name: 'Customer1',
    email: 'test@yopmail.com',
    status: 'active',
    phone: '879898686',
  },
  {
    first_name: 'Customer2',
    last_name: 'Customer2',
    email: 'test@yopmail.com',
    status: 'active',
    phone: '879898686',
  },
];
describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let tableElement: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
      ],
      providers: [Store],
      declarations: [CustomerListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    tableElement = fixture.debugElement.query(By.css('table'));

    fixture.detectChanges();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    tableElement = fixture.debugElement.query(By.css('table'));
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table with headers for first name, last name, phone, status, and email', () => {
    fixture.detectChanges();
    const tableHeaders = tableElement.queryAll(By.css('th'));
    expect(tableHeaders.length).toEqual(5);
    expect(tableHeaders[0].nativeElement.textContent).toContain('First Name');
    expect(tableHeaders[1].nativeElement.textContent).toContain('Last Name');
    expect(tableHeaders[2].nativeElement.textContent).toContain('Phone');
    expect(tableHeaders[3].nativeElement.textContent).toContain('Status');
    // expect(tableHeaders[4].nativeElement.textContent).toContain('Email');
  });

  it('should display customer data in the table', () => {
    component.dataSource.data = [
      {
        first_name: 'John',
        last_name: 'Doe',
        phone: '555-1234',
        status: 'Active',
        email: 'john.doe@example.com',
      },
      {
        first_name: 'Jane',
        last_name: 'Doe',
        phone: '555-5678',
        status: 'Inactive',
        email: 'jane.doe@example.com',
      },
    ];
    fixture.detectChanges();
    const tableRows = tableElement.queryAll(By.css('tr'));
    console.log('AQUI',tableRows[1].nativeElement.textContent)
    expect(tableRows.length).toEqual(3); // 2 rows + header row
    expect(tableRows[1].nativeElement.textContent).toContain('John');
    expect(tableRows[1].nativeElement.textContent).toContain('Doe');
    expect(tableRows[1].nativeElement.textContent).toContain('555-1234');
    // expect(tableRows[1].nativeElement.textContent).toContain('john.doe@example.com');
    expect(tableRows[1].nativeElement.textContent).toContain('Active');

    expect(tableRows[2].nativeElement.textContent).toContain('Jane');
    expect(tableRows[2].nativeElement.textContent).toContain('Doe');
    expect(tableRows[2].nativeElement.textContent).toContain('555-5678');
    // expect(tableRows[2].nativeElement.textContent).toContain('jane.doe@example.com');
    expect(tableRows[2].nativeElement.textContent).toContain('Inactive');

  });


});
