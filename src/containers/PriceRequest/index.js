import React from "react";

const PriceRequest = (props) => {

  return (
    <div className="main bg-dark">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-12">
            <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
              <form id="msform">
                <ul id="progressbar">
                  <li className="active" id="submit">
                    <strong>
                      Submit<br/>
                      Offer
                    </strong>
                  </li>
                  <li id="confirm">
                    <strong>
                      Confirmation
                    </strong>
                  </li>
                </ul>
                <fieldset>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-left">
                        <div className="fs-info">
                          <h2 className="fs-title">
                            <span style="display: block;text-transform: uppercase;">Make an offer on</span>Domain.com
                          </h2>
                          <p>Please fill-in your personal information to continue the offer.</p>
                        </div>
                        <div className="fill-info job-post">
                          <div className="row">
                            <div className="col-md-12">
                              <h4 className="mb-3" style="color: #f95500;">Customer Information</h4>
                            </div>
                            <div className="col-md-6">
                              <label>First Name</label>
                              <input type="text" name="name" placeholder=""/>
                            </div>
                            <div className="col-md-6">
                              <label>Last Name</label>
                              <input type="text" name="name" placeholder=""/>
                            </div>
                            <div className="col-md-12">
                              <label>Email Address</label>
                              <input type="email" name="email" placeholder=""/>
                            </div>
                            <div className="col-md-12">
                              <label>Confirm email address</label>
                              <input type="email" name="email" placeholder=""/>
                            </div>
                            <div className="col-md-12">
                              <h4 className="mb-3" style="color: #f95500;">Contact Information</h4>
                            </div>
                            <div className="col-md-12">
                              <label>Phone number</label>
                              <input type="text" name="text" placeholder="" style="padding-left: 80px;" />

                                <select name="countries" id="countries" style="width: 300px;">
                                  <option value="ad" data-image="images/msdropdown/icons/blank.gif"
                                          data-imagecss="flag ad" data-title="Andorra">Andorra
                                  </option>
                                  <option value="ae" data-image="images/msdropdown/icons/blank.gif"
                                          data-imagecss="flag ae" data-title="United Arab Emirates">United Arab Emirates
                                  </option>
                                  <option value="af" data-image="images/msdropdown/icons/blank.gif"
                                          data-imagecss="flag af" data-title="Afghanistan">Afghanistan
                                  </option>
                                  <option value="ag" data-image="images/msdropdown/icons/blank.gif"
                                          data-imagecss="flag ag" data-title="Antigua and Barbuda">Antigua and Barbuda
                                  </option>
                                  <option value="ai" data-image="images/msdropdown/icons/blank.gif"
                                          data-imagecss="flag ai" data-title="Anguilla">Anguilla
                                  </option>
                                  <option value="al" data-image="images/msdropdown/icons/blank.gif"
                                          data-imagecss="flag al" data-title="Albania">Albania
                                  </option>
                                  <option value="am" data-image="images/msdropdown/icons/blank.gif"
                                          data-imagecss="flag am" data-title="Armenia">Armenia
                                  </option>
                                  <option value="an" data-image="images/msdropdown/icons/blank.gif"
                                          data-imagecss="flag an" data-title="Netherlands Antilles">Netherlands Antilles
                                  </option>
                                </select>
                            </div>
                            <div className="col-md-12">
                              <label>Company name</label>
                              <input type="text" name="name" placeholder=""/>
                            </div>

                            <div className="col-md-12">
                              <label className="checkbox">
                                I agree to Stud.com Domain Marketplace<a href="">T&Cs</a> any offers you submit are
                                legally binding for seven (7) days.
                                <input type="checkbox" checked="checked"/>
                                <span className="checkmarkd"></span>
                              </label>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                    <div className="col-md-6 text-left">
                      <div className="form-left order-sum">
                        <h3 style="font-family: 'poppins-semibold';font-size: 24px;color: #000;">Order summary</h3>
                        <div className="table-data">
                          <div className="table-r-data">
                            <div className="table-c-data">domain.com</div>
                            <div className="table-c-data"><b>€3,000</b></div>
                          </div>
                          <div className="table-r-data">
                            <div className="table-c-data">Ownership transfer</div>
                            <div className="table-c-data"><a href="#">Free</a></div>
                          </div>
                          <div className="table-r-data">
                            <div className="table-c-data">Transaction support</div>
                            <div className="table-c-data"><a href="#">Free</a></div>
                          </div>
                          <div className="table-r-data table-footer">
                            <div className="table-c-data"><b>Total</b></div>
                            <div className="table-c-data"><b>€3,000</b></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <input type="button" name="previous" className="previous action-button-previous" value="Previous"/>
                  <input type="button" name="next" className="next action-button" value="Submit"/>
                </fieldset>
                <fieldset>
                  <div className="form-card">

                    <h2 className="purple-text text-center"><strong>SUCCESS !</strong></h2> <br />
                    <div className="row justify-content-center">
                      <div className="col-3"><img src="img/right2.png" className="fit-image" /></div>
                    </div>
                    <br /><br />
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

export default PriceRequest()