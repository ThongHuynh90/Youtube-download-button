// ==UserScript==
// @name TopAndDownButtonsEverywhere
// @description Top and Down buttons everywhere (no Jquery) 
// @version 1.6
// @author Max Max
// @license MIT
// @include *
// @icon http://pics.smotri.com/cskins/blue/smiles/bt.gif
// @run-at document-end
// @grant none
// ==/UserScript==

// [1] skip all iframe 
if (window.self!=window.top) {return}

// create element
function ce(n) { return document.createElement(n); } // end of function

// add style
function addStyle(css) {
    var head = document.head || document.getElementsByTagName('head')[0];
    if (head) {
        var style = ce("style");
        style.type = "text/css";
        style.appendChild(document.createTextNode(css));
        head.appendChild(style);
    } // end if
} // end of function

// global variables
var position, 
// figure out if this is moz || IE because they use documentElement
el = (navigator.userAgent.indexOf('Firefox') != -1 || navigator.userAgent.indexOf('MSIE') != -1) ? document.documentElement : document.body,
// timer
t1, t2,
// speed by
speed_by_click = 500, // edit this value
speed_by_over = 100,  // edit this value
// z-index
zIindex = 1001;       // edit this value


// go back
function move_back() { 
   window.history.back();
} // end of function

// go forward
function move_fw() { 
   window.history.forward();
} // end of function


// move up
function move_up() { 
    position = document.documentElement.scrollTop || document.body.scrollTop;
    window.scrollTo(0, position-40);
    t1 = setTimeout(move_up, speed_by_over);
} // end of function

// move up
function move_top() { 
    position = document.documentElement.scrollTop || document.body.scrollTop;
    window.scrollTo(0,0);
//    setTimeout(move_top, 10);
} // end of function

function move_down() { 
    position = document.documentElement.scrollTop || document.body.scrollTop;
 //   window.scrollTo(0,position+getDocumentHeight());
     window.scrollTo(0,getDocumentHeight());
//    setTimeout(move_top, 10);
} // end 

// move downn
function move_dn() { 
    position = document.documentElement.scrollTop || document.body.scrollTop;
    window.scrollTo(0, position+40);
    t2 = setTimeout(move_dn, speed_by_over);
} // end of function

// document height
function getDocumentHeight() {
	return (document.body.scrollHeight > document.body.offsetHeight)?document.body.scrollHeight:document.body.offsetHeight;
} // end of function

// document scroll
function get_scroll(a) {
    var d = document,
        b = d.body,
        e = d.documentElement,
        c = "client" + a,
        a = "scroll" + a;
    return /CSS/.test(d.compatMode)? (e[c]< e[a]) : (b[c]< b[a])
} // end of function

// calk
function scrollTo(element, to, duration) {
    var start = element.scrollTop,
        change = to - start,
        currentTime = 0,
        increment = 20,
        newDuration = (typeof(duration) === 'undefined') ? 500: duration;
		
    var animateScroll = function(){        
        currentTime += increment;
        var val = Math.easeInOutQuad(currentTime, start, change, newDuration);                        
        element.scrollTop = val; 
        if(currentTime < newDuration) { setTimeout(animateScroll, increment); }
    };
    animateScroll();
} // end of function

//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

// add css
function shareCSS(){ 
    // variables
    var s='', img_up, img_dn; 
	
	// img vs button
    img_up = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=';
	img_dn = 'data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==';
    // button id
    s+='#play_btn_up { position:fixed; right:45%; top:100%;z-index:'+zIindex+'; height:20px; width:50px; cursor:pointer; background:url('+img_up+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
    s+='#play_btn_dn { position:fixed; right:50%; top:100%;   z-index:'+zIindex+'; height:20px; width:50px; cursor:pointer; background:url('+img_dn+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
     s+='#play_btn_bk { position:fixed; left:0%; top:50%;   z-index:'+zIindex+'; height:100px; width:10px; cursor:pointer; background:url('+img_dn+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
     s+='#play_btn_fw { position:fixed; right:0%; top:50%;   z-index:'+zIindex+'; height:100px; width:10px; cursor:pointer; background:url('+img_dn+') no-repeat scroll 50% 50% rgba(0, 0, 0, 0.7); border-radius:5px 0 0 5px; margin-top:-24px; }'; 
   
  // button class
    s+='.play_btn { -webkit-transition-duration:0.5s linear; -o-transition-duration:0.5s linear; -moz-transition-duration:0.5s linear; transition-duration:0.5s linear; opacity:0.65; }'; 
    s+='.play_btn:hover { opacity:1; }'; 
	// append
    addStyle(''+s);
} // end of function

// main
function create_btn_element() { 
    // get scroll
	var up, dn, bk,fw,
	    scrolled,
	    h = get_scroll('Height');
    // exit
    if(!h) { return; } // end if
	
	// add css
	shareCSS(); 

	// if 
	if(el){ 
		// create DOM element
		up = ce('span');
		dn = ce('span');
    bk = ce('span');fw = ce('span');
		// set attribute
		up.setAttribute('id','play_btn_up');
		dn.setAttribute('id','play_btn_dn');
		bk.setAttribute('id','play_btn_bk');
    fw.setAttribute('id','play_btn_fw');
		// set class
		up.className = "play_btn";
		dn.className = "play_btn";
    bk.className = "play_btn";
    fw.className = "play_btn";
        // append element
		document.body.appendChild(up);
		document.body.appendChild(dn);
    document.body.appendChild(bk);
    document.body.appendChild(fw);
		
		// scroll
		scrolled = window.pageYOffset || document.documentElement.scrollTop;
		// if scroll 
		up.style.display = (scrolled > 0)  ? "" : "none";
		bk.style.display = "";
    fw.style.display = "";
    
		// add event over
		up.addEventListener('mouseover', move_up, false);
		dn.addEventListener('mouseover', move_dn, false);
		// add event out
		up.addEventListener('mouseout', function(){clearTimeout(t1);},false);
		dn.addEventListener('mouseout', function(){clearTimeout(t2);},false);
		// add event click
		up.addEventListener('click', move_top, false);
	//	dn.addEventListener('click', function(){ scrollTo(el, getDocumentHeight(), speed_by_click); }, false);
		dn.addEventListener('click',move_down, false);
    
    bk.addEventListener('click',move_back, false);
    fw.addEventListener('click',move_fw, false);
		// add event scroll
		window.onscroll = function() { 
		    var scrolled = window.pageYOffset || document.documentElement.scrollTop, diffHeight = document.body.scrollHeight - window.innerHeight;
			// if scroll up
			up.style.display = (scrolled > 0)  ? "" : "none";
			// if scroll dn
			dn.style.display = (diffHeight > scrolled)  ? "" : "none";
		}; // end of function
	} // end if
} // end of function

// run it
create_btn_element();
