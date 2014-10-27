var degree = 14;
var radius = 150;
var containerWidth = 125;
var anchors;
var i;
var size;
window.onload = function() {
	var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	if (width < 560)
		return;
    document.getElementById('circle').className = 'unrotate';
    document.getElementsByClassName('background')[0].className += ' zoom-out';
    alignLinks();
};

function alignLinks() {
    anchors = document.getElementsByTagName("a");
    size = anchors.length;
    for (i = 0; i < anchors.length; i++) {
        anchors[i].onmouseover = function() {
            mouseOverAnchor(this)
        };
        anchors[i].onmouseout = function() {
            mouseOutOfAnchor(this)
        };
        alignLink(i);
        window.setTimeout(fadeIn, 600 + (i * 70));
    }
    i = 0;
}

function alignLink(i) {
    anchor = anchors[i];
    console.log(i);
    each = Math.round(size / 2);
    var left = false;
    if (i < each) left = true;
    position = i % each;
    position -= 1; // -1 oben, 0 mitte...
    console.log(position);
    var rotate = degree * position;
    marginTop = getMarginTop(rotate);
    if (left) anchor.style.marginLeft = -1 * (radius + containerWidth);
    else anchor.style.marginLeft = radius;
    anchor.style.marginLeft += "px";
    if (left) anchor.style.transformOrigin = "100% 50%";
    else anchor.style.transformOrigin = "0% 50%";
    if (!left) rotate *= -1;
    if (!left) anchor.style.textAlign = "right";
    if (left) {
        anchor.style.borderTopLeftRadius = "5px";
        anchor.style.borderBottomLeftRadius = "5px";
    } else {
        anchor.style.borderTopRightRadius = "5px";
        anchor.style.borderBottomRightRadius = "5px";
        anchor.style.paddingRight = "5px";
    }
    anchor.style.transform = "rotate(" + rotate + "deg)";
    anchor.style.webkitTransform = "rotate(" + rotate + "deg)";
    anchor.style.marginTop = marginTop;
    anchor.style.display = "block";
}

function getMarginTop(degree) {
    //a = c * sin(α) / sin(γ);
    return 0 - (radius * Math.sin(toRadian(degree)) / Math.sin(toRadian(90)));
}

function toRadian(degree) {
    return degree / 360 * 2 * Math.PI;
}

function fadeIn(elem) {
    elem = anchors[i];
    elem.className = "show";
    i++;
}

function mouseOverAnchor(anchor) {
    image = anchor.getElementsByTagName("img")[0];
    var x = image.src.split("/").pop();
    x = x.split(".")[0];
    x += "-light.png";
    image.src = "images/" + x;
    anchor.style.background = "grey";
}

function mouseOutOfAnchor(anchor) {
    image = anchor.getElementsByTagName("img")[0];
    var x = image.src.split("/").pop();
    x = x.split(".")[0];
    x = x.split("-")[0];
    x += ".png";
    image.src = "images/" + x;
    anchor.style.background = "rgba(240,240,2405,0.9)";
}