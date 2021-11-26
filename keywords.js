// ==UserScript==
// @name         Show keywords
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.tampermonkey.net/index.php?version=4.8.41&ext=dhdg&updated=true
// @grant        none
// @include      https://www.shutterstock.com/image-photo/*
// @include      https://www.shutterstock.com/image-vector/*
// @include      https://www.shutterstock.com/image-illustration/*
// ==/UserScript==

(function() {
    //'use strict';

    var keywords = function () {
        let keywords = document.querySelector('.C_a_03061');

        let parent = keywords.parentNode;
        let listKeywords = keywords.querySelectorAll('div a');

        let newKeywords = document.createElement("p");

        let newListKeywords = [...listKeywords]
        .map(k => k.innerText);

        newKeywords.innerHTML = `${newListKeywords.length} keywords:<br>${newListKeywords.map(a => `<a href="/search/${a}">${a}</a>`).join(', ')}`;

        var sortedKeywords = [...newListKeywords];
        sortedKeywords.sort();

        var usedKeywords = new Array();

        var i = 0;
        while (newListKeywords[i]) {
            if (sortedKeywords[0] === newListKeywords[i]) {
                if (sortedKeywords[1] === newListKeywords[i+1]) {
                    break;
                }

                sortedKeywords.shift();
            }

            var usedWord = newListKeywords[i];

            var index = sortedKeywords.indexOf(usedWord);
            sortedKeywords.splice(index, 1);

            usedKeywords.push(usedWord);
            i++;
        }

        let usedKeywordsPar = document.createElement("p");
        usedKeywordsPar.innerHTML = `${usedKeywords.length} keywords:<br>${usedKeywords.join(', ')}`;

        parent.appendChild(newKeywords);
        parent.appendChild(usedKeywordsPar);
        parent.removeChild(keywords);
    };

    keywords();

    window.addEventListener("load", function load(event) {
        keywords();
    }, false);

})();