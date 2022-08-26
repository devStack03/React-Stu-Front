import React, { useState, useMemo, useRef, useCallback } from 'react';
import { useHistory } from "react-router";
import { Form, FormControl } from "react-bootstrap";
import { toastr } from "react-redux-toastr";
import Select from "react-select";
import countryList from "react-select-country-list";
import './Auth.css'
import { validateEmail } from "../../helpers/commonHelper";
import { RoleOptions } from "../../variables/variables";
import { connect } from 'react-redux';
import { signup } from '../../redux/actions/auth';
import {
  LoginSocialGoogle,
  LoginSocialFacebook,
} from "reactjs-social-login";
import { Link } from 'react-router-dom';
import Google from "../../assets/img/Gmail.png";
import FaceBook from "../../assets/img/Facebook.png";

function Register(props) {
  const [signupType, setSignupType] = useState('custom');
  const [errorText, setErrorText] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPwd: ''
  })
  const [isValid, setIsValid] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPwd: false
  })
  const signupFormRef = useRef(null);
  const setProvider = useState("");
  const setProfile = useState();
  const googleRef = useRef(null);
  const facebookRef = useRef(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutFailure = useCallback(() => {
    alert("logout fail");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, [setProfile, setProvider]);

  const history = useHistory();
  const [userRole, setUserRole] = useState('');
  const [country, setCountry] = useState('');
  const [userSocialToken, setUserSocialToken] = useState('');
  const [userSocialtype, setUserSocialType] = useState('');

  const countryOptions = useMemo(() => countryList().getData(), [])

  const handleUserRole = value => {
    setUserRole(value);
  }

  const handleCountry = value => {
    setCountry(value);
  }

  const handleChangeInput = e => {
    const { name, value } = e.target;
    if (name === 'firstName') {
      setFirstName(value);
    }
    if (name === 'lastName') {
      setLastName(value);
    }
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'confirmPwd') {
      setConfirmPwd(value);
    }

    if (e.target.value !== '') {
      setErrorText({ ...errorText, [e.target.name]: '' });
      setIsValid({ ...isValid, [e.target.name]: false });
    }
  };

  const handleRegister = e => {
    e.preventDefault();

    if (firstName === '') {
      setErrorText({ ...errorText, firstName: 'First Name is required' });
      setIsValid({ ...isValid, firstName: true });
      return;
    }

    if (lastName === '') {
      setErrorText({ ...errorText, lastName: 'Last Name is required' });
      setIsValid({ ...isValid, lastName: true });
      return;
    }

    if (email === '') {
      setErrorText({ ...errorText, email: 'Email is required' });
      setIsValid({ ...isValid, email: true });
      return;
    }

    if (!validateEmail(email)) {
      setErrorText({ ...errorText, email: 'Email is invalid' });
      setIsValid({ ...isValid, email: true });
      return;
    }

    if (password === '' && signupType !== 'social') {
      setErrorText({ ...errorText, password: 'Password is required' });
      setIsValid({ ...isValid, password: true });
      return;
    }

    if (confirmPwd === '' && signupType !== 'social') {
      setErrorText({ ...errorText, confirmPwd: 'Confirm password is required.' });
      setIsValid({ ...isValid, confirmPwd: true });
      return;
    }

    if (password !== confirmPwd) {
      setErrorText({ ...errorText, confirmPwd: 'Confirm password does not match.' });
      setIsValid({ ...isValid, confirmPwd: true });
      return;
    }
    if (signupType === 'social') {
      props.register({
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "user_role": userRole.value,
        "country": country.value,
        "authentication_type": 2,
        "authentication_label": userSocialtype,
        "authentication_token": userSocialToken
      }).then(res => {
        history.push(props?.location?.state?.from ? props?.location?.state?.from : "/my_stable")
      }).catch(err => {
        toastr.error('Failed!', 'Server Error')
      })

    } else {
      props.register({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        user_role: userRole.value,
        country: country.value
      }).then(res => {
        history.push(props?.location?.state?.from ? props?.location?.state?.from : "/my_stable")
      }).catch(err => {
        toastr.error('Failed!', 'Server Error')
      })
    }

  }
  const handleSocialLogin = (user, type) => {
    if (type === 'google') {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setSignupType('social');
      setUserSocialToken(user.id_token)
      setUserSocialType(2)
    }
    if (type === 'facebook') {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setEmail(user.email);
      setSignupType('social');
      setUserSocialToken(user.accessToken)
      setUserSocialType(3)
    }
  }

  return (
    <React.Fragment>
      <div className="frag pb-4">
        <div className='loginWrapper'>
          <span className="h3">SIGNUP</span>
          <form ref={signupFormRef} onSubmit={handleRegister}>
            <div className="row">
              <div className='twoInput'>
                <div className="form-group">
                  <label>First Name</label>
                  <FormControl placeholder="First Name" value={firstName} name="firstName" type="text" autoComplete="off"
                    isInvalid={isValid.firstName}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">{errorText.firstName}</Form.Control.Feedback>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <FormControl placeholder="Last Name" value={lastName} name="lastName" type="text" autoComplete="off"
                    isInvalid={isValid.lastName}
                    onChange={handleChangeInput}
                  />
                  <Form.Control.Feedback type="invalid">{errorText.lastName}</Form.Control.Feedback>
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <FormControl readOnly={signupType === 'social'} placeholder="Email" name="email" value={email} type="text" autoComplete="off"
                  isInvalid={isValid.email}
                  onChange={handleChangeInput}
                />
                <Form.Control.Feedback type="invalid">{errorText.email}</Form.Control.Feedback>
              </div>
              {signupType !== 'social' && (<>
                <div className='twoInput'>
                  <div className="form-group">
                    <label>Password</label>
                    <FormControl placeholder="Password" value={password} name="password" type="password" autoComplete="off"
                      isInvalid={isValid.password}
                      onChange={handleChangeInput}
                    />
                    <Form.Control.Feedback type="invalid">{errorText.password}</Form.Control.Feedback>
                  </div>
                  <div className="form-group">
                    <label>Confirm Password</label>
                    <FormControl placeholder="Confirm Password" value={confirmPwd} name="confirmPwd" type="password" autoComplete="off"
                      isInvalid={isValid.confirmPwd}
                      onChange={handleChangeInput}
                    />
                    <Form.Control.Feedback type="invalid">{errorText.confirmPwd}</Form.Control.Feedback>
                  </div>
                </div>
              </>)}
              <div className="form-group">
                <label>Select a user role</label>
                <Select
                  options={RoleOptions}
                  value={userRole}
                  onChange={handleUserRole}
                  placeholder="Select a user role"
                />
              </div>
              <div className="form-group">
                <label>Select a country</label>
                <Select
                  options={countryOptions}
                  value={country}
                  onChange={handleCountry}
                  placeholder="Select a country"
                />
              </div>
            </div>
            <div className="socialLogin">
              <LoginSocialGoogle
                ref={googleRef}
                client_id={process.env.REACT_APP_GG_APP_ID || ""}
                onLogoutFailure={onLogoutFailure}
                onLoginStart={onLoginStart}
                onLogoutSuccess={onLogoutSuccess}
                className="google"
                onResolve={({ provider, data }) => {
                  handleSocialLogin(data, "google");
                  console.log(data);
                }}
                onReject={(err) => {
                  console.log(err);
                }}
              >
                {/* <i className="fa fa-google"></i> */}
                <img src={Google} alt="gl" />
              </LoginSocialGoogle>
              <LoginSocialFacebook
                ref={facebookRef}
                appId={process.env.REACT_APP_FB_APP_ID || ""}
                onLoginStart={onLoginStart}
                onLogoutSuccess={onLogoutSuccess}
                className="facebook"
                onResolve={({ provider, data }) => {
                  handleSocialLogin(data, "facebook");

                  console.log(data);
                }}
                onReject={(err) => {
                  console.log(err);
                }}
              >
                {/* <i className="fa fa-facebook-f"></i> */}
                <img src={FaceBook} alt="gl" />
              </LoginSocialFacebook>
            </div>

            <div className="text-center">
              <button className="btn conbtn" type="submit">Join</button><br />
              <span className="signUp">You already have an account? <Link to={{ pathname: "/login", state: { from: props?.location?.state?.from ? props?.location?.state?.from : "/my_stable" } }}>Login</Link></span>
            </div>

          </form>
        </div>
        {/* <Footer /> */}
      </div>
    </React.Fragment>
  )
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  register: (user) => dispatch(signup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
