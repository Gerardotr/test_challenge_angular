import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store, select } from '@ngrx/store';

import * as customerActions from '../state/customer.actions';
import * as fromCustomer from '../state/customer.reducer';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  constructor(
    private store: Store<fromCustomer.AppState>,
    private changeDetector: ChangeDetectorRef
  ) {}
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'phone',
    'status',
    'options',
  ];

  customers$: Observable<Customer[]>;
  error$: Observable<String>;
  dataSource = new MatTableDataSource<any>();
  customers: Customer[];

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.store.dispatch(new customerActions.LoadCustomers());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
    this.error$ = this.store.pipe(select(fromCustomer.getError));
    this.customers$.subscribe({
      next: (state) => {
        console.log(state);
        this.dataSource = new MatTableDataSource(state);
        this.dataSource.sort = this.sort;
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;

        });
      },
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteCustomer(customer: Customer) {
    if (confirm('Are you sure')) {
      this.store.dispatch(new customerActions.DeleteCustomer(customer.id));
    }
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(new customerActions.LoadCustomer(customer.id));
  }

  async generateRecords(count: number) {
    const records: Customer[] = [];

    for (let i = 1; i <= count; i++) {
      records.push({
        id: i,
        first_name: `First Name ${i}`,
        last_name: `Last Name ${i}`,
        phone: `7021799${i}`,
        status: 'inactive',
        email: `test${i}@yopmail.com`,
      });
    }

    for await (const record of records) {
      this.store.dispatch(new customerActions.CreateCustomer(record));
    }
  }

  filter(value) {

    var text = value.target.value;

    this.dataSource.filter = text.trim().toLowerCase();

  }
}
