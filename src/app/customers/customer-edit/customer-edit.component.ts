import { Component, OnInit } from '@angular/core';


import { Store } from '@ngrx/store';
import * as customerActions from '../state/customer.actions';
import * as fromCustomer from '../state/customer.reducer';
import { Observable } from 'rxjs';
import { Customer } from '../customer.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromCustomer.AppState>
  ) {}

  ngOnInit(): void {

    this.customerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      status: ['', Validators.required],
      email: ['', [Validators.required, Validators.email],],
      phone: [''],
      id: null
    });

    const customer$: Observable<Customer> = this.store.select(
      fromCustomer.getCurrentCustomer
    )

    customer$.subscribe(currentCustomer => {
      if(currentCustomer) {
        this.customerForm.patchValue({

          first_name: currentCustomer.first_name,
          last_name: currentCustomer.last_name,
          status: currentCustomer.status,
          email: currentCustomer.email,
          phone: currentCustomer.phone,
          id: currentCustomer.id

        })

      }
    })

  }

  updateCustomer() {

    const updateCustomer: Customer = {
      first_name: this.customerForm.get('first_name').value,
      last_name: this.customerForm.get('last_name').value,
      status: this.customerForm.get('status').value,
      email: this.customerForm.get('email').value,
      phone: this.customerForm.get('phone').value,
      id: this.customerForm.get('id').value,
    };

    console.log(updateCustomer)

    this.store.dispatch(new customerActions.UpdateCustomer(updateCustomer))
    this.customerForm.reset();

  }

  public errorHandling = (control: string, error: string) => {
    return this.customerForm.controls[control].hasError(error);
  }



}
