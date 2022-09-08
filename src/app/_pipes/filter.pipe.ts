import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/products.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value :Product[],filterString : string,propName:string): any[] {
    const re :Product[] =[]


    if(!value || filterString === '' || propName === ''){
      return value
    }
    
    value.forEach((a:any)=>{
      if(a[propName]?.trim().toLowerCase().includes(filterString.toLowerCase())){
       
       
        re.push(a)
      }
    })
    return re
  }

}
