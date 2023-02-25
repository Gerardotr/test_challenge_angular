import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import * as customerActions from '../state/customer.actions';
import * as fromCustomer from '../state/customer.reducer';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
})
export class CustomerAddComponent implements OnInit {
  customerForm: FormGroup;
  @Output() customerSaved = new EventEmitter<Customer>();

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });
  }

  createCustomer() {
    const newCustomer: Customer = {
      first_name: this.customerForm.get('first_name').value,
      last_name: this.customerForm.get('last_name').value,
      status: this.customerForm.get('status').value,
      email: this.customerForm.get('email').value,
      phone: this.customerForm.get('phone').value,
    };

    console.log(newCustomer)

    this.store.dispatch(new customerActions.CreateCustomer(newCustomer));
    this.customerSaved.emit(newCustomer);
    this.customerForm.reset();
  }


    public errorHandling = (control: string, error: string) => {
      return this.customerForm.controls[control].hasError(error);
    }
}
