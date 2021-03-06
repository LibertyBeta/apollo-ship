import { Component, Input } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Apollo } from 'angular2-apollo';

import { client } from '../apollo-client-init';
import { ProductShortQuery } from './product-short.interface';
// import { productInfoFragment } from '../shared/fragments';

import gql from 'graphql-tag';

@Component({
    selector: 'product-short',
    template: `
    <div *ngIf="data.product">
      <td><a [routerLink]="['/products', sku]">{{ data.product.name }}</a></td>
      <td>{{ sku }}</td>
      <td>{{ data.product.costToManufacture / 100 | currency: 'USD' : 'true' }}</td>
      <td>{{ data.product.retailPrice / 100 | currency: 'USD' : 'true' }}</td>
      <td>{{ data.product.quantity }}</td>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@Apollo({
  client,
  queries: (component: ProductShortComponent) => ({
    data: {
      query: gql`
        query getProduct($sku: String!) {
          product (sku: $sku) {
            #...productInfo
            name
            costToManufacture
            retailPrice
          }
        }
      `,
      variables: {
        sku: component.sku
      },
      //fragments: productInfoFragment
    }
  })
})
export class ProductShortComponent {
  @Input() sku: string;

  data: ProductShortQuery;
}
