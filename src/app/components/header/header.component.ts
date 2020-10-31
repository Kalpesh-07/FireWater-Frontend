import { Component, OnInit } from '@angular/core';
import { CartModelServer } from 'src/app/models/cart.model';
import { CartService } from 'src/app/service/cart.service';
import { AuthsService } from 'src/app/service/auths.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  subTotal: number;
  cartno: number;
  user;
  constructor(public cartService: CartService,
    private authService: AuthsService) { }

  ngOnInit(): void {
    this.cartService.cartTotal$.subscribe(total => { this.cartTotal = total });
    this.cartService.cartDataobs$.subscribe((data: CartModelServer) => { this.cartData = data });
    this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

}