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

            if(data.user.role === "ADMIN"){
                const menu = document.createElement("li");
                const a = document.createElement("a");
                a.textContent = "Menu";
                a.style.cursor = "pointer";
                menu.appendChild(a);
                navList.appendChild(menu);
            }
        }
    })
    .catch(error => {
        console.error('Erro ao verificar login:', error);
    });
});