import SECRET from "./env.js";
document.addEventListener("DOMContentLoaded", () => {
    const productId = document.body.getAttribute('data-id');
    const url = "/products/api/" + productId

    fetch(url,{
        method: 'GET',
        headers: {
            'x-check-header' : SECRET
        }
    })
    .then(response => response.json())
    .then(data => {
        createPage (data);
        document.querySelector('#product-link').addEventListener('click', function() {
            navigator.clipboard.writeText(data.link)
                .then(() => alert('Link copiado!'))
                .catch(err => console.error('Erro ao copiar link:', err));
        });
    })
    .catch(error => {
        console.log(error)
    });
});

function createPage (data) {
    const article = document.getElementById('product-container');

    const topContent = document.createElement('div');
    topContent.id = "top-content";

    const leftContent = document.createElement('div');
    leftContent.id = "left-content";

    const image = document.createElement("img");
    const correctedImageUrl = data.image_url.replace(/\\/g, '/').replace('src/public', '')
    image.id = 'product-image';
    image.src = correctedImageUrl;
    image.alt = '';
    leftContent.appendChild(image);
    topContent.appendChild(leftContent);

    const rightContent = document.createElement('div');
    rightContent.id = "right-content";
    const title = document.createElement('h1');
    title.id = 'product-title';
    title.textContent = data.name;
    rightContent.appendChild(title);
    const description = document.createElement('p');
    description.id = 'product-desc';
    description.textContent = data.description;
    rightContent.appendChild(description);

    topContent.appendChild(rightContent);

    const bottomContent = document.createElement('div');
    bottomContent.id = "bottom-content";

    const titleP = document.createElement("p");
    titleP.textContent = "Link de Afiliado:";
    bottomContent.appendChild(titleP);

    const p = document.createElement("p");
    p.id = "product-link";
    p.textContent = "Clique aqui para copiar o link";
    bottomContent.appendChild(p);

    article.appendChild(topContent);
    article.appendChild(bottomContent);
}