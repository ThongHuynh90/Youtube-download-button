// ==UserScript==
// @name         Simple YouTube MP3 Button
// @namespace    https://www.youtubeinmp3.com
// @version      1.2.2
// @description  Adds a download button to YouTube videosto download at ssyoutube (savefrom.net)
// @author       Arari
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// ==/UserScript==

function polymerInject(){

    /* Create button */
    var buttonDiv = document.createElement("div");
    buttonDiv.style.width = "100%";
    buttonDiv.id = "parentButton";

    var addButton = document.createElement("button");
    addButton.appendChild(document.createTextNode("Download MP3"));

    if(typeof(document.getElementById("iframeDownloadButton")) != 'undefined' && document.getElementById("iframeDownloadButton") !== null){

        document.getElementById("iframeDownloadButton").remove();

    }

    addButton.style.width = "100%";
    addButton.style.backgroundColor = "#181717";
    addButton.style.color = "white";
    addButton.style.textAlign = "center";
    addButton.style.padding = "10px 0";
    addButton.style.marginTop = "5px";
    addButton.style.fontSize = "14px";
    addButton.style.border = "0";
    addButton.style.cursor = "pointer";
    addButton.style.borderRadius = "2px";
    addButton.style.fontFamily = "Roboto, Arial, sans-serif";

    addButton.onclick = function () {

        //this.remove();

        /* Add large button on click */
        var addIframe = document.createElement("iframe");
        //addIframe.src = '//www.convertmp3.io/widget/button/?color=ba1717&video=' + window.location.href;
        window.open('//www.ssyoutube.com' + window.location.pathname+window.location.search, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
        //addIframe.style.width = "100%";
       // addIframe.style.border = "none";
      //  addIframe.style.height = "60px";
       // addIframe.style.marginTop = "10px";
       // addIframe.style.overflow = "hidden";
      //  addIframe.scrolling = "no";
      //  addIframe.id = "iframeDownloadButton";

       // var targetElement = document.querySelectorAll("[id='meta']");

      //  for(var i = 0; i < targetElement.length; i++){

     //       if(targetElement[i].className.indexOf("ytd-watch") > -1){

         //       targetElement[i].insertBefore(addIframe, targetElement[i].childNodes[0]);

         //   }

       // }

    };

    buttonDiv.appendChild(addButton);

    /* Find and add to target */
    var targetElement = document.querySelectorAll("[id='subscribe-button']");

    for(var i = 0; i < targetElement.length; i++){

        if(targetElement[i].className.indexOf("ytd-video-secondary-info-renderer") > -1){

            targetElement[i].appendChild(buttonDiv);

        }

    }

    /* Fix hidden description bug */
    var descriptionBox = document.querySelectorAll("ytd-video-secondary-info-renderer");
    if(descriptionBox[0].className.indexOf("loading") > -1){

        descriptionBox[0].classList.remove("loading");

    }

}

if(document.getElementById("polymer-app") || document.getElementById("masthead") || window.Polymer){

    setInterval(function(){

        if(window.location.href.indexOf("watch?v=") < 0){

            return false;

        }

        if(document.getElementById("count") && document.getElementById("parentButton") === null){

            polymerInject();


        }

    }, 100);

}

