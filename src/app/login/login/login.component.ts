import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/model/services/auth.service';
import { TokenStorageService } from 'src/app/model/services/token-storage.service';
import { RegisterComponent } from 'src/app/register/register.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  Form: FormGroup;
  name : any ; 
  pass: any ; 
  currentUser: any;
  

  constructor(private diag: MatDialog, private token: TokenStorageService,private tokenStorageService: TokenStorageService, private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router,private fb: FormBuilder) { 

  }

  ngOnInit() {
    this.currentUser = this.token.getUser();

    this.Form = this.fb.group({
     
      username : ['', Validators.required],
      password: ['', Validators.required],
      
    
    })
    
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        console.log(this.roles.includes('ROLE_ADMIN'));
       if (this.roles.includes('ROLE_USER')){
        this.onLogin(); 
       } else {
        this.router.navigate(['/dashboard']);
       }
        //this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

 /* reloadPage() {
    window.location.reload();
  }*/

  onLogin() {
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['/dashboard']);
  }
  
     
  logout() {
    this.tokenStorageService.signOut();
    localStorage.setItem('isLoggedin', 'true');
    this.router.navigate(['/login']);

  }
  
  register() {
    
    const diagref = this.diag.open(RegisterComponent, {
      width: '650px',
      height: 'auto',
     
      disableClose: true,
    }) .afterClosed().subscribe((res => {
     
    }));;
   
    
  }
  
  
 
    
}
