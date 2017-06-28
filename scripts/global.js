// function highlightPage() {
//     var header = document.getElementsByTagName('header');
//     var nav = header[0].getElementsByTagName('nav');
//     var links = nav[0].getElementsByTagName('a');
//     var body = document.getElementsByTagName('body');
//     for (var i = 0; i < links.length; i++) {
//         var linkurl = links[i].getAttribute('href');
//         if (window.location.href.indexOf(linkurl) != -1) {
//             links[i].className = 'here';
//             var linktext = links[i].firstChild.nodeValue.toLowerCase();
//             body[0].setAttribute('id',linktext);
//         }
//     }
// }

function highlightPage() {
    var links = $('header a');
    links.each(function(index) {
        var linkurl = links.eq(index).attr('href');
        if (window.location.href.indexOf(linkurl) != -1) {
            links.eq(index).addClass('here');
        }
    })
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

function insertAfter(newElement,targetElement) {
    var parentElement = targetElement.parentNode;
    if (parentElement.lastChild == targetElement) {
        parentElement.appendChild(newElement);
    } else {
        parentElement.insertBefore(newElement,targetElement.nextSlibing);
    }
}

function preparePlaceholder() {
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id','placeholder');
    placeholder.setAttribute('src','images/placeholder.gif');
    if (!document.getElementById('imagegallery')) {
        return false;
    }
    var imagegallery = document.getElementById('imagegallery');
    insertAfter(placeholder,imagegallery);
    var description = document.createElement('p');
    description.setAttribute('id','description');
    var text = document.createTextNode('Choose an image');
    description.appendChild(text);
    insertAfter(description,placeholder);
}

function showPic(whichpic) {
    var href = whichpic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src',href);
    var text = whichpic.getAttribute('title');
    var description = document.getElementById('description');
    description.firstChild.nodeValue = text;
}

function prepareGallery() {
    if (!document.getElementById('imagegallery')) {
        return false;
    }
    var imagegallery = document.getElementById('imagegallery');
    var links = imagegallery.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function() {
            showPic(this);
            return false;
        }
    }
}

function stripeTables() {
    var tables = document.getElementsByTagName('table');
    for (var i = 0; i < tables.length; i++) {
        var rows = tables[i].getElementsByTagName('tr');
        var odd = false;
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                addClass(rows[j],'odd');
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

function highlightRow() {
    var rows = document.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this,'highlight');
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }
}

window.onload = function() {
    highlightPage();
    slideShow();
    prepareInternalnav();
    preparePlaceholder();
    prepareGallery();
    stripeTables();
    highlightRow();
}
