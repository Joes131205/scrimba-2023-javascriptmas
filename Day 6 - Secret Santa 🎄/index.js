const people = [];
const shuffledPairsEl = document.getElementById("shuffledPairs");
const nameInputEl = document.getElementById("name");
const addButtonEl = document.getElementById("addButton");
const shuffleButtonEl = document.getElementById("shuffleButton");
const deleteButtonEl = document.getElementById("deleteButton");
const pairInputEl = document.getElementById("pairInput");

function populateNameInput() {
    pairInputEl.textContent = people.join(", ");
}

addButtonEl.addEventListener("click", function() {
    const name = nameInputEl.value.trim();
    if (name === "") {
        nameInputEl.style.border = "2px solid red";
        return;
    } 
    if (people.includes(name)) {
        nameInputEl.style.border = "2px solid red";
        return;
    }
    
    nameInputEl.style.border = "2px solid green";
    people.push(name);
    populateNameInput();
    nameInputEl.value = "";
});
deleteButtonEl.addEventListener("click", function() {
    people.pop();
    populateNameInput();
})
// --Solution--
function generateSecretSantaPairs(people) {
    const copy = [...people];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    const pairs = {};
    for (let i = 0; i < copy.length; i++) {
        const next = i + 1 === copy.length ? 0 : i + 1;
        pairs[copy[i]] = copy[next];
    }
    return pairs;
}
// ------------------
shuffleButtonEl.addEventListener("click", function() {
    if (people.length < 3) {
        alert("Must be at least 3 people silly");
        return;
    }
    const pairs = generateSecretSantaPairs(people);
    populatePairs(pairs);
});

function populatePairs(pairs) {
    shuffledPairsEl.innerHTML = "";
    for (const key in pairs) {
        const listEl = document.createElement("li");
        listEl.textContent = `${key} --🎁--> ${pairs[key]}`;
        shuffledPairsEl.appendChild(listEl);
    }
}
//If you think the code is ugly, you are right, apologize in advance