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
        const btn1 = document.getElementById('btn1')
        const btn2 = document.getElementById('btn2')
        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
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
        const h2 = document.createElement("h2")
        const h2Text = document.createTextNode("Michis favoritos")
        h2.appendChild(h2Text)
        data.forEach(michi => {
            const section = document.getElementById("favouriteMichis")
            const article = document.createElement("article")
            const img = document.createElement("img")
            const btn = document.createElement("button")
            const btnText = document.createTextNode("Sacar al michi de favoritos")

            btn.appendChild(btnText)
            btn.onclick = () => deleteFavouriteMichi(michi.id)
            img.src = michi.image.url

            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)
        })
        
    }
}

async function saveFavouriteMichi(id){
    const response = await fetch(`${API}/favourites?api_key=${API_KEY}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image_id: id
        })
    })
    const data = await response.json();
    console.log(response)
    if(response.status != 200){
        spanError.innerHTML = "Hubo un error: " + response.status + data.message
    }else{
        console.log("Michi guardado en favoritos")
    }
}

async function deleteFavouriteMichi(id){
    const response = await fetch(`${API}/favourites/${id}?api_key=${API_KEY}`, {
        method: 'DELETE',
        
    })
    const data = await response.json();
    if(response.status != 200){
        spanError.innerHTML = "Hubo un error: " + response.status + data.message
    }else{
        console.log("Michi eliminado de favoritos")
    }
}

loadRandomMichis();
loadFavouriteMichis();

