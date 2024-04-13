"use strict";

document.addEventListener('DOMContentLoaded', function() {
    var logo = document.getElementById('logo');

    logo.addEventListener('click', function() {
        window.location.href = "/";
    });
});