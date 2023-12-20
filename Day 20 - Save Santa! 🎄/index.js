const dangerArray = [
    ["🎅", "👺"],
    [
        ["🎅", "🦁"],
        ["👹", "🎅"]
    ],
    [
        [
            ["🎅", "🐻"],
            ["🧌", "🎅"]
        ],
        [
            ["🐯", "🎅"],
            ["🎅", "😈"]
        ]
    ]
];

function saveSantaEasyMode(arr) {
    const saveArray = arr.flat(Infinity).filter(item => item === "🎅");
    return saveArray;
}

function saveSantaHardMode(arr, filter) {
    return arr.map(item => {
        if (Array.isArray(item)) {
            return saveSantaHardMode(item, filter);
        } else {
            return filter(item) ? item : undefined;
        }
    }).filter(item => item !== undefined);
}

console.log(saveSantaEasyMode(dangerArray));
console.log(saveSantaHardMode(dangerArray, item => item === "🎅"));
console.log(dangerArray);