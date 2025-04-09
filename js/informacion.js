import { url } from './api.js'

document.addEventListener("DOMContentLoaded", () => {
    fetch(url + '/api/v1/Country/Colombia')
        .then(respuesta => respuesta.json())
        .then(info => {
            const main = document.querySelector("main")
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

            const article = document.createElement("article")
            article.className = "info-grid";

            const fields = {
                "Capital": info.stateCapital,
                "Superficie (km²)": info.surface,
                "Población": info.population,
                "Prefijo telefónico": info.phonePrefix,
                "Moneda": info.currencyCode,
                "Zona horaria": info.timeZone,
            };

            for (const [key, value] of Object.entries(fields)) {
                const box = document.createElement("div");
                box.classList.add("info-box");

                const title = document.createElement("h4");
                title.textContent = key;

                const content = document.createElement("p");
                content.textContent = value;

                box.appendChild(title);
                box.appendChild(content);
                article.appendChild(box);
            }

            main.insertBefore(article, main.children[1]);
            console.log(info)
        });

    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", async () => {
        const keyword = searchInput.value.trim();
        if (keyword.length > 0) {
            buscarDepartamentos(keyword);
        } else {
            cargarDepartamentos();
        }
    });

    cargarDepartamentos();
});

function cargarDepartamentos() {
    fetch(url + '/api/v1/Department')
        .then(res => res.json())
        .then(departamentos => {
            renderizarLista(departamentos);
        })
        .catch(error => console.error('Error al cargar departamentos:', error));
}

function buscarDepartamentos(keyword) {
    fetch(url + `/api/v1/Department/search/${encodeURIComponent(keyword)}`)
        .then(res => res.json())
        .then(resultados => {
            renderizarLista(resultados);
        })
        .catch(error => console.error('Error al buscar departamentos:', error));
}

function renderizarLista(departamentos) {
    const lista = document.getElementById("department-list");
    const detalles = document.getElementById("department-details");

    lista.innerHTML = "";

    departamentos.forEach(depto => {
        const item = document.createElement("div");
        item.classList.add("list-item");
        item.textContent = depto.name;

        item.addEventListener("click", () => {
            document.querySelectorAll('.list-item').forEach(i => i.classList.remove('active'));
            item.classList.add("active");
            detalles.innerHTML = `
                <h2>${depto.name}</h2>
                <p><strong>Descripción:</strong> ${depto.description}</p>
                <p><strong>Capital:</strong> ${depto.cityCapital?.name || 'No disponible'}</p>
                <p><strong>Población:</strong> ${depto.population.toLocaleString()} habitantes</p>
            `;
        });
        lista.appendChild(item);
    });
}


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