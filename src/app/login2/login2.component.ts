import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

function forbiddenPassword(control: AbstractControl) {
  if (!control.value) {
    return null;
  }

  const forbidden = ['123', 'password'];
  var result = forbidden.some(x => control.value.toLowerCase().indexOf(x) >= 0);
  return result ? { forbiddenPassword: { value: control.value } } : null;
}

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
      {
        city: 'Taipei',
        tel: '0912345678'
      },
      {
        city: 'New Taipei',
        tel: '0987654321'
      }
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
        Validators.minLength(6),
        forbiddenPassword
      ]
    }),
    isRememberMe: this.fb.control(true, {
    }),
    profiles: this.fb.array([
      this.makeProfile('Taipei', '0988-888888'),
      this.makeProfile('台中', '0944-444444'),
    ]),
  });

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    document.body.className = 'bg-gradient-primary';

    setTimeout(() => {
      this.form.controls.profiles.clear();
      this.data.profiles.forEach(profile => {
        this.form.controls.profiles.push(this.makeProfile(profile.city, profile.tel));
      });
      this.form.setValue(this.data);
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
