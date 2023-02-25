import { Component, OnInit } from '@angular/core';
import { Customer } from './customers/customer.model';
import { Store } from '@ngrx/store';
import * as customerActions from './customers/state/customer.actions';
import * as fromCustomer from './customers/state/customer.reducer';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test_01';

  constructor(private store: Store<fromCustomer.AppState>) {}

  ngOnInit(): void {

  }


}
