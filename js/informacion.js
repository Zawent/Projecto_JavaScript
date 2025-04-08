import { url } from './api.js'

document.addEventListener("DOMContentLoaded", () => {
    fetch(url+'/api/v1/Country/Colombia')
    .then(respuesta => respuesta.json())
    .then(info =>{
        const main  = document.querySelector("main")
        const sectionInfo = document.querySelector(".infoGeneral")
        const flag = document.createElement("img")
        flag.src = info.flags[1];
        flag.style = "width: 30svw;"

        sectionInfo.appendChild(flag)

        const div = document.createElement("div")
        const h1 = document.createElement("h1")
        h1.textContent = info.name
        h1.style = 'text-weight: bold; font-family: "OpenSans-Medium"; font-size: 32px;'

        const p = document.createElement("p")
        p.textContent = info.description
        p.style = "text-align: justify;"
        div.style = "display: flex; flex-direction: column; gap: 20px;"
        div.appendChild(h1)
        div.appendChild(p)
        sectionInfo.appendChild(div)

        // Esta seccion de aqui abajo es para info general en un grid (o es la idea)

        const article = document.createElement("article")

        main.appendChild(article)
        console.log(info)
    })
})

// {
//     "id": 1,
//     "name": "Colombia",
//     "description": "Colombia, oficialmente República de Colombia, es un país de América del Sur con regiones insulares en América del Norte, cerca de la costa caribeña de Nicaragua, así como en el Océano Pacífico. El territorio continental de Colombia limita al norte con el Mar Caribe, al este y noreste con Venezuela, al sureste con Brasil, al sur y suroeste con Ecuador y Perú, al oeste con el Océano Pacífico y al noroeste con Panamá. Colombia está dividida en 32 departamentos y el Distrito Capital de Bogotá, la ciudad más grande del país. Cubre un área de 1.141.748 kilómetros cuadrados (440.831 millas cuadradas) y tiene una población de 52 millones. El patrimonio cultural de Colombia, que incluye lengua, religión, cocina y arte, refleja su historia como colonia española, fusionando elementos culturales traídos por la inmigración de Europa y Medio Oriente, con los traídos por africanos esclavizados, así como con los de los diversos Civilizaciones indígenas anteriores a la colonización. El español es el idioma oficial del estado, aunque el inglés y otros 64 idiomas son idiomas regionales reconocidos.",
//     "stateCapital": "Bogotá",
//     "surface": 1141748,
//     "population": 52235050,
//     "languages": [
//         "Spanish",
//         "English"
//     ],
//     "timeZone": "UTC-5",
//     "currency": "Colombian Peso",
//     "currencyCode": "COP",
//     "currencySymbol": "$",
//     "isoCode": "CO",
//     "internetDomain": ".co",
//     "phonePrefix": "+57",
//     "radioPrefix": "HK",
//     "aircraftPrefix": "HK",
//     "subRegion": "South America",
//     "region": "Americas",
//     "borders": [
//         "Brazil",
//         "Panamá",
//         "Ecuador",
//         "Venezuela",
//         "Perú"
//     ],
//     "flags": [
//         "https://flagcdn.com/co.svg",
//         "https://flagcdn.com/w320/co.png"
//     ]
// }