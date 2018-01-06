function handleOnClick(e) {
    var elem = document.getElementById(e);
    var elems = document.getElementsByClassName("nav_class");
    for(var i = 0; i < elems.length; i++) {
        elems[i].classList.remove("active");
    }
    elem.classList.add("active");
}