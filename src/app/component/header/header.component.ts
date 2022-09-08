import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_sevices/auth.service';
import { CartService } from 'src/app/_sevices/cart.service';
import { ProductsService } from 'src/app/_sevices/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  logo:string ='/assets/img/logo_transparent.svg'
  searchTerm :string =''
  itemInCart:number =0
  user:any
  constructor(private productsService : ProductsService,private cartService : CartService,private auth:AuthService) { }

  ngOnInit(): void {
    this.cartService.cartItems.subscribe(res=>{
      this.itemInCart = res.length
      console.log(res);
    })
    this.auth.auth.user.subscribe(res=>{
      this.user=res
    })
  }
  search(event:any){
    this.searchTerm=event.target.value
    this.productsService.search.next(this.searchTerm)
  }
  signOut(){
    this.auth.auth.signOut()
  }
}
