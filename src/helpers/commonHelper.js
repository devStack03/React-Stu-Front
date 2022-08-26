import { createConfirmation } from 'react-confirm';
import ConfirmModal from "../components/ConfirmModal";

const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = password => {
    const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    return re.test(password)
}

const showConfirmModal = createConfirmation(ConfirmModal);

const confirm = (confirmation, options = {}) => {

    return showConfirmModal({ confirmation, ...options });
};

const containsSpecialChars = (str) => {
    const specialChars = /[`!@#$%^&*()_+\-=[\]{};':"\\|<>/?~]/;
    return specialChars.test(str);
}

export {
    validateEmail,
    validatePassword,
    confirm,
    containsSpecialChars
}
