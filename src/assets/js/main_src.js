"use strict";
var classie = require("classie"),
    containerContent,
    leftPaneContent,
    rightPaneContent,
    navarrows;

var showpage = function(e) {
    // console.log(e);
    if (classie.hasClass(e.target, 'left')) {
        classie.removeClass(containerContent, 'show-right-page');
        classie.addClass(containerContent, 'show-left-page');
    } else if (classie.hasClass(e.target, 'right')) {
        classie.removeClass(containerContent, 'show-left-page');
        classie.addClass(containerContent, 'show-right-page');
    }
};

var resetpage = function(e) {
    classie.removeClass(containerContent, 'show-right-page');
    classie.removeClass(containerContent, 'show-left-page');
};

window.addEventListener("load", function(e) {
    leftPaneContent = document.getElementById("leftpagecontent");
    rightPaneContent = document.getElementById("rightpagecontent");
    containerContent = document.getElementById("container");
    navarrows = document.querySelectorAll('.nav-arrow');
    for (var z in navarrows) {
        if (typeof navarrows[z] === 'object') {
            navarrows[z].addEventListener('click', resetpage);
        }
    }
    leftPaneContent.addEventListener('click', showpage);
    rightPaneContent.addEventListener('click', showpage);
});
