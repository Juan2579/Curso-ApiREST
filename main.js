const catImage = document.querySelector(".cat_image")
const catImage2 = document.querySelector(".cat_image2")
const catButton = document.querySelector(".cat_button")
const spanError = document.getElementById("error")

const API = "https://api.thecatapi.com/v1"

const API_KEY = "6ef2cd16-4ef8-44c0-9bfe-78a44da2df70"


async function loadRandomMichis(){
    const response = await fetch(`${API}/images/search?limit=2&api_key=${API_KEY}`)
    const data = await response.json()

    if (response.status != 200) {
        spanError.innerHTML = "Hubo un error: " + response.status
    }else{
        catImage.src = data[0].url
        catImage2.src = data[1].url
    }
}
catButton.addEventListener("click", loadRandomMichis);

async function loadFavouriteMichis(){
    const response = await fetch(`${API}/favourites?api_key=${API_KEY}`)
    const data = await response.json()

    if(response.status != 200){
        spanError.innerHTML = "Hubo un error: " + response.status + data.message
    }else{
        data.forEach(michi => {
            const section = document.getElementById("favouritesMichis")
            const article = document.createElement("article")
            const img = document.createElement("img")
            const btn = document.createElement("button")
            const btnText = document.createTextNode("Sacar al michi de favoritos")
            // michi.image.url
        })
        
    }
}

async function saveFavouriteMichis(){
    const response = await fetch(`${API}/favourites?api_key=${API_KEY}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image_id: "djn"
        })
    })
    const data = await response.json();
    console.log(response)
    if(response.status != 200){
        spanError.innerHTML = "Hubo un error: " + response.status + data.message
    }
}

loadRandomMichis();
loadFavouriteMichis();

