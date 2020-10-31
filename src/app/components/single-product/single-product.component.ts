import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute } from '@angular/router';
import { ProductModelServer } from 'src/app/models/product.model';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  products : ProductModelServer;
  name;
  price;
  description;

  constructor(private productService : ProductService,
              private cartService : CartService,
              private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      
      this.productService.getSingleProduct(params['id']).subscribe((prods:ProductModelServer) =>{
        console.log(prods);
        this.products = prods;
        this.name = prods.name;
        this.price = prods.price;
        this.description = prods.description;
      
        console.log(this.products.name);
        
        });
     });
  }

  onAddCart(id : number){
    this.cartService.AddProductToCart(id);
  }

}
