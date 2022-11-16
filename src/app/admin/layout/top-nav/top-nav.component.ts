import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/model/services/auth.service';
import { TokenStorageService } from 'src/app/model/services/token-storage.service';
import { UserService } from 'src/app/model/services/user.service';


@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<void>();

  constructor(private toastr: ToastrService,private userservice: UserService, private diag: MatDialog,private token: TokenStorageService,private readonly router: Router,private tokenStorageService: TokenStorageService, ) {}
  currentUser: any;

  
  ngOnInit() {

    this.currentUser = this.token.getUser();
  }

  toggleSidebar() {
    this.sideNavToggled.emit();
  }

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);

  }
 
  


  
}
