import { TestBed } from '@angular/core/testing';

import { RedirectToKeycloakGuard } from './redirect-to-keycloak.guard';

describe('RedirectToKeycloakGuard', () => {
  let guard: RedirectToKeycloakGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RedirectToKeycloakGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
