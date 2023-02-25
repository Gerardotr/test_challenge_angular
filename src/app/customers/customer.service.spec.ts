import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CustomerService ]
    });
    service = TestBed.inject(CustomerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a customer by ID', () => {
    const customer = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      phone: '123-456-7890',
      status: 'Active',
      email: 'john.doe@example.com'
    };

    service.getCustomerById(1).subscribe((data) => {
      expect(data).toEqual(customer);
    });

    const req = httpMock.expectOne('http://localhost:3000/customers/1');
    expect(req.request.method).toBe('GET');
    req.flush(customer);
  });

  it('should create a new customer', () => {
    const customer = {
      first_name: 'John',
      last_name: 'Doe',
      phone: '123-456-7890',
      status: 'Active',
      email: 'john.doe@example.com'
    };

    service.createCustomer(customer).subscribe((data) => {
      expect(data).toEqual(customer);
    });

    const req = httpMock.expectOne('http://localhost:3000/customers');
    expect(req.request.method).toBe('POST');
    req.flush(customer);
  });

  it('should update an existing customer', () => {
    const customer = {
      id: 1,
      first_name: 'John',
      last_name: 'Doe',
      phone: '123-456-7890',
      status: 'Active',
      email: 'john.doe@example.com'
    };

    service.updateCustomer(customer).subscribe((data) => {
      expect(data).toEqual(customer);
    });

    const req = httpMock.expectOne('http://localhost:3000/customers/1');
    expect(req.request.method).toBe('PATCH');
    req.flush(customer);
  });

  it('should delete an existing customer', () => {
    service.deleteCustomer(1).subscribe((data) => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne('http://localhost:3000/customers/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
