<h1 align="center">JusCashCase</h1>

<br/>

<p align="center">
<a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-funcionalidades-principais">Funcionalidades principais</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-implementações-para-melhoria-de-performance">Implementações para melhoria de performance</a>
<a href="#%EF%B8%8F-instalação--execução">Instalação e execução</a>
<a href="#-documentação">Documentação</a>

</p>

## ❔ Sobre
<p>O projeto visa fornecer um API para gerenciamento de publicações no DJE SP, com rotas para registrar as publicações coletadas via web scraping, recuperar as publicações filtradas e atualizar o status dentre os disponíveis(Nova, Lida, Enviada para advogado e Concluída), bem como funções de criação de conta e login</p>


## 🔧 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Redis](https://www.redis.io/)

## 🧠 Funcionalidades principais

  - Cadastro, listagem e atualização de publicações
  - Filtragem por data de publicação, número de processo, autores e advogados(Psiu...a filtragem é por qualquer termo que esteja na publicação.... mas não conta pra ninguém!!)
  - Criação de conta e login com autenticação JWT

## 🚀 Implementações para melhoria de performance

  - Indexação GIN no campo de texto postgres para acelerar a busca(Assim pude manter os dados mais organizados mas sem perder meu poder de busca)
  - Cacheamento da rota principal de listagem de publicações para que a página inicial carregue sempre rápido mesmo com muitos usuários carregando
  - Uso do Prisma e indexação para agilizar as requisições
  - Separação do script de scraping para facilitar troca do script para outra linguagem ou repositório se necessário

## ⚙️ Instalação & execução
  <p>Garanta que voce tem o Node LTS instalado e o docker</p>
  - git clone https://github.com/IagoJDiniz/JusCashCase.git
  - cd JusCashCase

  - npm install
  - docker compose up

  <p>Crie um arquivo .env com as seguintes variáveis:</p>
  <p>- NODE_ENV=dev</p>
  <p>- JWT_SECRET=key</p>
  <p>- DATABASE_URL="postgresql://postgres:docker@localhost:5432/juscash-case-backend-postgres?schema=public"</p>
  <p>- BODY_DECRYPTION_KEY=key</p>
  <p>- PORT=3333</p>
  <p>- SCRAPER_API_KEY=290755df-40f9-4fbd-8bbe-dedfe0133564</p>
  <p>- REDIS_HOST=localhost</p>
  <p>- REDIS_PORT=6379</p>
  <p>- REDIS_PASSWORD=password</p>

  <p>Por fim:</p>
  - npm run dev
  <strong>Lembrando que o banco de dados nesse caso não estará populado, portanto é necessário configurar o repositório de scraping abaixo, rodar ele e aguardar a finalização</strong>

## 📄 Documentação
https://app.swaggerhub.com/apis-docs/warbdesenvolvimento/JuscashCase/1.0.0
<p>
  
front-end - https://github.com/IagoJDiniz/juscash-front/
</p>
<p>scraper - https://github.com/IagoJDiniz/dje-scraping</p>

## 📈 Pontos de melhoria
  - Criar endpoint para redefinição de senha com envio de email de confirmação
  - Alterar busca dos filtros para valores exatos pois como advogados e autores são arrays de strings eles não buscam por trechos, apenas por valores exatos
  - Criar uma encriptação dos dados das requisições de autenticação para fazer uma dupla camada de proteção junto ao https
  - Realizar a implementação de testes

