function highlightPage() {
    var header = document.getElementsByTagName('header');
    var nav = header[0].getElementsByTagName('nav');
    var links = nav[0].getElementsByTagName('a');
    var body = document.getElementsByTagName('body');
    for (var i = 0; i < links.length; i++) {
        var linkurl = links[i].getAttribute('href');
        if (window.location.href.indexOf(linkurl) != -1) {
            links[i].className = 'here';
            var linktext = links[i].firstChild.nodeValue.toLowerCase();
            body[0].setAttribute('id',linktext);
        }
    }
}

function moveImg(elementID,finalx,time) {
    var element = document.getElementById(elementID);
    if (element.movement) {
        clearTimeout(element.movement);
    };
    if (!element.style.left) {
        element.style.left = '0px'
    };
    var xpos = parseInt(element.style.left);
    if (xpos == finalx) {
        return false;
    };
    if (xpos < finalx) {
        xpos = xpos + Math.ceil((finalx-xpos)/10);
    };
    if (xpos > finalx) {
        xpos = xpos - Math.ceil((xpos-finalx)/10);
    };
    element.style.left = xpos + 'px';
    element.movement = setTimeout("moveImg('"+elementID+"',"+finalx+","+time+")",5);
}

function slideShow() {
    if (!document.getElementById('intro')) {
        return false;
    }
    var intro = document.getElementById('intro');
    var links = intro.getElementsByTagName('a');
    links[0].onmouseover = function() {
        moveImg('preview',-150,5);
    };
    links[1].onmouseover = function() {
        moveImg('preview',-300,5);
    };
    links[2].onmouseover = function() {
        moveImg('preview',-450,5);
    };
    links[3].onmouseover = function() {
        moveImg('preview',-600,5);
    }
}

function showSection(id) {
    var sections = document.getElementsByTagName('section');
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute('id') == id) {
            sections[i].style.display = 'block';
        } else {
            sections[i].style.display = 'none';
        }
    }
}

function prepareInternalnav() {
    if (!document.getElementById('about-nav')) {
        return false;
    }
    var nav = document.getElementById('about-nav');
    var links = nav.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute('href').split('#')[1];
        links[i].destination = sectionId;
        links[i].onclick = function() {
            showSection(this.destination);
        }
    }
}

window.onload = function() {
    highlightPage();
    slideShow();
    prepareInternalnav();
}
