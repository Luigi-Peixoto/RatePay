import SECRET from "./env.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("product-container");
    fetch("/products/api",{
        method: 'GET',
        headers: {
            'x-check-header' : SECRET
        }
    })
    .then(response => response.json())
      .then(data => {
        data.forEach(product => {
            const card = createCard(product._id, product.name, product.image_url);
            container.appendChild(card);
        });
      })
      .catch(error => {
        console.log(error)
      });
});

function createCard(id, name, image_url) {
    const card = document.createElement("div");
    card.classList.add("product-item");

    const image = document.createElement("img");
    const correctedImageUrl = image_url.replace(/\\/g, '/').replace('src/public', '');

    image.src = correctedImageUrl;
    image.alt = name;

    const title = document.createElement("h3");
    title.textContent = name;

    const p = document.createElement("p");
    p.textContent = "Mais detalhes";

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(p);

    card.addEventListener('click', () => {
        window.location.href = `/products/${id}`;
    });

    return card;
}