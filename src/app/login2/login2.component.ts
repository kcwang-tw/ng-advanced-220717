import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit, OnDestroy {
  data = {
    email: 'test@123',
    password: '12345',
    isRememberMe: true,
    tab1: {
      addr: '',
      zip: ''
    }
  };

  orig_body_className = document.body.className;

  form = this.fb.group(this.data);

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';
  }

  ngOnDestroy(): void {
    document.body.className = this.orig_body_className;
  }

}
