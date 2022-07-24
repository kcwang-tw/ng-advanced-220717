import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
    profiles: [

    ]
  };

  orig_body_className = document.body.className;

  form = this.fb.group({
    email: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.email
      ]
    }),
    password: this.fb.control('', {
      validators: [
        Validators.required,
        Validators.minLength(6)
      ]
    }),
    isRememberMe: this.fb.control(true, {
    }),
    profiles: this.fb.array([
      this.makeProfile('Taipei', '0912345678'),
      this.makeProfile('New Taipei', '0987654321'),
    ])
  });

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';

    setTimeout(() => {
      this.form.patchValue(this.data);
    }, 2000);
  }

  ngOnDestroy(): void {
    document.body.className = this.orig_body_className;
  }

  reset() {
    this.form.reset(this.data);
  }

  makeProfile(city: string, tel: string) {
    return this.fb.group({
      city: this.fb.control(city, {
        validators: [
          Validators.required
        ]
      }),
      tel: this.fb.control(tel, {
        validators: [
          Validators.required
        ]
      })
    });
  }

  addProfile() {
    const profiles = this.form.controls.profiles;
    profiles.push(this.makeProfile('', ''));
  }
}
