# RatePay

Proposta de solução para um desafio de implementação de um sistema web com fluxo lógico, funcionalidade de login e persistência dos dados.

## Descrição

RatePay é um sistema web que permite aos usuários se registrar, fazer login e realizar ações autenticadas. Este projeto foi desenvolvido com uma combinação de tecnologias modernas, incluindo JavaScript, HTML, CSS, Node.js e Express.js. Utiliza requisições AJAX para uma experiência de usuário mais dinâmica e responsiva.

## Tecnologias Utilizadas

 ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=black) ![HTML](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white) ![CSS](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white) ![Node.js](https://img.shields.io/badge/-Node.js-339933?style=flat-square&logo=Node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/-Express.js-000000?style=flat-square&logo=Express&logoColor=white) ![MongoDb](https://img.shields.io/badge/-MongoDb-339933?style=flat-square&logo=MongoDb&logoColor=white)



## Funcionalidades

- **Registro de Usuário**: Permite que novos usuários criem uma conta.
- **Login de Usuário**: Usuários registrados podem fazer login no sistema.
- **Manutenção de Sessão**: Usuários permanecem logados após o login, permitindo navegação contínua.
- **Autenticação e Permissões**: Usuários com permissão terão acesso a funcionalidades de alteração de dados.
- **Requisições AJAX**: Atualizações dinâmicas de conteúdo sem a necessidade de recarregar a página.
- **Design Responsivo**: Interface adaptável para diferentes dispositivos e tamanhos de tela.

## Instalação

Siga os passos abaixo para configurar o projeto localmente:

1. Clone o repositório:
    ```bash
    git clone https://github.com/luigiisp/Desafio.git
    ```
2. Navegue até o diretório do projeto:
    ```bash
    cd Desafio
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Inicie o servidor:
    ```bash
    npm start
    ```

## Estrutura do Projeto

    ├── src
    │   ├── config
    │   │   ├── db.js
    │   │   └── multer.js
    │   ├── controllers
    │   │   ├── productController.js
    │   │   └── userController.js
    │   ├── middleware
    │   │   └── authenticateAccess.js
    │   ├── models
    │   │   ├── productModel.js
    │   │   └── userModel.js
    │   ├── public
    │   │   ├── css
    │   │   │   ├── footer.css
    │   │   │   ├── header.css
    │   │   │   ├── login.css
    │   │   │   ├── product.css
    │   │   │   ├── register.css
    │   │   │   └── styles.css
    │   │   ├── images
    │   │   │   ├── hp-images
    │   │   │   └── uploads
    │   │   └── js
    │   │       ├── env.js
    │   │       ├── index.js
    │   │       ├── login.js
    │   │       └── product.js
    │   ├── routes
    │   │   ├── productRoutes.js
    │   │   └── userRoutes.js
    │   └── views
    │       ├── footer.ejs
    │       ├── header.ejs
    │       ├── index.ejs
    │       ├── login.ejs
    │       ├── product.ejs
    │       └── register.ejs
    ├── .env
    ├── app.js
    ├── package.json
    └── README.md

- **src/config/**: Configurações do projeto, como banco de dados e multer.
- **src/controllers/**: Controladores para as rotas de produtos e usuários.
- **src/middleware/**: Middlewares para autenticação e outras verificações.
- **src/models/**: Modelos do banco de dados para produtos e usuários.
- **src/public/**: Contém os arquivos estáticos como CSS, JavaScript e imagens.
- **src/routes/**: Define as rotas da aplicação.
- **src/views/**: Contém os templates EJS para as páginas web.
- **.env**: Arquivo de variáveis de ambiente.
- **app.js**: Arquivo principal do servidor Express.
- **package.json**: Lista as dependências do projeto e scripts.
- **README.md**: Documentação do projeto.

## Uso

1. Abra o navegador e acesse `http://localhost:3000`.
2. Registre um novo usuário ou faça login com um usuário existente.
3. Navegue pelas páginas e utilize as funcionalidades do sistema.

## Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso, siga os passos abaixo:

1. Faça um fork do projeto.
2. Crie uma nova branch com a sua feature ou correção:
    ```bash
    git checkout -b minha-feature
    ```
3. Commit suas mudanças:
    ```bash
    git commit -m 'Minha nova feature'
    ```
4. Envie para o repositório remoto:
    ```bash
    git push origin minha-feature
    ```
5. Abra um Pull Request.

## Autor

- **Luigi Peixoto** - [GitHub](https://github.com/luigiisp)
