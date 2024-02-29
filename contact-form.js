'use strict';

// function to validate and save message data
function submitMessage(event) {
    // prevent page from refreshing if validation fails
    event.preventDefault();

    // declare and initialize variables
    const messageForm = document.getElementById('messageForm').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // ensure all fields are filled
    if (!name || !email || !subject || !message) {
        alert('Please fill out all fields');
        return;
    }

    //check email format; clear incorrect email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        document.getElementById('email').value = '';
        return;
    }

    // if validation is successful, save data in an object
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    }

    // save the form data in local storage
    localStorage.setItem('messageData', JSON.stringify(formData));

    // call clearForm function, alert user that the submission was successful
    clearForm();
    alert('Your message has been sent!');
}

// function to clear all form fields
function clearForm() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
}

// event listener to perform the submitMessage function when submit button is clicked
let submitButton = document.getElementById('submitMessage');
submitButton.addEventListener('click', submitMessage);