import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class UserService{

  constructor (private http: HttpClient) {
  }

  register ({ email, password }: any) {
    
  }

  login () {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new URLSearchParams();
    body.set('client_id', environment.keycloak.client_id);
    body.set('grant_type', environment.keycloak.grant_type);
    body.set('email','andres@mail.com')
    body.set('password', '1234')
    body.set('client_secret', environment.keycloak.client_secret);
    this.http.post<any>(`http://localhost:9090/realms/spring-boot-realm-dev/protocol/openid-connect/token`, body.toString(), {headers})
      .toPromise().then(res => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + res.access_token
        });
        this.http.get<any>('http://localhost:8080/hello-1', { headers }).toPromise().then((res: any) => {
          console.log(res.message);
        })
        console.log(res.access_token);
    })

    return this.http.post<any>(`http://localhost:9090/realms/spring-boot-realm-dev/protocol/openid-connect/token`, body.toString(), {headers})

  }

  logout () {
    
  }

  loginWithGoogle () {
    
  }
}
