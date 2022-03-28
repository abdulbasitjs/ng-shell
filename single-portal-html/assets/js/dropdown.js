function myFunction() {
    var x = document.getElementById("Demo");
    if (x.className.indexOf("show") == -1) {
    x.className += "show";
    } else { 
    x.className = x.className.replace(" w3-show", "");
    }
}