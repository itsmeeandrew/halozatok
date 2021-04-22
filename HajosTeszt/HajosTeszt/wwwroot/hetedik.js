/*let kérdések;*/
const képUrl = "https://szoft1.comeback.hu/hajo/";
let jelenKérdésSorszám = 1;
let jóválaszSorszám = 0;

const kérdés = document.querySelector("#kérdés"),
    válasz1 = document.querySelector("#válasz1"),
    válasz2 = document.querySelector("#válasz2"),
    válasz3 = document.querySelector("#válasz3"),
    kép = document.querySelector("#kérdésKép");

const válaszok = [válasz1, válasz2, válasz3];

const előző = document.querySelector("#előző"),
    következő = document.querySelector("#következő");


/*function letöltés() {
    fetch("/questions.json")
        .then(res => res.json())
        .then(data => letöltésBefejeződött(data));
}*/

function kérdésBetöltés(id) {
    fetch(`questions/${id}`)
        .then(res => {
            if (res.ok) {
                return res.json()
            } else {
                console.error(`Hibás válasz: ${res.status}`)
                kérdésBetöltés(1);
            }
        })
        .then(data => kérdésMegjelenítés(data))
}

/*function letöltésBefejeződött(d) {
    console.log(d);
    kérdések = d;
    kérdésMegjelenítés(jelenKérdésSorszám);
}*/

window.onload = () => {
    kérdésBetöltés(jelenKérdésSorszám);
}

function kérdésMegjelenítés(k) {
    console.log(k);
    válasz1.classList.remove("jó-válasz", "rossz-válasz");
    válasz2.classList.remove("jó-válasz", "rossz-válasz");
    válasz3.classList.remove("jó-válasz", "rossz-válasz");

    kérdés.innerText = k.questionText;
    válasz1.innerText = k.answer1;
    válasz2.innerText = k.answer2;
    válasz3.innerText = k.answer3;
    if (k.image != "") {
        kép.src = képUrl + k.image;
    }

    jóválaszSorszám = k.correctAnswer;
}

következő.addEventListener("click", () => {
    jelenKérdésSorszám++;
    console.log(`Mostani sszm.: ${jelenKérdésSorszám}`);

    kérdésBetöltés(jelenKérdésSorszám);
})

előző.addEventListener("click", () => {
    if (jelenKérdésSorszám - 1 <= 0) {
        jelenKérdésSorszám = 1;
    } else {
        jelenKérdésSorszám--;
    }
    console.log(`Mostani sszm.: ${jelenKérdésSorszám}`);
    kérdésBetöltés(jelenKérdésSorszám);
})

válasz1.addEventListener("click", (e) => SzínezVálasz(e));
válasz2.addEventListener("click", (e) => SzínezVálasz(e));
válasz3.addEventListener("click", (e) => SzínezVálasz(e));


function SzínezVálasz(e) {
    if (e.target == válaszok[jóválaszSorszám-1]) {
        e.target.classList.add("jó-válasz");
    } else {
        e.target.classList.add("rossz-válasz");
    }
}