<h1 align="center">JusCashCase</h1>

<br/>

<p align="center">
<a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-funcionalidades-principais">Funcionalidades principais</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-implementações-para-melhoria-de-performance">Implementações para melhoria de performance</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#%EF%B8%8F-instalação-e-execução">Instalação e execução</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-documentação">Documentação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
<a href="#-pontos-de-melhoria">Pontos de melhoria</a>

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
- Como o scraper é executado diariamente e no mesmo intervalo optei por salvar dados novos apenas se não houver registros com a mesma combinação "data_publicação e numero_processo"(Orientação da minha esposa e ainda recebi uma palestra sobre o funcionamento do diário oficial)

## ⚙️ Instalação e execução

  <p>Garanta que voce tem o Node LTS instalado e o docker</p>
  
  ```bash
git clone https://github.com/IagoJDiniz/JusCashCase.git
cd JusCashCase

npm install

docker compose up

```

  <p>Crie um arquivo .env com o seguinte padrão:</p>


```

NODE_ENV=dev
JWT_SECRET=jwt_key
JWT_REFRESH_SECRET=jwt_refresh_key
DATABASE_URL=url_do_banco_com_user_e_senha_e_porta
PORT=3333
SCRAPER_API_KEY=mesma_key_do_scraper
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=password

```

<p>Por fim:</p>

```

npm run dev

```
  <br/>
  <strong>Lembrando que o banco de dados nesse caso não estará populado, portanto é necessário configurar o repositório de scraping abaixo, rodar ele e aguardar a finalização</strong>

## 📄 Documentação
https://app.swaggerhub.com/apis-docs/warbdesenvolvimento/JuscashCase/1.0.0
<br/>
[Link do repositório Front-End](https://github.com/IagoJDiniz/juscash-front/)
<br/>
[Link do web scraper das publicações do DJE](https://github.com/IagoJDiniz/dje-scraping)
<br/>
<p>Estrutura do banco pode ser encontrado no prisma/schema.prisma</p>


## 📈 Pontos de melhoria
  - Criar endpoint para redefinição de senha com envio de email de confirmação
  - Alterar busca dos filtros para valores exatos pois como advogados e autores são arrays de strings eles não buscam por trechos, apenas por valores exatos
  - Criar uma encriptação dos dados das requisições de autenticação para fazer uma dupla camada de proteção junto ao https
  - Realizar a implementação de testes
  - Ajustar o projeto para fazer a documentação de forma automática

```
