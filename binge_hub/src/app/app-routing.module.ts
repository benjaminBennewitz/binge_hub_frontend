import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StartComponent } from './components/start/start.component';
import { OverviewComponent } from './components/overview/overview.component';
import { AuthGuard } from './services/auth-guard.service';
import { ImprintComponent } from './components/imprint/imprint.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { PassResetComponent } from './components/pass-reset/pass-reset.component';
import { NewPassComponent } from './components/new-pass/new-pass.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard] },
  { path: 'imprint', component: ImprintComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'pass-reset', component: PassResetComponent },
  { path: 'new-pass/:uidb64/:token', component: NewPassComponent },
  { path: 'start', component: StartComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }