import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dashboard.component';
import { NotFoundComponent } from './components/not-found.component';

const routes: Routes = [
  { path: 'dashboard', component: DashBoardComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('../app/components/user/user.module').then(m => m.UserModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
