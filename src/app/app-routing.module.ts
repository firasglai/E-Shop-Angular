import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { ShopComponent } from './layouts/shop/shop.component';
import { CheckedComponent } from './components/checked/checked.component';


const routes: Routes = [
{ 
  path: "auth",
  component: AuthComponent,
  children: [
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "", redirectTo: "login", pathMatch: "full" },
  ],
},

{ 
  path: "home",
  component: ShopComponent,
  children: [
    {path: 'shop', component: ProductListComponent},
    {path: 'shop/:term', component: ProductListComponent},
    {path: 'shop/products/:id', component: ProductDetailComponent},
    {path: 'account', component: UserDetailComponent},
    {path: 'cart', component: CartComponent},
    { 
      path: 'checked',
      component: CheckedComponent
    },
    
    {path: 'settings', component: UserSettingsComponent},
    { path: "", redirectTo: "shop", pathMatch: "full" },
  ],
},




/*
{path:'',component:HomeComponent},
{path: 'shop', component: ProductListComponent},
{path: 'shop/:term', component: ProductListComponent},
{path: 'shop/products/:id', component: ProductDetailComponent},
{path: 'account', component: UserDetailComponent},
{path: 'cart', component: CartComponent}
*/
{path:'',component:HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
