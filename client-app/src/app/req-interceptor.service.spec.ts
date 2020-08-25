import { TestBed } from '@angular/core/testing';

import { ReqInterceptorService } from './req-interceptor.service';

describe('ReqInterceptorService', () => {
  let service: ReqInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReqInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
