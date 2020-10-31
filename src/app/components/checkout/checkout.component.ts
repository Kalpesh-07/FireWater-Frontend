import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

import { NgxSpinnerService } from "ngx-spinner";
import { CartModelServer } from "src/app/models/cart.model";
import { CartService } from "src/app/service/cart.service";
import { OrderService } from "src/app/service/order.service";
import { AuthsService } from "src/app/service/auths.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  showSpinner: Boolean;
  user;
  userId;
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private authService: AuthsService
  ) { }

  ngOnInit(): void {
    this.cartService.cartDataobs$.subscribe(data => (this.cartData = data));
    this.cartService.cartTotal$.subscribe(total => (this.cartTotal = total));
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.userId = this.user.id;
    });
  }
  onCheckout() {
    if (this.cartTotal > 0) {
      this.spinner.show().then(p => {
        this.cartService.CheckoutFromCart(this.userId);
      });
    } else {
      return;
    }
  }
}
