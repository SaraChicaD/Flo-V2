import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { LoginComponent } from './login.component';
import { CORE_TESTING_PROVIDERS, RouterMock } from '../../../core/testing';
import { AUTH_TESTING_PROVIDERS, UserServiceMock } from '../../testing';

function stubLoginMethod(result) {
  let loginResult = Observable.of(result);
  spyOn(UserServiceMock.prototype, 'login').and.returnValue(loginResult);
}

describe('LoginComponent', () => {
  let subjectFixture;
  let subject;
  let subjectElement;
  let credentials = { email: 'test@gmail.com', password: 'secret' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        AUTH_TESTING_PROVIDERS,
        CORE_TESTING_PROVIDERS
      ]
    });

    let fixture = TestBed.createComponent(LoginComponent);

    subject = fixture.componentInstance;
    subjectElement = fixture.nativeElement;
    subjectFixture = fixture;
  });

  it('should send login request', () => {
    stubLoginMethod(true);

    subject.onSubmit(credentials);

    expect(UserServiceMock.prototype.login).toHaveBeenCalledWith(credentials);
  });

  it('should navigate to list page on successful login', () => {
    stubLoginMethod(true);
    spyOn(RouterMock.prototype, 'navigate');

    subject.onSubmit(credentials);

    expect(RouterMock.prototype.navigate).toHaveBeenCalledWith(['']);
  });

  it('should skip navigation on failed login', () => {
    stubLoginMethod(false);
    spyOn(RouterMock.prototype, 'navigate');

    subject.onSubmit(credentials);

    expect(RouterMock.prototype.navigate.calls.count()).toEqual(0);
  });

  it('should send credentials from input fields', (done) => {
    subject.loginForm.controls['email'].setValue(credentials.email);
    subject.loginForm.controls['password'].setValue(credentials.password);
    subjectFixture.detectChanges();

    stubLoginMethod(true);

    subjectElement.querySelector('button[type=submit]').click();

    setTimeout(() => {
      expect(UserServiceMock.prototype.login).toHaveBeenCalledWith(credentials);
      done();
    }, 0);
  });
});
