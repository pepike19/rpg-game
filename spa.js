let profil = {
    "gomb":document.getElementById("karakter_gomb"),
    "oldal":document.getElementById("profil_oldal")
}

let meccs = {
    "gomb": document.getElementById("meccs_gomb"),
    "oldal": document.getElementById("meccs_oldal")
}

function init(){
    switch_to_profil();
}

function switch_to_tortenet(){
    meccs.oldal.style.display = "block";
    meccs.gomb.style.display = "none";
    profil.oldal.style.display = "none";
    profil.gomb.style.display = "inline";
}
function switch_to_profil(){
    meccs.oldal.style.display = "none";
    meccs.gomb.style.display = "inline";
    profil.oldal.style.display = "block";
    profil.gomb.style.display = "none";
}

init();