import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { WindowService } from '../../core/services/window.service';
import { PhoneNumber } from '../../core/services/phone-number';
import * as firebase from 'firebase';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../core/services/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryISO } from 'projects/ngx-intl-tel-input/src/lib/enums/country-iso.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'fishbar-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  windowRef: any;
  verificationCode: string;
  @ViewChild('content')
  private content: TemplateRef<any>;
  userResult: User = {
    uid: '',
    email: '',
    displayName: '',
    postCode: '',
    address: '',
    phoneNumber: '',
    emailVerified: false
  };
  users: any[] = [];
  userData: any;

  phoneForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required]),
  });
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [
    CountryISO.UnitedStates,
    CountryISO.UnitedKingdom
  ];

  constructor(
    public authService: AuthService,
    private win: WindowService,
    private modalService: NgbModal,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    this.windowRef.recaptchaVerifier.render();
  }

  sendLoginCode(phoneNumber): void {

    const appVerifier = this.windowRef.recaptchaVerifier;
    const num = phoneNumber.e164Number;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch( error => alert(error) );

  }

  verifyLoginCode(): void {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then( result => {
        this.authService.phoneLogin().subscribe(users => {
          this.users = users;
          this.userData = this.users.filter(x => x.phoneNumber === result.user.phoneNumber)[0];
          if (this.userData !== undefined){
            localStorage.setItem('user', JSON.stringify(this.userData));
            this.router.navigate(['dashboard']);
          }else{
            this.userResult.uid = result.user.uid;
            this.userResult.email = 'user@user.com';
            this.userResult.emailVerified = result.user.emailVerified;
            this.userResult.phoneNumber = result.user.phoneNumber;
            this.modalService.open(this.content);
          }
        });
      })
      .catch( error => console.log(error, 'Incorrect code entered?'));
  }

  open(content): void {
    this.modalService.open(content).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  saveProfile(displayName,postCode, address): void{
    if (displayName === '' || address === ''){
      alert('Please input information');
    }else{
      this.userResult.displayName = displayName;
      this.userResult.postCode = postCode;
      this.userResult.address = address;
      this.authService.SetUserData(this.userResult);
      this.modalService.dismissAll();
    }
  }

  submit(): void {

  }
}
