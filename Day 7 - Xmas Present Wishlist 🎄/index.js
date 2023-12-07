//idk what to add / property to these array, so ye
const wishList = [
    "Macbook Air M2",
    "Scrimba Pro Subscription",
    "Samsung S23",
    "Lenovo Slim Pro i9"
];

const wishlistEl = document.getElementById("wishlist");
const wishInputEl = document.getElementById("wishInput");
const addWishButtonEl = document.getElementById("addWishButton");

function populateList() {
    wishlistEl.innerHTML = "";
    wishList.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<p>${item}</p>`;
        listItem.addEventListener("click", function() {
            wishList.splice(index, 1);
            populateList();           
        })
        wishlistEl.appendChild(listItem);
    });
};

addWishButtonEl.addEventListener("click", function() {
    const wish = wishInputEl.value;
    wishInputEl.value = "";
    if (wish !== "") {
        wishList.push(wish);
        populateList();
    } else {
        wishInputEl.style.borderColor = "red";
        setTimeout(function() {
            wishInputEl.style.borderColor = "black";
        }, 3000);
    }
});

populateList();