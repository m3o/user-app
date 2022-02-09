import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

const verifyEndpoint =
  'https://angry-cori-854281.netlify.app/.netlify/functions/verify';

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
  email = '';
  id = '';

  constructor(private http: HttpClient, private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.queryParams.subscribe((paramMap) => {
      this.token = paramMap['token'];
      this.id = paramMap['id'];
      this.email = paramMap['email'];

      if (!this.token) {
        console.log('missing token');
        return;
      }

      if (!this.id) {
        console.log('missing id');
        return;
      }

      if (!this.email) {
        console.log('missing email');
        return;
      }

      this.redirectUrl = paramMap['redirectUrl'];
      if (!this.redirectUrl) {
        console.log('missing redirect url');
        return;
      }
      this.failureRedirectUrl = paramMap['failureRedirectUrl'];

      this.http
        .post(verifyEndpoint, { id: this.id, email: this.email, token: this.token })
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
