const tableBody = document.getElementById("tbody");

const morseMap = [];
const morse = [".-", "-...", "-.-.", "-..", ".", "..-.", "--.", "....", "..", ".---", "-.-", ".-..", "--", "-.", "---", ".--.", "--.-", ".-.", "...", "-", "..-", "...-", ".--", "-..-", "-.--", "--..", ".----", "..---", "...--", "....-", ".....", "-....", "--...", "---..", "----.", "-----", ".-.-.-", "--..--", "..--..", "---...", "-.--.-", "-....-", "-..-.", ".-..-.", ".----.", "-.--.", "-.--..", "-...-", ".-.-.", "...-..-", "..--.-"];
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", ",", "?", ":", ";", "-", "/", '"', "'", "(", ")", "=", "+", "$", "_"];

for (let i = 0; i < 51; i++) {
    morseMap.push({ letter: alphabet[i], morse: morse[i] });
    tableBody.insertAdjacentHTML("beforeend", `<tr><td>${morse[i]}</td><td>${alphabet[i]}</td></tr>`);
}

const select = document.getElementById("select");
const one = document.getElementById("one");
const two = document.getElementById("two");

let translationType = select.value;

const updateValue = () => {
    one.value = "";
    two.value = "";
    translationType = select.value;
}

const update = () => {
    if (translationType !== "null") {
        let text = [];
        const typeLetter = translationType === "letter";
        const words = one.value.split(typeLetter ? " " : "  ");

        words.forEach((word) => {
            const notLastWord = words.findIndex((w) => w === word) !== words.length - 1;
            const letters = word.split(typeLetter ? "" : " ");

            letters.forEach((untested) => {
                const letter = typeLetter ? untested.toLowerCase() : untested.replace("(u)", "");
                const notLastLetter = letters.findIndex((l) => l === letter) !== word.length - 1;
                const object = morseMap.find(o => o[translationType] === letter);
                let value = object[typeLetter ? "morse" : "letter"];
                if (untested.includes("(u)") && !typeLetter) value = value.toUpperCase();
                else if (typeLetter && untested.toUpperCase() === untested) value = `(u)${value}`;
                text.push(value);
                typeLetter && notLastLetter ? text.push(" ") : null;
            });
            notLastWord ? text.push(" ") : null;
            typeLetter && notLastWord ? text.push(" ") : null;
        });

        two.value = text.join("");
    } else {
        alert("You must select a translation type.");
        console.log("TEST");
    }
}

update();