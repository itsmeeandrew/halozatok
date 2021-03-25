let kérdések;
let jelenKérdésSorszám = 0;
let jóválaszSorszám = 0;

const kérdés = document.querySelector("#kérdés"),
    válasz1 = document.querySelector("#válasz1"),
    válasz2 = document.querySelector("#válasz2"),
    válasz3 = document.querySelector("#válasz3"),
    kép = document.querySelector("#kérdésKép");

const válaszok = [válasz1, válasz2, válasz3];

const előző = document.querySelector("#előző"),
    következő = document.querySelector("#következő");


function letöltés() {
    fetch("/questions.json")
        .then(res => res.json())
        .then(data => letöltésBefejeződött(data));
}

function letöltésBefejeződött(d) {
    console.log(d);
    kérdések = d;
    kérdésMegjelenítés(jelenKérdésSorszám);
}

window.onload = () => {
    letöltés();
}

function kérdésMegjelenítés(sorszám) {
    válasz1.classList.remove("jó-válasz", "rossz-válasz");
    válasz2.classList.remove("jó-válasz", "rossz-válasz");
    válasz3.classList.remove("jó-válasz", "rossz-válasz");

    let jelenKérdés = kérdések[sorszám];
    let képUrl = "https://szoft1.comeback.hu/hajo/";

    kérdés.innerText = jelenKérdés.questionText;
    válasz1.innerText = jelenKérdés.answer1;
    válasz2.innerText = jelenKérdés.answer2;
    válasz3.innerText = jelenKérdés.answer3;
    kép.src = képUrl + jelenKérdés.image;

    jóválaszSorszám = jelenKérdés.correctAnswer;
}

következő.addEventListener("click", () => {
    if (kérdések.length <= jelenKérdésSorszám + 1) {
        jelenKérdésSorszám = 0;
    } else {
        jelenKérdésSorszám++;
    }
    console.log(`Mostani sszm.: ${jelenKérdésSorszám}`);
    kérdésMegjelenítés(jelenKérdésSorszám);  
})

előző.addEventListener("click", () => {
    if (jelenKérdésSorszám - 1 < 0) {
        jelenKérdésSorszám = kérdések.length - 1;
    } else {
        jelenKérdésSorszám--;
    }
    console.log(`Mostani sszm.: ${jelenKérdésSorszám}`);
    kérdésMegjelenítés(jelenKérdésSorszám);
})

válasz1.addEventListener("click", (e) => SzínezVálasz(e));
válasz2.addEventListener("click", (e) => SzínezVálasz(e));
válasz3.addEventListener("click", (e) => SzínezVálasz(e));


function SzínezVálasz(e) {
    if (e.target == válaszok[jóválaszSorszám]) {
        e.target.classList.add("jó-válasz");
    } else {
        e.target.classList.add("rossz-válasz");
    }
}