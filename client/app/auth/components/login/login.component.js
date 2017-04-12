import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import template from './login.template.html';
import { clientId, clientSecret, redirectUrl } from '../../../../../server/config';

@Component({
  selector: 'login',
  template: template
})

export class LoginComponent {

  constructor(router: Router,
              userService: UserService) {
    this._userService = userService;
    this._router = router;
    this._clientId = clientId;
    this._scopes = 'https://www.googleapis.com/auth/calendar';
    console.log('id', this._clientId)
    // console.log('gapi', gapi)
  }

  login(authResult) {
    console.log('auth result from LoginComponent', authResult);

    if (authResult && !authResult.error) {
      console.log('auth', authResult);
      let access_token = authResult.access_token;
      this._userService.login(access_token).subscribe((result) => {
        if (result) {
          this._router.navigate(['add-flo']);
        }
      });
    }
  }

  onSubmit() {
    gapi.auth.authorize({client_id: this._clientId, scope: this._scopes, immediate: false}, this.login.bind(this));
    return false;
  }
}
