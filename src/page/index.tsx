import React from 'react';
import Layout from "../components/layout/layout";
import ProductComponent from "../components/product";
import {useAppSelector} from "../components/hooks";


const Index = () => {

  const stateProducts = useAppSelector((state) => state.products.products)

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-8">
        {
          stateProducts && stateProducts.length > 0 && stateProducts
            .map((product) => <ProductComponent key={product.id} product={product} />)
        }

      </div>
    </Layout>

  );
};

export default Index;