import React from 'react';
import Layout from "../components/layout/layout";
import ProductComponent from "../components/product";
import {Product} from "../types/product.type";

const products: Product[] = [
  {
    "id": 1,
    "name": "Exforge 10mg",
    "prices": [
      {
        "id": 1,
        "price": 10.99,
        "date": "2019-01-01T17:16:32+00:00"
      },
      {
        "id": 2,
        "price": 9.20,
        "date": "2018-11-01T17:16:32+00:00"
      }
    ]
  },
  {
    "id": 2,
    "name": "Exforge 20mg",
    "prices": [
      {
        "id": 3,
        "price": 12.00,
        "date": "2019-01-01T17:16:32+00:00"
      },
      {
        "id": 4,
        "price": 13.20,
        "date": "2018-11-01T17:16:32+00:00"
      }
    ]
  },
  {
    "id": 3,
    "name": "Paracetamol 20MG",
    "prices": [
      {
        "id": 5,
        "price": 5.00,
        "date": "2017-01-01T17:16:32+00:00"
      },
      {
        "id": 6,
        "price": 13.20,
        "date": "2018-11-01T17:16:32+00:00"
      }
    ]
  }
]


const Index = () => {
  return (
    <Layout>
      <div className="grid grid-cols-4 gap-8">
        {
          products.map((product) => <ProductComponent key={product.id} product={product} />)
        }

      </div>
    </Layout>

  );
};

export default Index;