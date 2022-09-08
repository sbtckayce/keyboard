import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems = new BehaviorSubject<Product[]>([]);
  placeHolder : Product[] = [];
  constructor() {
    const ls = this.getCartData()

    if(ls) this.cartItems.next(ls)
   }
  addItem(product : Product) {
    const ls = this.getCartData()

    let exist :Product | undefined 

    if(ls){
      exist = ls.find((item : Product) =>{
        return item.id === product.id
      })
    }
      
    if(exist){
      exist.sellQuantity ++
      this.setCartData(ls)
    }else{
      if(ls){
        const newData =[...ls,product]
        this.setCartData(newData)
        this.cartItems.next(this.getCartData() )
      }else{
        this.placeHolder.push(product)
        this.setCartData(this.placeHolder)
        // this.cartItems.next(this.placeHolder)
      }
    }
  }
  setCartData(data:any){
    localStorage.setItem('cart', JSON.stringify(data))
    this.cartItems.next(this.getCartData())
  }
  getCartData(){
    return JSON.parse(localStorage.getItem('cart')|| '[]')
  }
}
