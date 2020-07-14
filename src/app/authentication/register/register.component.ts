import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TemplateRef, ViewChild } from '@angular/core';

import { User } from '../../core/services/user';

@Component({
  selector: 'fishbar-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private unsubscribeAll: Subject<any> = new Subject<any>();
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

  constructor(
    public authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.authService.resultUpdater$.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe( results => {
      this.userResult.uid = results.user.uid;
      this.userResult.email = results.user.email;
      this.userResult.emailVerified = results.user.emailVerified;
      this.modalService.open(this.content);
    });
  }

  open(content): void {
    this.modalService.open(content).result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log(reason);
    });
  }

  saveProfile(displayName, postCode, address, phoneNumber): void{
    if (displayName === '' || postCode === '' || address === '' || phoneNumber === ''){
      alert('Please input information');
    }else{
      this.userResult.displayName = displayName;
      this.userResult.postCode = postCode;
      this.userResult.address = address;
      this.userResult.phoneNumber = phoneNumber;

      this.authService.SetUserData(this.userResult);
      this.modalService.dismissAll();
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
}
