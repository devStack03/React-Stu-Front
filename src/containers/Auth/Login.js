import React, { useCallback, useRef, useState } from "react";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { Form, FormControl } from "react-bootstrap";
import "./Auth.css";
import { validateEmail } from "../../helpers/commonHelper";
import { login, socialLogin } from "../../redux/actions/auth";
import { Redirect } from "react-router";
import {
    LoginSocialGoogle,
    LoginSocialFacebook,
} from "reactjs-social-login";
import { Link } from "react-router-dom";
import Google from "../../assets/img/Gmail.png";
import FaceBook from "../../assets/img/Facebook.png";
import "./login.css"

const Login = (props) => {
    const googleRef = useRef(null);
    const facebookRef = useRef(null);

    const onLoginStart = useCallback(() => { }, []);

    const onLogoutFailure = useCallback(() => {
        toastr.error("Error", "Error while logging out");
    }, []);

    const onLogoutSuccess = useCallback(() => {
        toastr.success("Success", "Logged out successfully");
    }, []);

    const [errorText, setErrorText] = useState({
        email: "",
        password: "",
    });
    const [isValid, setIsValid] = useState({
        email: false,
        password: false,
    });

    const handleChangeInput = (e) => {
        if (e.target.value !== "") {
            setErrorText({ ...errorText, [e.target.name]: "" });
            setIsValid({ ...isValid, [e.target.name]: false });
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        let email = e.target.elements.email.value;
        let password = e.target.elements.password.value;

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

        if (password === "") {
            setErrorText({ ...errorText, password: "Password is required" });
            setIsValid({ ...isValid, password: true });
            return;
        }

        props
            .login(email, password)
            .then((res) => {
                toastr.success("Success", "Login");
            })
            .catch((err) => {
                toastr.error("Login Failed!", "Please check your email and password.");
            });
    };
    const handleSocialLogin = (user, type) => {
        props
            .socialLogin(user, type)
            .then((res) => {
                toastr.success("Success", "Login");
            })
            .catch((err) => {
                toastr.error("Login Failed!", "Please check your email and password.");
            });
    };
    // Initialize a boolean state
    // Password toggle handler

    if (props.isAuthenticated) {
        return (
            <Redirect
                to={
                    props?.location?.state?.from
                        ? props?.location?.state?.from
                        : "/my_stable"
                }
            />
        );
    } else {
        return (
            <React.Fragment>
                <div className="frag pb-4">
                    {/* <CommonHeader/> */}
                    <div className="loginWrapper pos-center">
                        <span className="h3">
                            Login:
                        </span>
                        <span className="signUp">
                            <Link
                                to={{
                                    pathname: "/register",
                                    state: {
                                        from: props?.location?.state?.from
                                            ? props?.location?.state?.from
                                            : "/my_stable",
                                    },
                                }}
                            >
                                Join&nbsp;&nbsp;
                            </Link>
                            Create an Account{" "}
                        </span>
                        <form onSubmit={handleLogin}>
                            <div className="form-group email-input">
                                <FormControl
                                    name="email"
                                    type="email"
                                    autoComplete="off"
                                    isInvalid={isValid.email}
                                    placeholder="Your email"
                                    onChange={handleChangeInput}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorText.email}
                                </Form.Control.Feedback>
                            </div>
                            <div className="form-group with-eye-icon pwd-input">
                                <FormControl
                                    name="password"
                                    type={"password"}
                                    autoComplete="off"
                                    placeholder="Password"
                                    isInvalid={isValid.password}
                                    onChange={handleChangeInput}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errorText.password}
                                </Form.Control.Feedback>
                            </div>
                            <br />
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
                            <br />
                            <div className="text-center">
                                <button className="btn conbtn" type="submit">
                                    Login
                                </button>
                                <br />
                                <div className="forgotPassword">
                                    <Link to="/forgot-password">
                                        <span>Reset Your Password by e-mail? </span>
                                    </Link>
                                </div>

                                <div className="form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="rememberMe"
                                    />
                                    <label className="form-check-label remember-me" htmlFor="rememberMe">
                                        Save my name, email, and website in this browser for the next time I comment
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    {/* <Footer /> */}
                </div>
            </React.Fragment>
        );
    }
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
    login: (email, password) => dispatch(login(email, password)),
    socialLogin: (user, type) => dispatch(socialLogin(user, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
