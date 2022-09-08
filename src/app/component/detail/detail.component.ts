import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/products.model';
import { CartService } from 'src/app/_sevices/cart.service';
import { ProductsService } from 'src/app/_sevices/products.service';
import * as AOS from 'aos';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  products : Product[] = []
  product :Product | undefined
  displayImage : number =0
  loading : boolean = false
  constructor(private productsService : ProductsService , private routerActive : ActivatedRoute,private cartService : CartService
    ,private router : Router) { }

  ngOnInit(): void {
   
    this.productsService.getItem().subscribe(res=>{
      this.products = res
      const name = this.routerActive.snapshot.params['name']
      this.product=this.getProduct(name)
     
    },err=>{
     
      alert(err)
    })
    AOS.init()
  }
  getProduct(name:string){
    return this.products.find((p:Product) => p.name === name)
  }
  addToCart(p:Product){
    this.cartService.addItem(p)
    this.router.navigate(['cart'])

  }
}
