<h1 align="center">JusCashCase</h1>

<br/>

<p align="center">
<a href="#-sobre">Sobre</a>
<a href="#-tecnologias">Tecnologias</a>
<a href="#-funcionalidades-principais">Funcionalidades principais</a>
<a href="#-implementações-para-melhoria-de-performance">Implementações para melhoria de performance</a>

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

## 📄 Documentação
https://app.swaggerhub.com/apis/warbdesenvolvimento/JuscashCase/1.0.0

front-end - https://github.com/IagoJDiniz/juscash-front/
scraper - https://github.com/IagoJDiniz/dje-scraping
