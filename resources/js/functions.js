import React from 'react';

export function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function validatePassword(password) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters that are letters, numbers or the underscore
    let digit = /(?=.*\d)/g;
    let lowerCase = /(?=.*[a-z])/g;
    let upperCase = /(?=.*[A-Z])/g;
    let special = /(?=.*[\!\"\#\$\%\&\'\(\)\*\+\,\-\.\/\:\;\<\=\>\?\@\[\\\]\^\_\`\{\|\} ])/g;
    let errors = [];
    if(!digit.test(password)) {
        errors.push('co najmniej jedną cyfrę');
    }
    if(!lowerCase.test(password)) {
        errors.push('co najmniej jedną małą literę');
    }
    if(!upperCase.test(password)) {
        errors.push('co najmniej jedną dużą literę');
    }
    if(!special.test(password)) {
        errors.push('co najmniej jeden znak specjalny');
    }
    if(password.length < 8) {
        errors.push('co najmniej 8 znaków');
    }
    console.log(errors);
    return errors;
}

export function validatePhoneNumber(phone) {
    let onlyDigits = phone.replace(/\D/g,'');
    console.log('validatePhoneNumber', onlyDigits);
    return onlyDigits.length >= 9 ? true : false;
}
