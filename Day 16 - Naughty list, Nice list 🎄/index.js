const niceList = document.getElementById("nice-list");
const naughtyList = document.getElementById("naughty-list");
const btn = document.getElementById("btn");
const nameEl = document.getElementById("name");
const isNice = document.getElementById("nice");

const sorteesArr = [];

let niceArr;
let naughtyArr;

function sort() {
    niceArr = sorteesArr.filter(item => item.hasBeenGood);
    naughtyArr = sorteesArr.filter(item => !item.hasBeenGood);
}

function populateNiceList() {
    niceList.innerHTML = '';

    for (let i = 0; i < niceArr.length; i++) {
        const li = createListItem(niceArr[i], niceArr, naughtyArr);
        niceList.appendChild(li);
    }
}

function populateNaughtyList() {
    naughtyList.innerHTML = '';

    for (let i = 0; i < naughtyArr.length; i++) {
        const li = createListItem(naughtyArr[i], naughtyArr, niceArr);
        naughtyList.appendChild(li);
    }
}

function createListItem(item, startArr, finishArr) {
    const li = document.createElement("li");
    li.textContent = item.name;

    li.addEventListener("click", function () {
        const obj = {
            name: item.name,
            hasBeenGood: !item.hasBeenGood
        };
        startArr.splice(startArr.indexOf(item), 1);
        finishArr.push(obj);
        li.remove();
        populateNiceList();
        populateNaughtyList();
    });

    return li;
}

btn.addEventListener("click", function () {
    const name = nameEl.value;
    if (name) {
        sorteesArr.push({
            name: name,
            hasBeenGood: isNice.checked
        })
    }
    sort();
    populateNiceList();
    populateNaughtyList();   
});