var username = document.querySelector('#username')
var email = document.querySelector('#email')
var password = document.querySelector('#password')
var confirmPassword = document.querySelector('#confirm-password')
var form = document.querySelector('form')

function showError(input, message){
    let parent = input.parentElement;
    let small = parent.querySelector('small') //lay ra thang cha cua input
    parent.classList.add('err')
    small.innerText = message
}

function showSuccess(input){
    let parent = input.parentElement;
    let small = parent.querySelector('small') //lay ra thang cha cua input
    parent.classList.remove('err')
    small.innerText = ''
}

function checkEmpty(listInput){
    let isEmptyError = false;
    listInput.forEach(input =>{
        input.value = input.value.trim();

        if(!input.value){ //!input.value: neu cai input rong
            isEmptyError = true;
            showError(input, 'Không được để trống')
        }else{
            showSuccess(input)
        }
    });
    return isEmptyError
}

function checkEmailError(input){
    const regexEmail =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    input.value = input.value.trim();

    let isEmailError = !regexEmail.test(input.value)
    if(regexEmail.test(input.value)){
        showSuccess(input)

    }else{
        showError(input, 'Email Không hợp lệ')

    }

    return isEmailError
}

function checkLengthError(input , min, max){
    input.value = input.value.trim();

    if(input.value.length < min){
        showError(input, `Phải có ít nhất ${min} ký tự` )
        return true;
    }

    if(input.value.length > max){
        showError(input, `Không được vượt quá ${min} ký tự` )
        return true;
    }

    
    return false;
}

function checkMatchPasswordError(passwordInput, cfPasswordInput){
    if(passwordInput.value !== cfPasswordInput.value){
        showError(cfPasswordInput, 'Mật khẩu không trùng khớp')
        return true;
    }else{
        return false;
    }
}

form.addEventListener('submit', function(e){
    e.preventDefault() //click vao se khong bi load lai trang nua
    
    let isEmptyError =  checkEmpty([username, email, password, confirmPassword])
    let isEmailError =  checkEmailError(email)
    let isUsernameLengthError = checkLengthError(username, 3, 10)
    let isPasswordLengthError = checkLengthError(password, 3, 10)
    let isPasswordConfirmLengthError = checkLengthError(confirmPassword, 3, 10)
    let isMatchError = checkMatchPasswordError(password, confirmPassword)

    if(isEmptyError || isEmailError || isUsernameLengthError || isPasswordLengthError || isPasswordConfirmLengthError || isMatchError){
        //do nothing if any fault
    }else{
        //logic, call API,....
    }
    
})