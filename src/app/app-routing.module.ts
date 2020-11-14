import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/authentication.guard';
import { NoAuthenticationGuard } from './guards/no-authentication.guard';
import { ChardetailComponent } from './pages/chardetail/chardetail.component';
import { CharlistComponent } from './pages/charlist/charlist.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: 'charListView', component:CharlistComponent},
  {path:'chardetail/:currentCharId', component:ChardetailComponent},
  {path:'login', component:LoginComponent, canActivate:[NoAuthenticationGuard]},
  {path:'favorites/:currentUserId', component:FavoritesComponent, canActivate: [AuthenticationGuard]},
  { path: '**', pathMatch: 'full', redirectTo: 'charListView' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
