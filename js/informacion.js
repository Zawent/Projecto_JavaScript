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


function cargarPresidentes() {
    fetch(url + '/api/v1/President')
        .then(respuesta => respuesta.json())
        .then(info => {
            const sectionPresi = document.querySelector(".carrouselPresi");

            info.sort((a, b) => new Date(b.startPeriodDate) - new Date(a.startPeriodDate));

            info.forEach(presidente => {
                const tarjetita = document.createElement("div");
                tarjetita.classList.add("tarjetita");

                const imagen = document.createElement("img");
                imagen.src = presidente.image;
                imagen.alt = presidente.name + " " + presidente.lastName;
                tarjetita.appendChild(imagen);

                const nombre = document.createElement("h3");
                nombre.innerHTML = presidente.name + "<br>" + presidente.lastName;
                nombre.style = "font-family: OpenSans-Bold;"
                tarjetita.appendChild(nombre);

                const duracion = document.createElement("h4");
                const inicio = presidente.startPeriodDate;
                const fin = presidente.endPeriodDate ? presidente.endPeriodDate : "Actualidad";
                duracion.innerHTML = "Duración de mandato:<br>" + inicio + " - " + fin;
                duracion.style = "font-family: OpenSans-Light;"
                tarjetita.appendChild(duracion);

                sectionPresi.appendChild(tarjetita);
            });

            
        })
        .catch(error => console.error("Error al cargar los presidentes:", error));
}

const carrousel = document.querySelector(".carrouselPresi");
const btnIzq = document.querySelector(".flecha.izquierda");
const btnDer = document.querySelector(".flecha.derecha");

const tarjetaWidth = carrousel.offsetWidth * 0.2; 

btnIzq.addEventListener("click", () => {
    carrousel.scrollBy({ left: -tarjetaWidth, behavior: "smooth" });
});

btnDer.addEventListener("click", () => {
    carrousel.scrollBy({ left: tarjetaWidth, behavior: "smooth" });
});



document.addEventListener("DOMContentLoaded", () => {
    cargarPresidentes()
})