import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ColorsComponent } from './colors/colors.component';

const routes: Routes = [
  {
    path: 'colors/:type',
    component: ColorsComponent,
  },
  { path: 'colors', component: ColorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
