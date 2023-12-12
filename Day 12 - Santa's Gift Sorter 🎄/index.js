const xmasGifts = ['guitar 🎸', 'skates ⛸️', 'bear 🧸', 'magnet 🧲', 'laptop 💻', 'games console 🎮 ', 'jewellery 💍', 'kite 🪁', "scarf 🧣"];

const sortAZ = [...xmasGifts].sort();
console.log('A-Z: ', sortAZ); 

const sortZA = [...xmasGifts].sort((a, b) => b.localeCompare(a));
console.log('Z-A: ', sortZA); 

const giftsEl = document.getElementById('gifts');
const sortedAZEl = document.getElementById('sortedAZ');
const sortedZAEl = document.getElementById('sortedZA');

giftsEl.textContent = `Gifts : ${xmasGifts.map(items => items[0].toUpperCase() + items.slice(1)).join(", ")}`;

sortedAZEl.textContent = sortAZ.map(items => items[0].toUpperCase() + items.slice(1)).join(", ");
sortedZAEl.textContent = sortZA.map(items => items[0].toUpperCase() + items.slice(1)).join(", ");