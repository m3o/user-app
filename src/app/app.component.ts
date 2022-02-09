import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const verifyEndpoint =
  'https://user.m3o.com/.netlify/functions/verify';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  redirectUrl = '';
  failureRedirectUrl = '';
  token = '';

  constructor(private http: HttpClient, private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.queryParams.subscribe((paramMap) => {
      this.token = paramMap['token'];
      if (!this.token) {
        console.log('missing token');
        return;
      }
      this.redirectUrl = paramMap['redirectUrl'];
      if (!this.redirectUrl) {
        console.log('missing redirect url');
        return;
      }
      this.failureRedirectUrl = paramMap['failureRedirectUrl'];

      this.http
        .post(verifyEndpoint, { token: this.token })
        .toPromise()
        .then(() => {
          window.location.href = this.redirectUrl;
        })
        .catch((e) => {
          console.log(e);
          if (this.failureRedirectUrl) {
            window.location.href = this.failureRedirectUrl;
            return;
          }
          alert(JSON.stringify(e));
        });
    });
  }
}
