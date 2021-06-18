import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";

const verifyEndpoint =
  "https://angry-cori-854281.netlify.app/.netlify/functions/verify";

  
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app";
  redirectUrl = "";
  token = "";

  constructor(private http: HttpClient, private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.paramMap.subscribe((paramMap) => {
      this.token = paramMap.get("token");
      if (!this.token) {
        alert("missing token");
        return;
      }
      this.redirectUrl = paramMap.get("redirectUrl");
      if (!this.redirectUrl) {
        alert("missing redirect url");
        return;
      }

      this.http
        .post(verifyEndpoint, { token: this.token })
        .toPromise()
        .then(() => {
          window.location.href = this.redirectUrl;
        })
        .catch((e) => {
          alert(e);
        });
    });
  }
}
