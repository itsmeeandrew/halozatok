const képUrl = "https://szoft1.comeback.hu/hajo/";
const kérdés = document.querySelector("#kérdés"),
    válasz1 = document.querySelector("#válasz1"),
    válasz2 = document.querySelector("#válasz2"),
    válasz3 = document.querySelector("#válasz3"),
    kép = document.querySelector("#kérdésKép");

const válaszok = [válasz1, válasz2, válasz3];

const előző = document.querySelector("#előző"),
    következő = document.querySelector("#következő");

let jelenKérdések = []
const jelenKérdésekSzáma = 3
let megjelenítettKérdésSorszám;
let kérdésekSzáma;
let következőKérdésSzáma = 1

//let jelenKérdésSorszám = 1;
let jóválaszSorszám = 0;

let timeoutHandler;

window.onload = () => {
    //kérdésBetöltés(jelenKérdésSorszám);
    init()
}

function init() {
    fetch("questions/count")
        .then(function (res){
            return res.json()
        })
        .then(count => {
            kérdésekSzáma = count
            console.log("Max kérdések: " + kérdésekSzáma)
        })
        .catch(err => {
            console.log(err)
        })

    if (localStorage.getItem("jelenKérdések") !== null) {
        jelenKérdések = JSON.parse(localStorage.getItem("jelenKérdések"))
        megjelenítettKérdésSorszám = localStorage.getItem("megjelenKérdésSzám")
        következőKérdésSzáma = localStorage.getItem("kövKérdésSzám")

        előre()
    } else {
        for (let i = 0; i < jelenKérdésekSzáma; i++) {
            jelenKérdések[i] = {
                question: {},
                goodAnswers: 0
            }
        }
    
        for (let i = 0; i < jelenKérdésekSzáma; i++) {
            kérdésBetöltés(következőKérdésSzáma, i)
            következőKérdésSzáma++
        }
    }
}

function kérdésBetöltés(id, dest) {
    fetch(`questions/${id}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                console.error(`Hibás válasz: ${res.status}`)
                //kérdésBetöltés(1);
            }
        })
        .then(q => {
            jelenKérdések[dest].question = q
            jelenKérdések[dest].goodAnswers = 0
            //kérdésMegjelenítés(data)
            if (megjelenítettKérdésSorszám == undefined && dest == 0) {
                megjelenítettKérdésSorszám = 0
                kérdésMegjelenítés()
            }
        })
}

function kérdésMegjelenítés() {
    let k = jelenKérdések[megjelenítettKérdésSorszám].question
    válasz1.classList.remove("jó-válasz", "rossz-válasz");
    válasz2.classList.remove("jó-válasz", "rossz-válasz");
    válasz3.classList.remove("jó-válasz", "rossz-válasz");

    válasz1.style.pointerEvents = "auto";
    válasz2.style.pointerEvents = "auto";
    válasz3.style.pointerEvents = "auto";

    kérdés.innerText = k.questionText;
    válasz1.innerText = k.answer1;
    válasz2.innerText = k.answer2;
    válasz3.innerText = k.answer3;
    if (k.image != "") {
        kép.style.display = "block"
        kép.src = képUrl + k.image;
    } else {
        kép.style.display = "none"
    }

    jóválaszSorszám = k.correctAnswer;
}

function előre(){
    clearTimeout(timeoutHandler)
    megjelenítettKérdésSorszám++;
    if (megjelenítettKérdésSorszám === jelenKérdésekSzáma) {
        megjelenítettKérdésSorszám = 0
    }

    kérdésMegjelenítés();
}

következő.addEventListener("click", () => {
    előre()
})

előző.addEventListener("click", () => {
    megjelenítettKérdésSorszám--;
    if (megjelenítettKérdésSorszám < 0) {
        megjelenítettKérdésSorszám = jelenKérdésekSzáma-1
    }

    kérdésMegjelenítés();
})

válasz1.addEventListener("click", (e) => SzínezVálasz(e));
válasz2.addEventListener("click", (e) => SzínezVálasz(e));
válasz3.addEventListener("click", (e) => SzínezVálasz(e));


function SzínezVálasz(e) {
    válasz1.style.pointerEvents = "none";
    válasz2.style.pointerEvents = "none";
    válasz3.style.pointerEvents = "none";
    
    if (e.target == válaszok[jóválaszSorszám-1]) {
        e.target.classList.add("jó-válasz");
        jelenKérdések[megjelenítettKérdésSorszám].goodAnswers++

        if (jelenKérdések[megjelenítettKérdésSorszám].goodAnswers === 3) {
            kérdésBetöltés(következőKérdésSzáma, megjelenítettKérdésSorszám)
            if (következőKérdésSzáma + 1 < kérdésekSzáma) {
                következőKérdésSzáma++
            }
        }
    } else {
        e.target.classList.add("rossz-válasz");
        jelenKérdések[megjelenítettKérdésSorszám].goodAnswers = 0
    }

    localStorage.setItem("jelenKérdések", JSON.stringify(jelenKérdések))
    localStorage.setItem("megjelenKérdésSzám", megjelenítettKérdésSorszám)
    localStorage.setItem("kövKérdésSzám", következőKérdésSzáma)

    console.log(megjelenítettKérdésSorszám)

    timeoutHandler = setTimeout(előre, 3000)
}