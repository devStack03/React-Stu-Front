import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ApiHelper from "../../helpers/apiHelper";
import * as variable from "../../variables/variables";
import { toastr } from "react-redux-toastr";

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    let newcart = JSON.parse(localStorage.getItem("cart"));
    if (newcart) {
    setCart(newcart);
    setTotal(newcart.category.reduce((acc, cur) => {
      return acc + cur.sub_total;
    }, 0));
  }
  }, []);
  const submitCart = () => {
    ApiHelper.post(variable.API_URL + "/api/domains/sponsored-headlines/order/", {
      cart_id: cart.id
    }).then((res) => {
      console.log(res);
      localStorage.setItem("cart", null);
      setCart(null);
      setTotal(0);
      toastr.success('Success', 'Order Placed Successfully!', {
        position: 'top-right',
        timeOut: 0,
        closeOnClick: true,
        pauseOnHover: true,
      });

    })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="main bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            {/* <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
              <div className="card-body">
                <h3 className="text-center">Checkout</h3>
                <hr />
                <div className="row">
                  
                </div>
              </div>
            </div> */}
            <h3 className="text-center sponser-heading">Sponsored Headlines</h3>
          </div>
        </div>
        <div class="checkout-outer">
          <div className="row">
            <div className="col-md-12">
              <h3>Checkout</h3>
            </div>
            <div className="col-md-8">
              <div className="checkout-left">
                <table>
                  <tr>
                    <th>ITEMS</th>
                    <th width="100">QTY</th>
                    <th width="100" align="right">
                      PRICE
                    </th>
                    <th width="100" align="right">
                      SUBTOTAL
                    </th>
                  </tr>
                  {cart ? (cart?.category?.map((item, index) => {
                    return (
                      <tr>
                        <td>
                          <h5>{item.name}</h5>
                          <p>
                            {/* <a href="#">Remove</a> | <a href="#">Save for later</a> */}
                          </p>
                        </td>
                        <td>{item.quantity}</td>
                        <td>${parseFloat(item.unit_price).toFixed(2)}</td>
                        <td>${parseFloat(item.sub_total).toFixed(2)}</td>
                      </tr>)
                  })) : (<tr>
                    <td colSpan={4}>
                      There are no items in your cart.
                    </td>

                  </tr>)}

                  {/* <tr>
                    <td align="right" height="100">
                      <div className="checkout-subtotal">Subtotal:</div>
                    </td>
                    <td> <div className="checkout-subtotal-mobile">Subtotal:</div></td>
                    <td>$45.00</td>
                  </tr> */}
                  <tr className="table-last-row">
                    <td colSpan={2} height="100">
                      <Link to="/order-sponsored-headlines">
                        <svg
                          width="15"
                          height="15"
                          stroke-width="1.5"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15 6L9 12L15 18"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg> Continue Shopping
                      </Link>
                      <div class="table-total-right">Total:</div>
                    </td>
                    <td><div class="table-total-mobile">Total:</div></td>
                    <td><div class="total-price">$ {parseFloat(total).toFixed(2)}</div></td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="col-md-4">
              <div className="checkout-right">
                <div className="payment-option">
                  <p>PAYMENT OPTIONS</p>
                  <input type="text" name="buy_now" />
                  {cart && (<button onClick={submitCart} type="submit">Buy now</button>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
