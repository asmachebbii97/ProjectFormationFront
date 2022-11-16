import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../model/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  Form: FormGroup;
  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  username = new FormControl('', Validators.required);
  email= new FormControl('', Validators.required);
  password= new FormControl('', Validators.required);
  fname= new FormControl('', Validators.required);
  lname= new FormControl('', Validators.required);
  pays= new FormControl('', Validators.required);
  country= new FormControl('', Validators.required);
  image= new FormControl('', Validators.required);
  profile: any;



  constructor(private router: Router, private toastr: ToastrService,private authService: AuthService) { }

  ngOnInit() {
    

  }

  onSubmit() {
    this.authService.register(this.form).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);

        this.toastr.success('signup avec succee!')

      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        console.log( this.errorMessage); 
        this.toastr.error(this.errorMessage);
      }
    );
  }
  reset() {
    this.Form.reset(); 
}
getBase64(file): Observable<string> {
  return new Observable<string>(sub => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      sub.next(reader.result.toString());
      sub.complete();
    };
    reader.onerror = error => {
      sub.error(error);
    };
  })
}
handleProfilePictureInput(file) {
 
  this
  .getBase64(file[0])
  .subscribe(str => this.form.image = str);
}
}

