import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/products.model';
import { AuthService } from 'src/app/_sevices/auth.service';
import { CartService } from 'src/app/_sevices/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  items : Product[] = [];
  total: number = 0;
  user:any
  paymentRequest!: google.payments.api.PaymentDataRequest 
  constructor(private cartService: CartService ,private auth : AuthService) { }
  onLoadPaymentData = (
    event: Event
  ): void => {
    const eventDetail = event as CustomEvent<google.payments.api.PaymentData>;
    console.log('load payment data', eventDetail.detail);
  }

  onPaymentDataAuthorized: google.payments.api.PaymentAuthorizedHandler = (
    paymentData
    ) => {
      console.log('payment authorized', paymentData);
      return {
        transactionState: 'SUCCESS'
      };
    }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  }
  ngOnInit(): void {
    this.cartService.cartItems.subscribe(res=>{
      this.items = res
    })
    this.getTotal(this.items)
    this.paymentRequest = {
      
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: 'CARD',
          parameters: {
            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
            allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD']
          },
          tokenizationSpecification: {
            type: 'PAYMENT_GATEWAY',
            parameters: {
              gateway: 'example',
              gatewayMerchantId: 'exampleGatewayMerchantId'
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: '12345678901234567890',
        merchantName: 'Demo Merchant'
      },
      transactionInfo: {
        totalPriceStatus: 'ESTIMATED',
        totalPriceLabel: 'Total',
        totalPrice: this.total.toFixed(2),
        currencyCode: 'VND',
        countryCode: 'VN'
      },
      callbackIntents: ['PAYMENT_AUTHORIZATION']
    };
    this.auth.auth.user.subscribe(res=>{
      this.user=res
    })
  }
  getTotal(data:Product[]){
    let sum=0
    for(let d of data){
      sum+=d.newPrice*d.sellQuantity
      this.total=sum
    }
  }
}
