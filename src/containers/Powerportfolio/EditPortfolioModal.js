import React, { useState } from "react";
import { toastr } from "react-redux-toastr";
import { Modal, Form, FormControl, FormLabel, Col } from "react-bootstrap";
import { BusinessStatus, TradeOptions, API_URL } from "../../variables/variables";
import Select from "react-select";
import ApiHelper from "../../helpers/apiHelper";

const EditPortfolioModal = (props) => {
  const domain = props.domain;
  const [businessStatus, setBusinessStatus] = useState({
    label: domain.business_status,
    value: domain.business_status
  }); 

  const [canStartupBreeders, setStartupBreedersOption] = useState({
    label: domain.startup_breeders_switch,
    value: domain.startup_breeders_switch
  });

  const [canTradeOption, setCanTradeOption] = useState({
    label: domain.trade_switch,
    value: domain.trade_switch
  });

  const [tradeOption, setTradeOption] = useState({
    label: domain.trade_option,
    value: domain.trade_option
  });

  const [startupBreeders, setStartupBreeders] = useState({
    label: domain.startup_breeders,
    value: domain.startup_breeders
  });


  const [errorText, setErrorText] = useState({
    domainName: '',
    businessStatus: '',
    price: '',
    minOffer: '',
    startupBreeders: '',
    tradeOption: ''
  });
  const [domainValues, setDomainValues] = useState({
    domainName: domain.domain_name,
    price: domain.seller_price,
    minOffer: domain.min_offer,
    startupBreeders: domain.startup_breeders
  });
  const [isValid, setIsValid] = useState({
    domainName: false,
    businessStatus: false,
    price: false,
    minOffer: false,
    startupBreeders: false,
    tradeOption: false
  })

  const handleChangeInput = e => {
    if (e.target.value !== '') {
      setErrorText({ ...errorText, [e.target.name]: '' });
      setIsValid({ ...isValid, [e.target.name]: false });
    }
    setDomainValues({ ...domainValues, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    let errors = errorText;
    let validForm = true;

    if (domainValues.domainName === '') {
      errors.domainName = 'Please enter domain name is required.';
      validForm = false;
    }

    if (isNaN(parseFloat(domainValues.price))) {
      errors.price = 'Please enter price.';
      validForm = false;
    }

    if (isNaN(parseFloat(domainValues.minOffer))) {
      errors.minOffer = 'Please enter min offer.';
      validForm = false;
    }

    if (canTradeOption.value === 'Yes' && (tradeOption.value === undefined || tradeOption.value === '')) {
      errors.tradeOption = 'Trade option is required.';
      validForm = false;
    }

    if (canStartupBreeders.value === 'Yes' && (startupBreeders.value === undefined || startupBreeders.value === '')) {
      errors.startupBreeders = 'Startup Breeder is required.';
      validForm = false;
    }



    if (validForm === true) {
      ApiHelper.put(`${API_URL}/api/domains/${domain.id}/`, {
        domain_name: domainValues.domainName,
        seller_price: domainValues.price,
        min_offer: domainValues.minOffer,
        startup_breeders: startupBreeders.value,
        business_status: businessStatus.value,
        trade_option: tradeOption.value,
        startup_breeders_switch: canStartupBreeders.value,
        trade_switch: canTradeOption.value
      }).then(res => {
        toastr.success('Success!', 'Your domain was successfully updated.');
        props.onSubmit(res.data);
      }).catch(err => {
        toastr.error('Failed!', 'Please try again.');
      })
    }
  }

  return (
    <Modal
      show={props.show} onHide={props.onHide} size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Domain</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row marginBottom-10">
            <FormLabel className="col-md-3">Domain Name<span className="star">*</span></FormLabel>
            <Col md={9}>
              {domainValues.domainName}
            </Col>
          </div>
          <div className="row marginBottom-10">
            <FormLabel className="col-md-3">Business Status<span className="star">*</span></FormLabel>
            <Col md={9}>
              <Select
                options={BusinessStatus}
                value={businessStatus}
                onChange={value => setBusinessStatus(value)}
                placeholder="Select a business status..."
              />
            </Col>
          </div>
          <div className="row marginBottom-10">
            <FormLabel className="col-md-3">Price<span className="star">*</span></FormLabel>
            <Col md={9}>
              <FormControl placeholder="Domain price" type="text" name="price" value={domainValues.price}
                onChange={handleChangeInput} isInvalid={isValid.price}
              />
              <div className="errorMessage">{errorText.price}</div>
            </Col>
          </div>
          <div className="row marginBottom-10">
            <FormLabel className="col-md-3">Min Offer<span className="star">*</span></FormLabel>
            <Col md={9}>
              <FormControl
                placeholder="Min offer"
                type="text"
                name="minOffer"
                value={domainValues.minOffer}
                onChange={handleChangeInput} isInvalid={isValid.minOffer}
              />
              <div className="errorMessage">{errorText.minOffer}</div>
            </Col>
          </div>
          <div className="row marginBottom-10">
            <FormLabel className="col-md-3">Trade Option </FormLabel>
            <Col md={9}>
              <Select
                options={[{
                  label: 'Yes',
                  value: 'Yes'
                },
                {
                  label: 'No',
                  value: 'No'
                }]}
                value={canTradeOption}
                onChange={value => setCanTradeOption(value)}
                placeholder="Select a trade option..."
              />
            </Col>
          </div>
          {canTradeOption.value === 'Yes' ? <div className="row marginBottom-10">
            <FormLabel className="col-md-3">Trade Option<span className="star">*</span></FormLabel>
            <Col md={9}>
              <Select
                options={TradeOptions}
                value={tradeOption}
                onChange={value => setTradeOption(value)}
                placeholder="Select a trade option..."
              />
            </Col>
            <div className="errorMessage">{errorText.tradeOption}</div>
          </div> : <React.Fragment></React.Fragment>}

          <div className="row marginBottom-10">
            <FormLabel className="col-md-3">Startup Breeders Option </FormLabel>
            <Col md={9}>
              <Select
                options={[{
                  label: 'Yes',
                  value: 'Yes'
                },
                {
                  label: 'No',
                  value: 'No'
                }]}
                value={canStartupBreeders}
                onChange={value => setStartupBreedersOption(value)}
                placeholder="Select a trade option..."
              />
            </Col>
            <Form.Control.Feedback type="invalid">{errorText.startupBreeders}</Form.Control.Feedback>
          </div>
          {canStartupBreeders.value === 'Yes' ?
            <div className="row marginBottom-10">
              <FormLabel className="col-md-3">Startup Breeders<span className="star">*</span></FormLabel>
              <Col md={9}>
                <Select
                  options={[{
                    label: 'Pitch to Us',
                    value: 'Pitch to Us'
                  }]}
                  value={startupBreeders}
                  onChange={value => setStartupBreeders(value)}
                  placeholder="Select a startup Breeders..."
                />
                <div className="errorMessage">{errorText.startupBreeders}</div>
              </Col>
            </div>
            : <React.Fragment></React.Fragment>}

        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn" onClick={props.onHide}>Cancel</button>
        <button className="btn btn-cta" onClick={handleSave} >Save</button>
      </Modal.Footer>
    </Modal>
  )
}
export default EditPortfolioModal;
