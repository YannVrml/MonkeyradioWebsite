const devlog = new bootstrap.Modal(document.querySelector(".devLogger"));
const devlogz = new bootstrap.Modal(document.querySelector(".Logger"));
if(window.location.hostname=="www.dev.monkeyradio.fr"){
window.onerror = function(message, url, lineNumber) {  
    document.querySelector(".devloggerdiv").innerHTML="<h6>Erreur JS "+url+" Ligne "+lineNumber+"</h6><br/><p>"+message+"</p>";
    devlog.toggle();
    return true;
  };  

}

function log(a){
    document.querySelector(".devlogdiv").innerHTML="<h6>Log JS</h6><br/><p>"+a+"</p>";
    devlog.toggle();
}