import React from 'react';
import Layout from "../components/layout/layout";
import {Formik} from 'formik'
import {Product} from "../types/product.type";
import {addProduct} from "../redux/reducers";
import {useAppDispatch} from "../components/hooks";

const Create = () => {

  const dispatch = useAppDispatch()

  return (
    <Layout>
      <div className="lg:w-1/2 w-full mx-auto">
        <Formik
          initialValues={{
            name: '',
            price: ''
          }}
          onSubmit={(values, formik) => {
            const id = Date.now();
            const product: Product = {
              id,
              name: values.name,
              prices: [
                {
                  id,
                  price: values.price,
                  date: (new Date()).toISOString()
                }
              ]
            }

            dispatch(addProduct(product))
            formik.resetForm()

            alert('Product added')


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
                    className="w-full py-3 px-4 outline-none rounded"
                  />

                </div>
                <div className="w-full">
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

export default Create;