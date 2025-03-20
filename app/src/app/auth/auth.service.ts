import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private http: HttpClient, private router: Router) { }

  register(user: { email: string, password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }

  login(user: { email: string, password: string }): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, user).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this.loggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['auth', 'login']);
  }
  
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
  
  getToken(): string {
    return localStorage.getItem('token') || '';
  }
  
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
}  