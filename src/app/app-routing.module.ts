import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeComponent} from "./components/home/home.component";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ProductComponent } from './components/product/product.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileGuard } from './guards/profile.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { SingleProductComponent } from './components/single-product/single-product.component';



const routes: Routes = [
  {path : '' , component : HomeComponent },
  {path : 'header' , component : HeaderComponent },
  {path : 'signin' , component : SignInComponent},
  {path : 'profile' , component : ProfileComponent},
  {path : 'signup' , component : SignUpComponent},
  {path : 'footer' , component : FooterComponent },
  {path : 'about' , component : AboutUsComponent },
  {path : 'contact' , component : ContactUsComponent },
  {path : 'cart' , component : CartComponent },
  {path : 'checkout' , component : CheckoutComponent, canActivate: [ProfileGuard] },
  {path : 'product' , component : ProductComponent},
  {path : 'thankyou' , component : ThankyouComponent, canActivate: [ProfileGuard]},
  {path : 'product/:cat' , component : ProductComponent},
  {path : 'allproducts' , component : AllProductsComponent},
  {path : 'single-product/:id' , component : SingleProductComponent},
  

];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
