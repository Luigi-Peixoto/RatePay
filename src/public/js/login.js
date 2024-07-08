import SECRET from "./env.js";

document.addEventListener("DOMContentLoaded", () => {
    const authButtons = document.getElementById("authButtons");
    const authArea = document.createElement("div");
    authArea.id = "authArea";
    const navList = document.getElementById("nav-list");

    fetch("/auth/check-login", {
        method: 'GET',
        headers: {
            'x-check-header': SECRET
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.user !== null) {
            const user = document.createElement("p");
            user.id = "auth-username";
            user.textContent = data.user.username;

            const logout = document.createElement("button");
            logout.id = "logout-button";
            logout.textContent = "sair";
            logout.addEventListener("click", () => {
                fetch('/auth/logout', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                })
                .then(() => {
                    const menu = document.getElementById('menu-nav');
                    if(menu){
                        menu.style.display = 'none' 
                    }
                    authButtons.style.display = 'block';
                    authArea.style.display = 'none';
                })
                .catch(error => {
                    console.error('Erro ao fazer logout:', error);
                });
            });

            authArea.appendChild(user);
            authArea.appendChild(logout);
            authButtons.style.display = 'none';
            authArea.style.display = 'flex';
            const header = document.querySelector('header')
            header.appendChild(authArea);

            if(data.user.role === "ADMIN" || data.user.role === "EMPLOYEE"){
                const menu = document.createElement("li");
                menu.id = "menu-nav"
                const a = document.createElement("a");
                a.textContent = "Menu";
                a.style.cursor = "pointer";
                menu.appendChild(a);
                navList.appendChild(menu);
                checkMenu(data.user.role);
            }
        }
    })
    .catch(error => {
        console.error('Erro ao verificar login:', error);
    });
    setupModals();
});

function checkMenu(role) {
    const menu = document.getElementById('menu-nav');
    const dropdownMenu = document.getElementById('dropdown-menu');

    const options = role === "ADMIN" ? 
        ["Ver Produtos", "Adicionar Produto", "Deletar Produto","Ver Usuários","Remover Usuário", "Adicionar Funcionário"] :
        ["Ver Produtos", "Adicionar Produto", "Deletar Produto","Ver Usuários","Remover Usuário"];

    options.forEach(optionText => {
        const option = document.createElement("a");
        option.textContent = optionText;
        option.style.cursor = "pointer";

        option.addEventListener("click", () => {
            if (optionText === "Ver Produtos") {
                fetchProducts();
            } else if (optionText === "Adicionar Produto") {
                showCreateProductModal();
            } else if (optionText === "Deletar Produto") {
                showDeleteProductModal();
            } else if (optionText === "Ver Usuários"){
                fetchUsers();
            }else if (optionText === "Remover Usuário"){
                showDeleteUserModal();
            }else if (optionText === "Adicionar Funcionário"){
                showCreateEmployeeModal();
            }
        });

        dropdownMenu.appendChild(option);
    });

    menu.addEventListener("click", () => {
        const display = dropdownMenu.style.display;
        dropdownMenu.style.display = display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
        if (!menu.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
}

function fetchProducts() {
    const modal = document.getElementById('products-modal');
    modal.style.display = 'flex';
    const textArea = document.getElementById('product-modal-content');
    textArea.innerHTML = '';    
    textArea.innerHTML = '<span class="close">&times;</span> <h2>Produtos:</h2>'
    fetch('products/api', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const p = document.createElement('p');
            p.innerHTML = `Nome: ${item.name} <br> Descrição: ${item.description} <br> Link: ${item.link} <br> Imagem URL: ${item.image_url} `;
            textArea.appendChild(p);
            const br = document.createElement('br')
            textArea.appendChild(br);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar produtos:', error);
    });
}

function fetchUsers() {
    const modal = document.getElementById('users-modal');
    modal.style.display = 'flex';
    const textArea = document.getElementById('users-modal-content');
    textArea.innerHTML = '';
    textArea.innerHTML = '<span class="close">&times;</span> <h2>Usuários:</h2>'
    fetch('/auth/users', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            const p = document.createElement('p');
            p.innerHTML = `Nome: ${item.name} <br> Usuário: ${item.username} <br> E-mail: ${item.email} <br> Cargo: ${item.role} `;
            textArea.appendChild(p);
            const br = document.createElement('br')
            textArea.appendChild(br);
        });
    })
    .catch(error => {
        console.error('Erro ao buscar produtos:', error);
    });
}

function showCreateProductModal() {
    const modal = document.getElementById('create-product-modal');
    modal.style.display = 'flex';
}

function showDeleteProductModal() {
    const modal = document.getElementById('delete-product-modal');
    modal.style.display = 'flex';
}
function showCreateEmployeeModal() {
    const modal = document.getElementById('create-employee-modal');
    modal.style.display = 'flex';
}

function showDeleteUserModal() {
    const modal = document.getElementById('delete-user-modal');
    modal.style.display = 'flex';
}

function setupModals() {
    const productsModal = document.getElementById('products-modal');
    const createProductModal = document.getElementById('create-product-modal');
    const deleteProductModal = document.getElementById('delete-product-modal');
    const createEmployeeModal = document.getElementById('create-employee-modal');
    const deleteUserModal = document.getElementById('delete-user-modal');
    const userModal = document.getElementById('users-modal');
   
    
    [productsModal, createProductModal, deleteProductModal, createEmployeeModal, deleteUserModal, userModal].forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target.classList.contains('modal') || event.target.classList.contains('close')) {
                modal.style.display = 'none';
            }
        });
    });
}