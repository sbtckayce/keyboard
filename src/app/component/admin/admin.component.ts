import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/model/products.model';
import { AuthService } from 'src/app/_sevices/auth.service';
import { ProductsService } from 'src/app/_sevices/products.service';
import * as AOS from 'aos';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  products : Product[] = [];
  base64: any
  form!:FormGroup
  urls:string[]=[]
  productClass: Product = new Product();

  isAdd : boolean =false;
  isEdit: boolean = false;
  name:any
  p:number =1

  key:string='id'
  reverse:boolean = false;
  user:any
  constructor(private productsService : ProductsService , private formBuilder : FormBuilder,private auth: AuthService) { }

  ngOnInit(): void {
    this.getAllProduct();
    AOS.init()
    this.form= this.formBuilder.group({
      name:['',[Validators.required]],
      category:['',[Validators.required]],
     
      oldPrice:['',[Validators.required]],
      newPrice:['',[Validators.required]],
      desc:['',[Validators.required]],
      imgs:['',[Validators.required]],
      quantity:['',[Validators.required]],
      sellQuantity:['',[Validators.required]]
    })
    this.auth.auth.user.subscribe(res => {
      this.user =res
    })
  }
  
  getAllProduct(){
    this.productsService.getItem().subscribe(res=>{
      this.products = res
    })
  }
  // getImagePath(event:any){
  //   const file =event.target.files[0];
  //   const render = new FileReader()
  //   render.readAsDataURL(file)
  //   render.onload =()=>{
  //     this.base64 =render.result
  //     this.form.get('imgs')?.setValue(this.base64)
  //     console.log(this.base64)
  //   }

  // }
  
  getMultipleImage(event:any){
    if(event.target.files){
      for(let i=0;i<event.target.files.length;i++){
        var reader = new FileReader()
        reader.readAsDataURL(event.target.files[i])
        reader.onload = (e:any)=>{
          this.urls.push(e.target.result)
          this.form.get('imgs')?.setValue(this.urls)
        }
      }
    }
  }
  addProduct(){
    
    const model = this.form.value
    this.productsService.postItem(model).subscribe(res=>{
     
      alert("Success")
      let cancel = document.getElementById('cancel')
      cancel?.click()
      this.form.reset()
      this.getAllProduct()
    },
    err => {
      alert('Something went wrong')
    })
    console.log(this.form)
  }
  onAdd(){
    this.isAdd=true;
    this.isEdit=false;
  }
  onEdit(product:any){
    this.isAdd=false;
    this.isEdit=true;
    this.productClass.id = product.id
    this.form.controls['name'].setValue(product.name)
    this.form.controls['category'].setValue(product.category)
    
    this.form.controls['oldPrice'].setValue(product.oldPrice)
    this.form.controls['newPrice'].setValue(product.newPrice)
   
    this.form.controls['desc'].setValue(product.desc)
    this.form.controls['imgs'].setValue(product.imgs)
    this.form.controls['quantity'].setValue(product.quantity)
    this.form.controls['sellQuantity'].setValue(product.sellQuantity)
    this.urls=product.imgs
  }
  updateProduct(){
    this.productClass.name = this.form.value.name
    this.productClass.category = this.form.value.category
    this.productClass.quantity = this.form.value.quantity
    this.productClass.oldPrice = this.form.value.oldPrice
    this.productClass.newPrice = this.form.value.newPrice
    this.productClass.desc = this.form.value.desc
    this.productClass.imgs = this.form.value.imgs
    this.productClass.quantity = this.form.value.quantity
    this.productClass.sellQuantity = this.form.value.sellQuantity
    this.productsService.updateItem(this.productClass,this.productClass.id).subscribe(res=>{
      alert("Update Success")
      let cancel = document.getElementById('cancel')
      cancel?.click()
      this.form.reset()
      this.getAllProduct()
    },
    err => {
      alert('Something went wrong')
    })
  }
  deleteImg(){
   this.urls.splice(0,this.urls.length)
  } 
  removeProduct(product:Product){
    this.productsService.deleteItem(product.id).subscribe(res=>{
      alert('Product Delete')
      this.getAllProduct()
    })
  }
  search() {
    console.log(this.name)
    if (this.name == '') {
      this.ngOnInit()
    } else {
      this.products = this.products.filter((res: any) => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }
  sort(key: any) {
    this.key = key
    this.reverse = !this.reverse

  }
}
