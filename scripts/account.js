// JavaScript source code
// account.js 

// Script Date: 18 sep 2023
// Author : Shirin Nasir

window.addEventListener('load', populatePage);


const formId = "form-profileInfo";
const url = location.href;
const formIdentifier = `${url} ${formId}`;

let form = document.querySelector(`#${formId}`);
let formElements = form.elements;

// var firstName = document.getElementById('inputFirstName');
// var lastName = document.getElementById('inputLastName');
// var email = document.getElementById('inputEmail');
// var phoneNumber = document.getElementById('inputPhone');
// var password = document.getElementById('inputPassword');
// var confPass = document.getElementById('inputConfirmPass');
// var subscription = document.getElementById('gridCheck');


function updateProfile() {
    var newFirstName = document.getElementById('inputFirstName').value;
    var newLastName = document.getElementById('inputLastName').value;
    var newEmail = document.getElementById('inputEmail').value;
    var newPhoneNumber = document.getElementById('inputPhone').value;
    var newPassword = document.getElementById('inputPassword').value;
    var confirmPass = document.getElementById('inputConfirmPass').value;
    var subscribe = document.getElementById('gridCheck').checked;

    var user = {
        newFirstName: newFirstName,
        newLastName: newLastName,
        newEmail: newEmail,
        newPhoneNumber: newPhoneNumber,
        newPassword: newPassword,
        confirmPass: confirmPass,
        subscribe: subscribe
    }



    // if (user['newPassword'] == user['confirmPass'] && user['newPassword'] != '') {
    // }
    if (ValidateEmail(newEmail) && validatePhone()) {
        window.localStorage.setItem('user', JSON.stringify(user));
        populatePage();
    }
}

function retrieveProfile() {

    let userText = window.localStorage.getItem('user');
    let userObj = JSON.parse(userText);
    document.getElementById('fullName').innerHTML = userObj.newFirstName + " " + userObj.newLastName;
    document.getElementById('userEmail').innerHTML = userObj.newEmail;
    document.getElementById('userPhone').innerHTML = formatPhoneNumber(userObj.newPhoneNumber);

}


function populatePage() {
    validatePasswords();
    retrieveProfile();
    retrieveAddresses();


    const profileInputs = document.getElementsByClassName('profileInput');
    let userText = window.localStorage.getItem('user');
    let userObj = JSON.parse(userText);

    userObj = Object.values(userObj); //To Retrieve the properties of the JSON object by index

    for (let counter = 0; counter < profileInputs.length; counter++) {
        // for password and confirm password fields, there is no need to show them in page load
        if (counter === 4 || counter === 5) {
            continue;
        }
        else if (counter === 3) {
            profileInputs[counter].value = formatPhoneNumber(userObj[counter]);
        }
        else {
            profileInputs[counter].value = userObj[counter];
        }
    }

}


function formatPhoneNumber(phoneNo) {
    return phoneNo.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}

function validatePasswords() {

    // var pass1 = document.getElementById('inputPassword');
    // var pass2 = document.getElementById('inputConfirmPass');

    // pass1.onfocus = function () {
    //     document.getElementById("message").style.display = "block";
    // }

    // pass1.onblur = function () {
    //     document.getElementById("message").style.display = "none";
    // }
    var pass1 = document.getElementById('inputPassword');
    var pass2 = document.getElementById('inputConfirmPass');
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");

    pass1.onfocus = function () {
        document.getElementById("message").style.display = "block";
    }

    pass1.onblur = function () {
        document.getElementById("message").style.display = "none";
    }

    var lowerCaseChecked = false;
    var upperCaseChecked = false;
    var numberChecked = false;
    var lengthChecked = false;

    pass1.onkeyup = function () {
        // Validate lowercase letters

        var lowerCaseLetters = /[a-z]/g;
        if (pass1.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
            lowerCaseChecked = true;
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters

        var upperCaseLetters = /[A-Z]/g;
        if (pass1.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
            upperCaseChecked = true;
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers

        var numbers = /[0-9]/g;
        if (pass1.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
            numberChecked = true;
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length

        if (pass1.value.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
            lengthChecked = true;
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
    }

    pass2.onkeyup = function () {
        if (pass1.value == pass2.value) {
            document.getElementById("passMatch").hidden = true;
        }
    }

    if (pass1.value != "") {
        if (letter.classList.contains('valid') && capital.classList.contains('valid') && number.classList.contains('valid') && length.classList.contains('valid')) {
            if (pass1.value !== pass2.value) {
                //alert("Passwords do not match. Try again.")
                document.getElementById("passMatch").hidden = false;
                pass1.style.border = '2px solid red';
                pass2.style.border = '2px solid red';
                pass2.focus();
            }
            else {
                alert("Password has been Successfully changed.")
                pass1.style.removeProperty('border');
                pass2.style.removeProperty('border');
                pass1.value = "";
                pass2.value = "";
            }
        }
        else {
            if (letter.classList.contains('invalid')) {
                alert('Your password must contain at least one lowercase letter.');
                pass1.focus();
            } else if (capital.classList.contains('invalid')) {
                alert('Your password must contain at least one capital letter.');
                pass1.focus();
            } else if (number.classList.contains('invalid')) {
                alert('Your password must contain at least one number.');
                pass1.focus();
            } else if (length.classList.contains('invalid')) {
                alert('Your password must contain at least 8 characters.');
                pass1.focus();
            }
        }
    }
}


function addAddressToLocalStorage() {

    var existingAdresses = JSON.parse(localStorage.getItem('addresses'));
    if (existingAdresses == null) {
        existingAdresses = [];
    }

    var addresses = [];
    var unitNumber = document.getElementById('unitNumber').value;
    var streetNumber = document.getElementById('streetNumber').value;
    var streetName = document.getElementById('streetName').value;
    var city = document.getElementById('city').value;
    var province = document.getElementById('province').value;
    var country = document.getElementById('country').value;
    var postalCode = document.getElementById('postalCode').value;

    addresses = {
        unitNumber: unitNumber,
        streetNumber: streetNumber,
        streetName: streetName,
        city: city,
        province: province,
        country: country,
        postalCode: postalCode
    }

    // validateAddressForm();

    var addressControls = document.getElementsByClassName('address-control');
    for (addressField of addressControls) {
        if (addressField.value == "" || addressField.value == null) {
            alert('All fields are mandatory.')
            var emptyField = true;
            break;
        }
        else {
            emptyField = false;
        }
    }

    if (!emptyField) {
        if (validatePostalcode(postalCode)) {

            localStorage.setItem('addresses', JSON.stringify(addresses));
            existingAdresses.push(addresses);
            localStorage.setItem('addresses', JSON.stringify(existingAdresses));
            var newAddresses = JSON.parse(localStorage.getItem('addresses'));
            addAddressToTable(newAddresses[newAddresses.length - 1]);
        }
        else {
            alert('Postal code is not valid, try again!');
            document.getElementById("postalCode").focus();
        }
    }
}

// if (validatePostalcode(postalCode)) {

//     localStorage.setItem('addresses', JSON.stringify(addresses));
//     existingAdresses.push(addresses);
//     localStorage.setItem('addresses', JSON.stringify(existingAdresses));
//     var newAddresses = JSON.parse(localStorage.getItem('addresses'));
//     addAddressToTable(newAddresses[newAddresses.length - 1]);
// }
// else {
//     alert('Postal code is not valid, try again!')
// }



// function validateAddressForm() {
//     for (addressField of addressControls) {
//         if (addressField.value == "" || addressField.value == null) {
//             alert('All fields are mandatory.')
//             break;
//         }
//     }
// }

function validatePostalcode(postalCode) {
    const postalCodeRegex = new RegExp(/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i);

    return postalCodeRegex.test(postalCode);
}

function retrieveAddresses() {

    let addresses = window.localStorage.getItem('addresses');
    // if (addresses == null) {
    //     addresses = [];
    // }
    let addressesObj = JSON.parse(addresses);

    addressesObj = Object.values(addressesObj);
    // alert(addressesObj[0][0]);

    var addressTable = document.getElementById('addressTable');
    for (let counter = 1; counter <= addressesObj.length; counter++) {
        var row = addressTable.insertRow();
        row.className = 'addressRow';
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        cell1.outerHTML = "<th>" + counter + "</th>";
        cell2.innerHTML = convertAddressToString(addressesObj[counter - 1]);
        cell3.innerHTML = "<td><table><tr><td><a href='#' data-bs-toggle='modal' onclick='editAddress();' data-bs-target='#addressModal' data-bs-whatever='@mdo' title='Edit' class='editAddress'><i class='bi  bi-pencil-square'></i></a></td><td><a href='#' title='Remove' class='removeAddress'><i class='bi bi-trash3'></i></a></td></tr></table></td>";
    }

}

function convertAddressToString(address) {
    stringAddress = "";
    stringAddress = address['unitNumber'] + '- ' + address['streetNumber'] + ' ' + address['streetName'] + ', ' + address['city'] + ', ' + address['province'] + ', ' + address['country'] + ', ' + address['postalCode'];
    return stringAddress;
}

function addAddressToTable(address) {
    var tableAddresses = document.getElementsByClassName('addressRow');
    var tablerows = tableAddresses.length;

    var addressTable = document.getElementById('addressTable');

    var row = addressTable.insertRow();
    row.className = 'addressRow';
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.outerHTML = "<th>" + tablerows + "</th>";
    cell2.innerHTML = convertAddressToString(address);
    cell3.innerHTML = "<td><table><tr><td><a href='#' title='Edit' class='editAddress'><i class='bi  bi-pencil-square'></i></a></td><td><a href='#' title='Remove' class='removeAddress'><i class='bi bi-trash3'></i></a></td></tr></table></td>";
    tablerows++;


    // addAddressToLocalStorage();
    // retrieveAddresses();
}

function editAddress() {
    var name = document.getElementById('address-cell').innerHTML;
    document.getElementById("unitNumber").value = name;
}

function removeAddress() {

}

// $("#editAddress").click(function () {
//     alert('hi');
//     var name = $(".address-cell").innerHTML;
//     var str = "You Have Entered " 
//         + "Name: ";
//     $("#unitNumber").html(str);
// });


$(() => {
    $('#removeAddress').mousedown(function () {
        $('#removeAddress').show();
    });
});


function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        document.getElementById('emailError').classList.add('hidden');
        document.getElementById('inputEmail').style.removeProperty('border');
        return true;
    } else {
        document.getElementById('emailError').classList.remove('hidden');
        document.getElementById('inputEmail').focus();
        document.getElementById('inputEmail').style.border = "2px solid red";
        return false;
    }
}

function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    return re.test(input_str);
}

function validatePhone() {
    var phone = document.getElementById('inputPhone').value;
    if (!validatePhoneNumber(phone)) {

        document.getElementById('phoneError').classList.remove('hidden');
        document.getElementById('inputPhone').focus();
        document.getElementById('inputPhone').style.border = "2px solid red";
        return false;
    } else {

        document.getElementById('phoneError').classList.add('hidden');
        document.getElementById('inputPhone').style.removeProperty('border');
        return true;
    }
}

