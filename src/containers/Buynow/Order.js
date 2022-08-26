/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const Order = () => {

  return (
    <div className="main bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
              <form id="msform">
                <ul id="progressbar">
                  <li className="active" id="billing">
                    <strong>
                      Billing<br/>
                      Information
                    </strong>
                  </li>
                  <li id="order">
                    <strong>
                      Order<br/>
                      Confirmation
                    </strong>
                  </li>
                  <li id="payment"><strong>Payment</strong></li>
                </ul>
                <fieldset>
                  <div className="form-card">
                    <h2 className="purple-text text-center"><strong>SUCCESS !</strong></h2> <br />
                    <div className="row justify-content-center">
                      <div className="col-3"><img src="img/right2.png" className="fit-image" /></div>
                    </div>
                    <br />
                      <div className="row justify-content-center">
                        <div className="col-7 text-center">
                          <h5 className="text-center">You Have Successfully Signed Up</h5>
                        </div>
                      </div>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
