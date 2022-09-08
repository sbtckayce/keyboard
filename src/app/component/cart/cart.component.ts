import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/products.model';
import { AuthService } from 'src/app/_sevices/auth.service';
import { CartService } from 'src/app/_sevices/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  items: Product[] = [];
  total: number = 0;
  vnd:number=0;
  promo: string = '';
  isDisabled: boolean = false;
  user: any
 
 
  constructor(private cartService: CartService, private router: Router, private auth: AuthService) { 
   
  }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(data => {
      this.items = data
    })

    
    this.getTotal(this.items);

    this.auth.auth.user.subscribe(res => {
      this.user = res
    })
    
   
    
  }
  
  onDelete(i: number) {
    this.items.splice(i, 1)
    this.cartService.setCartData(this.items)
    this.getTotal(this.items);

  }
 
  incrementQuantity(quantityInput: HTMLInputElement, i: number) {
    let sellQuantity = parseInt(quantityInput.value);

    this.items[i].sellQuantity = sellQuantity--;

    this.qtyUpdate(sellQuantity, i)
    if (this.items[i].sellQuantity == 1) {
      this.isDisabled = true;

    }
    console.log('-')
    console.log(this.items[i].sellQuantity)
  }
  decrementQuantity(quantityInput: HTMLInputElement, i: number) {
    let sellQuantity = parseInt(quantityInput.value);

    this.items[i].sellQuantity = sellQuantity++;

    this.qtyUpdate(sellQuantity, i)
    console.log('+')
    console.log(this.items[i].sellQuantity)
  }
  qtyUpdate(quantityInput: number, i: number) {
    this.items[i].sellQuantity = quantityInput
    this.cartService.setCartData(this.items)

    this.getTotal(this.items);
  }
  getTotal(data: Product[]) {
    let subs = 0
    for (const d of data) {
      subs += d.newPrice * d.sellQuantity

      this.total = subs
     
      this.vnd=this.total
      console.log('vnd',this.vnd)
    }
   
  
  }

  updatePromo() {


    if (this.promo === 'haha') {
      alert('Ban da duoc giam gia 10 %')

      this.total = this.total * 0.1
    } else {
      alert('khong duoc giam gia')
    }
  }
}