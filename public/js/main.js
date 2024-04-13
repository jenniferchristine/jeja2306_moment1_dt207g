"use strict";

document.addEventListener('DOMContentLoaded', function() { // logga leder till startsida
    var logo = document.getElementById('logo');

    logo.addEventListener('click', function() {
        window.location.href = "/";
    });
});