import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  // url : string = 'http://localhost:3000/products/'

  url : string = 'https://fake-api-by-kie.herokuapp.com/products/' 
  search = new BehaviorSubject<string>("")

  constructor(private http : HttpClient) { }

  getItem(){
    return this.http.get<any>(this.url).pipe(map((res:any)=>{
      return res
    }))
  }
  postItem(data:any){
    return this.http.post<any>(this.url,data).pipe(map((res:any)=>{
      return res
    }))
  }
  updateItem(data : any,id:number){
    return this.http.put<any>(this.url+id, data).pipe(map((res:any)=>{
      return res
    }))
  }
  deleteItem(id:number){
    return this.http.delete<any>(this.url+id).pipe(map((res:any)=>{
      return res
    }))
  }
}
