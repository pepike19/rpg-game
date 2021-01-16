let stats = {
    "penz": 100,
    "ero": 5,
    "tamadas": 5,
    "vedekezes": 5,
}

let available_points = 0;

let level = 0;

let leveldescription = [
    ["Kezdő vagy,eddz többet!", "0.jpg"],
    ["Egyre jobb, csak így tovább!","1.jpg"],
    ["Ez már majdnem profi szint!","2.jpg"],
    ["Gratulálok, világ válogatott vagy!", "3.jpg"]
];

let profile_stats = {
    "kepek": document.getElementById("kepek"),
    "leiras": document.getElementById("leiras"),
    "penz": document.getElementById("profil_penz"),
    "ero": document.getElementById("profil_ero"),
    "tamadas": document.getElementById("profil_tamadas"),
    "vedekezes": document.getElementById("profil_vedekezes"),
    "kovetkezo_szint": document.getElementById("kovi_szint")
}

function refreshProfileStats(){
    profile_stats.kepek.src = leveldescription[level][1]
    profile_stats.penz.innerHTML = stats.penz;
    profile_stats.ero.innerHTML = stats.ero;
    profile_stats.tamadas.innerHTML = stats.tamadas;
    profile_stats.vedekezes.innerHTML = stats.vedekezes;
    profile_stats.leiras.innerHTML = leveldescription[level][0];
    profile_stats.kovetkezo_szint.innerHTML = 10;
    gombok();
}

refreshProfileStats();

function update_ero(){
    if(available_points > 0){
        available_points--;
        stats.ero += 5;
        refreshProfileStats();
    }
}
function update_tamadas(){
    if(available_points > 0){
        available_points--;
        stats.tamadas += 5;
        refreshProfileStats();
    }
}
function update_vedekezes(){
    if(available_points > 0){
        available_points--;
        stats.vedekezes += 5;
        refreshProfileStats();
    }
}

function gombok(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function kovetkezo_szint(){
    if(level < leveldescription.length - 1){
        available_points += 5;
        level++;
        refreshProfileStats();
    }
}

/* match */

let tortenet = document.getElementById("tortenet");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function nemtom(){
    let szazalek = rnd_szazalek();
    let sebzes_eselye = 50 - stats.ero;

    if(sebzes_eselye <= 0) sebzes_eselye = 1;

    if(szazalek >= sebzes_eselye){
        // story.innerHTML += "Megsebződtél (-1 élet)<br>";
        // stats.life -= 1;
        harc("Másik játékos", 5, 100);
        refreshProfileStats();
    }else{
        tortenet.innerHTML += "Megvan a pénz! (+100)<br>";
        stats.penz += 100;
        refreshProfileStats();
    }
}

function harc(e_nev, e_fajdalom, e_penz){
    tortenet.innerHTML += "Meccs közben rád cselezett egy " + e_nev + "!<br>";

    let counter = 0;
    let enemy_attack = true;

    do {
        counter++;
        if(enemy_attack){
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 - stats.botox;
            if(sebzes_eselye <= 0) sebzes_eselye = 1;

            if(szazalek >= sebzes_eselye){
                tortenet.innerHTML += "Az ellenfél megpróbál levédekezni  (-"+e_fajdalom+" nagyság)<br>";
                stats.tamadas -= e_fajdalom;
                refreshProfileStats();
            }else{
                tortenet.innerHTML += "Ezaz!!Belőtted!!!<br>";
            }
            
        }else{
            let szazalek = rnd_szazalek();
            let sebzes_eselye = 40 + stats.ero;
            if(sebzes_eselye >= 100) sebzes_eselye = 99;
            if(szazalek >= sebzes_eselye){
                tortenet.innerHTML += " ("+e_nev+" -"+stats.penz+" pénz)<br>";
                e_penz -= stats.penz;
                tortenet.innerHTML += e_nev + "-nek maradt " + e_penz;
                refreshProfileStats();
            }else{
                tortenet.innerHTML += "Nem tudtad belőni:(!<br>";
            }
        }

        enemy_attack = !enemy_attack;
        
    } while (counter <=  10);
}