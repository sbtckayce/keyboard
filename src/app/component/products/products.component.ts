import { Component, OnInit } from '@angular/core';

import { Product } from 'src/app/model/products.model';
import { ProductsService } from 'src/app/_sevices/products.service';
import * as AOS from 'aos';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products : Product[] = [];
  filterCategories : Product[]=[]
  searchKey: string =''
  isShow:boolean=false;
  p:number=1;
  loading:boolean=false;
  constructor(private productsService: ProductsService ) {
   
   }

  ngOnInit(): void {

    this.getItem()
    AOS.init()
    this.productsService.search.subscribe((value:any) =>{
      this.searchKey=value
    })
  }
  getItem(){
    this.loading=true
   this.productsService.getItem().subscribe(res =>{
      this.products =res
      this.filterCategories = res
      this.loading=false
    },err =>{
      this.loading=false
      alert(err)
    })
  }
  filterProduct(category:string){
    
    this.filterCategories=this.products.filter((a:any)=>{
      if(a.category == category || category ==''){
        return a;
      }
    })
  }
  toggleActive(){
    
    this.isShow=!this.isShow

   
  
  
  }

}
