(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [

        function(require, module, exports) {
            /*
             * classie
             * http://github.amexpub.com/modules/classie
             *
             * Copyright (c) 2013 AmexPub. All rights reserved.
             */

            module.exports = require('./lib/classie');

        }, {
            "./lib/classie": 2
        }
    ],
    2: [

        function(require, module, exports) {
            /*!
             * classie - class helper functions
             * from bonzo https://github.com/ded/bonzo
             *
             * classie.has( elem, 'my-class' ) -> true/false
             * classie.add( elem, 'my-new-class' )
             * classie.remove( elem, 'my-unwanted-class' )
             * classie.toggle( elem, 'my-class' )
             */

            /*jshint browser: true, strict: true, undef: true */
            /*global define: false */
            'use strict';

            // class helper functions from bonzo https://github.com/ded/bonzo

            function classReg(className) {
                return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
            }

            // classList support for class management
            // altho to be fair, the api sucks because it won't accept multiple classes at once
            var hasClass, addClass, removeClass;

            if (typeof document === "object" && 'classList' in document.documentElement) {
                hasClass = function(elem, c) {
                    return elem.classList.contains(c);
                };
                addClass = function(elem, c) {
                    elem.classList.add(c);
                };
                removeClass = function(elem, c) {
                    elem.classList.remove(c);
                };
            } else {
                hasClass = function(elem, c) {
                    return classReg(c).test(elem.className);
                };
                addClass = function(elem, c) {
                    if (!hasClass(elem, c)) {
                        elem.className = elem.className + ' ' + c;
                    }
                };
                removeClass = function(elem, c) {
                    elem.className = elem.className.replace(classReg(c), ' ');
                };
            }

            function toggleClass(elem, c) {
                var fn = hasClass(elem, c) ? removeClass : addClass;
                fn(elem, c);
            }

            var classie = {
                // full names
                hasClass: hasClass,
                addClass: addClass,
                removeClass: removeClass,
                toggleClass: toggleClass,
                // short names
                has: hasClass,
                add: addClass,
                remove: removeClass,
                toggle: toggleClass
            };

            // transport

            if (typeof module === "object" && module && typeof module.exports === "object") {
                // commonjs / browserify
                module.exports = classie;
            } else {
                // AMD
                define(classie);
            }

            // If there is a window object, that at least has a document property,
            // define classie
            if (typeof window === "object" && typeof window.document === "object") {
                window.classie = classie;
            }
        }, {}
    ],
    3: [

        function(require, module, exports) {
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
                    console.log("navarrows[z]", typeof navarrows[z]);
                    navarrows[z].addEventListener('click', resetpage);
                }
                leftPaneContent.addEventListener('click', showpage);
                rightPaneContent.addEventListener('click', showpage);
            });

        }, {
            "classie": 1
        }
    ]
}, {}, [3]);
