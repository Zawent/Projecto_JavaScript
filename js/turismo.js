import { url } from './api.js';

fetch('https://api-colombia.com/api/v1/TouristicAttraction')
    .then(response => response.json())
    .then(data => {
        const grouped = {};

        data.forEach(attraction => {
            const cityName = attraction.city?.name || "Sin ciudad";
            if (!grouped[cityName]) {
                grouped[cityName] = [];
            }
            grouped[cityName].push(attraction);
        });

        const container = document.getElementById('container');
        const detailsPanel = document.getElementById('details-panel');
        let lastOpenedCityDiv = null;

        Object.keys(grouped).forEach(city => {
            const cityDiv = document.createElement('div');
            cityDiv.className = 'city';
            cityDiv.textContent = city;

            const attractionsDiv = document.createElement('div');
            attractionsDiv.className = 'attractions';

            grouped[city].forEach(attraction => {
                const attractionDiv = document.createElement('div');
                attractionDiv.className = 'attraction';
                attractionDiv.textContent = attraction.name;

                attractionDiv.addEventListener('click', (event) => {
                    event.stopPropagation();

                    const isFavorited = localStorage.getItem(`attraction-${attraction.id}`) === 'true';

                    detailsPanel.innerHTML = `
                        <button class="favorite-icon ${isFavorited ? 'filled' : ''}" title="Agregar a favoritos">&#9733;</button>
                        <h2>${attraction.name}</h2>
                        <p>${attraction.description}</p>
                        ${attraction.images?.[0] ? `<img src="${attraction.images[0]}" alt="${attraction.name}" />` : ''}
                    `;

                    const starBtn = detailsPanel.querySelector('.favorite-icon');
                    starBtn.addEventListener('click', () => {
                        const isFilled = starBtn.classList.toggle('filled');
                        localStorage.setItem(`attraction-${attraction.id}`, isFilled ? 'true' : 'false');

                        if (isFilled) {
                            console.log(`Favorito añadido: ${attraction.name}`);
                        } else {
                            console.log(`Favorito removido: ${attraction.name}`);
                        }
                    });

                    syncHeights();
                });

                attractionsDiv.appendChild(attractionDiv);
            });

            cityDiv.addEventListener('click', () => {
                if (lastOpenedCityDiv && lastOpenedCityDiv !== attractionsDiv) {
                    lastOpenedCityDiv.style.display = 'none';
                }

                const isVisible = attractionsDiv.style.display === 'block';
                attractionsDiv.style.display = isVisible ? 'none' : 'block';
                lastOpenedCityDiv = isVisible ? null : attractionsDiv;
                syncHeights();
            });

            cityDiv.appendChild(attractionsDiv);
            container.appendChild(cityDiv);
        });

        const resizeObserver = new ResizeObserver(() => {
            syncHeights();
        });
        resizeObserver.observe(detailsPanel);
    })
    .catch(error => {
        console.error('Error al cargar los datos:', error);
    });

function syncHeights() {
    const container = document.getElementById('container');
    const details = document.getElementById('details-panel');

    const detailsHeight = details.offsetHeight;

    container.style.minHeight = `${detailsHeight}px`;
    container.style.maxHeight = `${detailsHeight}px`;
}

fetch('https://api-colombia.com/api/v1/TypicalDish')
    .then(response => response.json())
    .then(dishes => {
        const dishesGrid = document.getElementById('dishes-grid');

        dishes.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'dish-card';

            const isFavorited = localStorage.getItem(`dish-${dish.id}`) === 'true';

            card.innerHTML = `
                <button class="favorite-icon ${isFavorited ? 'filled' : ''}" title="Agregar a favoritos">&#9733;</button>
                <h3>${dish.name}</h3>
                <img src="${dish.imageUrl}" alt="${dish.name}">
                <p><strong>Descripción:</strong> ${dish.description}</p>
                <p><strong>Ingredientes:</strong> ${dish.ingredients}</p>
            `;

            const starBtn = card.querySelector('.favorite-icon');
            starBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isNowFavorited = starBtn.classList.toggle('filled');

                localStorage.setItem(`dish-${dish.id}`, isNowFavorited ? 'true' : 'false');

                if (isNowFavorited) {
                    console.log(`Favorito añadido: ${dish.name}`);
                } else {
                    console.log(`Favorito removido: ${dish.name}`);
                }
            });

            dishesGrid.appendChild(card);
        });
    })
    .catch(error => {
        console.error('Error al cargar platos típicos:', error);
    });
