const API = "https://api.thecatapi.com/v1/images/search"
const catImage = document.querySelector(".cat_image")
const catButton = document.querySelector(".cat_button")

async function randomCat(){
    const response = await fetch(API)
    const data = await response.json()

    catImage.src = data[0].url
}
randomCat();
catButton.addEventListener("click", randomCat);
