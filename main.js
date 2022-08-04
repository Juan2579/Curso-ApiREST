const API = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=6ef2cd16-4ef8-44c0-9bfe-78a44da2df70"
const catImage = document.querySelector(".cat_image")
const catImage2 = document.querySelector(".cat_image2")
const catImage3 = document.querySelector(".cat_image3")
const catButton = document.querySelector(".cat_button")

async function randomCat(){
    const response = await fetch(API)
    const data = await response.json()

    catImage.src = data[0].url
    catImage2.src = data[1].url
    catImage3.src = data[2].url
}
randomCat();
catButton.addEventListener("click", randomCat);
