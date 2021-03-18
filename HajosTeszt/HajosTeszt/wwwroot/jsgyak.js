const body = document.getElementsByTagName("body")[0];

let container = document.createElement("div");
container.style = {
    backgroundColor: "brown"
}
body.appendChild(container);

for (let i = 0; i < 10; i++) {
    let r = 255 - (i * 25),
        g = 255 - (i * 25),
        b = 255 - (i * 25);
    let rgb = 'rgb(' + r + ',' + g + ',' + b + ')';

    let box = document.createElement("div");
    box.classList.add("inline-div");
    Object.assign(box.style, {
        backgroundColor: rgb,
        padding: "10px 10px"
    })
    box.innerText = i;
    container.appendChild(box);
}

// ---------------------------------
const pascalContainer = document.querySelector("#pascal");

function Faktoriális(n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * Faktoriális(n - 1);
}

for (let sor = 0; sor < 10; sor++) {
    let row = document.createElement("div");
    row.classList.add("sor");
    pascalContainer.appendChild(row);

    for (let oszlop = 0; oszlop <= sor; oszlop++) {
        let box = document.createElement("div");
        box.classList.add("inline-div", "elem");

        let nFakt = Faktoriális(sor);
        let kFakt = Faktoriális(oszlop);
        let n_kFakt = Faktoriális(sor - oszlop);

        box.innerText = nFakt/(kFakt * n_kFakt);

        row.appendChild(box);
    }
}
