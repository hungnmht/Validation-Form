const usernameE1 = document.querySelector('#username');
const emailE1 = document.querySelector('#email');
const passwordE1 = document.querySelector('#password');
const confirmPasswordE1 = document.querySelector('#confirm-password');

const form = document.querySelector('#signup');

const checkUsername = () => {
    let valid = false;

    const min = 3;
        max = 25;

    const username = usernameE1.value.trim();

    if (!isRequired(username)){
        showError(usernameE1, 'Username cannot be blank.');
    } else {
        showSuccess(usernameE1);
        valid = true;
    }
    return valid;
};
const checkEmail = () => {
    let valid = false;
    const email = emailE1.value.trim();
    if(!isRequired(email)){
        showError(emailE1, 'Email cannot be blank.');
    } else if (!isEmailValid(email)){
        showError(emailE1, 'Email is not valid.')
    } else {
        showSuccess(emailE1);
        valid = true;
    }
    return valid;
};
const checkPassword = () => {
    let valid = false;

    const password = passwordE1.value.trim();

    if (!isRequired(password)){
        showError(passwordE1, 'Password cannot be blank.' );
    } else if (!isPasswordSecure(password)){
        showError(passwordE1, 'Password must has at least 8 characters that include at least 1 lowercase' + 'character, 1 uppercase character, 1 number and 1 special character in (!@#$%^&*)');
    } else {
        showSuccess(passwordE1);
        valid = true;
    };
    const checkConfirmPassword = () => {
        let valid = false;
        const confirmPassword = confirmPasswordE1.value.trim();
        const password = passwordE1.value.trim();

        if(!isRequired(confirmPassword)){
            showError(confirmPasswordE1, 'Please enter the password again');
        } else if (password !== confirmPassword){
            showError(confirmPasswordE1, 'THe password does not match');
        } else {
            showSuccess(confirmPasswordE1);
            valid = true;
        }

        return valid;
    };
    const isEmailValid = (email) => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email);
    };

    const isRequired = value => value === '' ? false : true;
    const isBetween = (length, min, max) => length < min || length > max ? false : true;

    const showError = (input, message) => {
        const formField = input.parentElement;
        formField.classList.remove('success');
        formField.classList.add('error');

        const error = formField.querySelector('small');
        error.textContent = message;
    };

    const showSuccess = (input) => {
        const formField = input.parentElement;
        formField.classList.remove('error');
        formField.classList.add('success');

        const error = formField.querySelector('email');
        error.textContent = '';
    }
    form.addEventListener('submit',function (e){
        e.preventDefault();
        let isUsernameValid = checkUsername(),
            isEmailValid = checkEmail(),
            isPasswordValid = checkPassword(),
            isConfirmPasswordValid = checkConfirmPassword();

        let isFormValid = isUsernameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmPasswordValid;

        if (isFormValid){

        }
    });
    const debounce = (fn, delay = 1) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId){
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                fn.apply(null, args)
            }, delay);
        };
    };
    form.addEventListener('input', debounce(function(e){
        switch (e.target.id){
            case 'username':
                checkUsername();
                break;
            case 'email':
                checkEmail();
                break;
            case 'password':
                checkPassword();
                break;
            case 'confirm-password':
                checkConfirmPassword();
                break;
        }
    }));
}