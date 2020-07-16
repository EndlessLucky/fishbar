import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'fishbar-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup = this.fb.group({
    displayName: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    postCode: ['', Validators.required],
    address: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn){
      this.form.setValue({
        displayName: this.authService.userData.displayName,
        email: this.authService.userData.email,
        phoneNumber: this.authService.userData.phoneNumber,
        postCode: this.authService.userData.postCode,
        address: this.authService.userData.address
      });
    }
  }

  changeProfile(): void{
    this.authService.changeProfile(this.form.value);
  }
}
