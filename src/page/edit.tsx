import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../components/hooks";
import Layout from "../components/layout/layout";
import {Formik} from "formik";
import {Price, Product} from "../types/product.type";
import {updateProduct} from "../redux/reducers";
import {getPrices} from "../components/product";
import {useParams, useNavigate} from "react-router-dom";

const Edit = () => {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.products.products)
  const [product, setProduct] = useState<Product>()
  const [priceUpdate, setPriceUpdate] = useState<boolean>(false)
  const params = useParams<{id: string}>()
  const navigation = useNavigate()

  React.useEffect(() => {
    if(products && products.length > 0){
      // @ts-ignore
      const productFound = products.find((prod) => prod.id.toString() === params.id.toString())
      if(productFound){
        setProduct(productFound)
      }else{
        navigation('/')
      }
    } else {
      navigation('/')
    }
  }, [products])



  return (
    <Layout>
      <div className="lg:w-1/2 w-full mx-auto">
        <Formik
          enableReinitialize
          initialValues={{
            name: product && product.name ? product.name : '',
            price: ''
          }}
          onSubmit={(values, formik) => {
            const id = Date.now();
            if(product){
              const price: Price[] = values.price.toString().trim().length > 0
                ? [...product.prices, {id, price: values.price, date: (new Date()).toISOString()}]
                : product.prices

              const updateProd: Product = {
                id: product.id,
                name: values.name,
                prices: price
              }

              dispatch(updateProduct(updateProd))
              alert('Product updated')
              setPriceUpdate(false)
              formik.resetForm()
            }
          }}>
          {
            (formik) => (
              <form onSubmit={formik.handleSubmit} className="space-y-6 mt-20">
                <div className="w-full">
                  <input
                    data-testid="name"
                    value={formik.values.name}
                    name="name"
                    required
                    placeholder="Product name"
                    type="text"
                    onChange={formik.handleChange}
                    className="w-full py-3 px-4 outline-none rounded border"
                  />

                </div>
                <div className="w-full">
                  {
                    priceUpdate ? (
                      <div className="flex space-x-2 items-center">
                        <input
                          data-testid="price"
                          value={formik.values.price}
                          name={'price'}
                          required
                          onChange={formik.handleChange}
                          placeholder="Price (GH¢)"
                          type="number"
                          className="w-full py-3 px-4 outline-none rounded"
                        />
                        <div
                          onClick={() => {
                            formik.setFieldValue('price', '')
                            setPriceUpdate(false)
                          }}
                          className="text-xs underline cursor-pointer">Cancel</div>
                      </div>

                    ) : (
                      <div className="flex space-x-2 items-center">
                        <input
                          data-testid="price"
                          disabled
                          value={product && product.prices && product.prices.length > 0 ? (getPrices(product.prices)[0]).price : ''}
                          type="number"
                          className="w-full py-3 px-4 outline-none rounded bg-gray-50 border"
                        />
                        <div
                          onClick={() => setPriceUpdate(true)}
                          className="text-xs underline cursor-pointer">Update</div>
                      </div>
                    )
                  }
                </div>

                <button
                  data-testid="submit"
                  type={'submit'}
                  className="w-full bg-blue-500 text-white text-sm font-semibold py-3 rounded">
                  Submit
                </button>
              </form>
            )
          }
        </Formik>

      </div>
    </Layout>
  );
};

export default Edit;