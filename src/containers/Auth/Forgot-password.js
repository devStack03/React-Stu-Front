import React, {
  useState,
  useRef,
  useEffect,
} from "react";
import { Form, FormControl } from "react-bootstrap";
import { toastr } from "react-redux-toastr";
import Footer from "../Footer/Footer";
import "./Auth.css";
import { validateEmail } from "../../helpers/commonHelper";
import * as variable from "../../variables/variables";
import { connect, useDispatch } from "react-redux";
import { signup } from "../../redux/actions/auth";
import axios from "axios";
import QueryString from "qs";
import { SET_LOADING } from "../../redux/actions/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ForgotPassword = (props) => {
  let query = QueryString.parse(props.location.search, {
    ignoreQueryPrefix: true,
  });

  const [forgotPassMode, setForgotPassMode] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [errorText, setErrorText] = useState({
    email: "",
    password: "",
    confirmPwd: "",
  });
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
    confirmPwd: false,
  });
  const signupFormRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (query.token) {
      setForgotPassMode("setpassword");
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      axios
        .post(`${variable.API_URL}/api/auth/reset-password/validate_token/`, {
          token: query.token,
        })
        .then((res) => {
          if (res.data.status === "OK") {
            setValidToken(true);
          }
          dispatch({
            type: SET_LOADING,
            payload: false,
          });
        })
        .catch((err) => {
          toastr.error(
            "Failed!",
            "Reset Password Token is Invalid or expired!"
          );
          setForgotPassMode("");
          dispatch({
            type: SET_LOADING,
            payload: false,
          });
        });
    }
  }, [dispatch, query.token]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
    if (name === "confirmPwd") {
      setConfirmPwd(value);
    }

    if (e.target.value !== "") {
      setErrorText({ ...errorText, [e.target.name]: "" });
      setIsValid({ ...isValid, [e.target.name]: false });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (forgotPassMode === "setpassword") {
      if (password === "") {
        setErrorText({ ...errorText, password: "Password is required" });
        setIsValid({ ...isValid, password: true });
        return;
      }

      if (confirmPwd === "") {
        setErrorText({
          ...errorText,
          confirmPwd: "Confirm password is required.",
        });
        setIsValid({ ...isValid, confirmPwd: true });
        return;
      }

      if (password !== confirmPwd) {
        setErrorText({
          ...errorText,
          confirmPwd: "Confirm password does not match.",
        });
        setIsValid({ ...isValid, confirmPwd: true });
        return;
      }
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      axios
        .post(variable.API_URL + "/api/auth/reset-password/confirm/", {
          password: password,
          token: query.token,
        })
        .then((res) => {
          dispatch({
            type: SET_LOADING,
            payload: false,
          });
          if (res.data.status === "OK") {
            toastr.success(
              "Your Password has been reset, Please login with your new credentials!"
            );
            props.history.push("/login");
          } else {
            toastr.error("Failed!", "Something Went Wrong!");
          }
        })
        .catch((err) => {
          dispatch({
            type: SET_LOADING,
            payload: false,
          });
          let message =
            err?.response?.data?.password[0] ||
            err?.response?.data?.token[0] ||
            err?.response?.data?.non_field_errors[0];
          toastr.error("Failed!", message || "Server Error");
        });
    } else {
      if (email === "") {
        setErrorText({ ...errorText, email: "Email is required" });
        setIsValid({ ...isValid, email: true });
        return;
      }

      if (!validateEmail(email)) {
        setErrorText({ ...errorText, email: "Email is invalid" });
        setIsValid({ ...isValid, email: true });
        return;
      }

      // if (password === "" && signupType != "social") {
      //   setErrorText({ ...errorText, password: "Password is required" });
      //   setIsValid({ ...isValid, password: true });
      //   return;
      // }

      // if (confirmPwd === "" && signupType != "social") {
      //   setErrorText({
      //     ...errorText,
      //     confirmPwd: "Confirm password is required.",
      //   });
      //   setIsValid({ ...isValid, confirmPwd: true });
      //   return;
      // }

      // if (password !== confirmPwd) {
      //   setErrorText({
      //     ...errorText,
      //     confirmPwd: "Confirm password does not match.",
      //   });
      //   setIsValid({ ...isValid, confirmPwd: true });
      //   return;
      // }
      dispatch({
        type: SET_LOADING,
        payload: true,
      });
      axios
        .post(variable.API_URL + "/api/auth/reset-password/", {
          email: email,
        })
        .then((res) => {
          dispatch({
            type: SET_LOADING,
            payload: false,
          });
          if (res.data.status === "OK") {
            toastr.success(
              "An Email with password reset link is sent to your email address!"
            );
            props.history.push("/login");
          } else {
            toastr.error(res.data.message);
          }
        })
        .catch((err) => {
          dispatch({
            type: SET_LOADING,
            payload: false,
          });
          toastr.error("Failed!", "Server Error");
        });
    }
  };
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <React.Fragment>
      <div className="frag pb-4">
        {/* <CommonHeader/> */}
        <div className="loginWrapper">
          <span className="h3">
            <i className="fa fa-sign-in"></i> Forgot Password
          </span>
          <form ref={signupFormRef} onSubmit={handleRegister}>
            <div className="row">
              {forgotPassMode !== "setpassword" ? (
                <>
                  <div className="form-group">
                    <i className="fa fa-envelope"></i>
                    <label>Email</label>
                    <FormControl
                      placeholder="Email"
                      name="email"
                      value={email}
                      type="text"
                      autoComplete="off"
                      isInvalid={isValid.email}
                      onChange={handleChangeInput}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorText.email}
                    </Form.Control.Feedback>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group with-eye-icon">
                    <i className="fa fa-lock"></i>

                    <label>Password</label>
                    <FontAwesomeIcon
                      onClick={togglePassword}
                      className="eye-icon"
                      icon={passwordShown ? faEye : faEyeSlash}
                    />
                    <FormControl
                      placeholder="Password"
                      value={password}
                      name="password"
                      type={passwordShown ? "text" : "password"}
                      autoComplete="off"
                      readOnly={!validToken}
                      isInvalid={isValid.password}
                      onChange={handleChangeInput}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorText.password}
                    </Form.Control.Feedback>
                  </div>
                  <div className="form-group with-eye-icon">
                    <i className="fa fa-lock"></i>
                    <label>Confirm Password</label>
                    <FontAwesomeIcon
                      onClick={togglePassword}
                      className="eye-icon"
                      icon={passwordShown ? faEye : faEyeSlash}
                    />
                    <FormControl
                      placeholder="Confirm Password"
                      value={confirmPwd}
                      name="confirmPwd"
                      type={passwordShown ? "text" : "password"}
                      readOnly={!validToken}
                      autoComplete="off"
                      isInvalid={isValid.confirmPwd}
                      onChange={handleChangeInput}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errorText.confirmPwd}
                    </Form.Control.Feedback>
                  </div>
                </>
              )}
            </div>
            <div className="text-center mt-4">
              <button className="btn conbtn" type="submit">
                {forgotPassMode !== "setpassword"
                  ? "Send Reset Password Email"
                  : "Reset Password"}
              </button>
              <br />
            </div>
          </form>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  register: (user) => dispatch(signup(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
