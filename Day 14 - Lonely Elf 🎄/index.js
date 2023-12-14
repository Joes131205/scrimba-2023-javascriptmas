const elf = document.getElementById("elf");
const elfCount = document.getElementById("elf-count");
const btn = document.getElementById("btn");

btn.addEventListener("click", duplicateElf);

let elfs = 1;

function duplicateElf() {
  if (elfs < 64) {
    elfs *= 2;
  } else {
    elfs = 100;
    elfCount.style.color = "red";
    setTimeout(() => {
      elfCount.style.color = "black";
    }, 500);
  }
  elf.textContent = "🧝".repeat(elfs);
  elfCount.textContent = `Elfs count = ${elfs}`;
}
