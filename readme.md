# mento

Este projeto demonstra como criar um servidor Node.js básico com:

*   **Express:** Framework web para Node.js.
*   **Winston:** Biblioteca de logging para Node.js.
*   **MongoDB:** Banco de dados NoSQL para armazenar os logs.
*   **Docker:** Plataforma para conteinerização de aplicações.

**Pré-requisitos:**

*   Docker instalado e em execução na sua máquina.
*   Node.js e npm (ou yarn) instalados na sua máquina.

**Passo a Passo para Subir o Ambiente de Desenvolvimento:**

1.  **Clonar o Repositório:**

    ```bash
    git clone <URL_DO_SEU_REPOSITORIO>
    cd <NOME_DO_SEU_PROJETO>
    ```

2.  **Criar o Arquivo .env:**

    Na raiz do projeto, crie um arquivo chamado `.env` e adicione as seguintes variáveis de ambiente:

    ```
    PORT=3000
    MONGODB_URI=mongodb://mongo:27017/dev
    ```

3.  **Subir os Containers com Docker Compose:**

    ```bash
    docker-compose -f docker-compose.dev.yml up -d
    ```

    Este comando irá:

    *   Construir as imagens Docker para o servidor Node.js e o MongoDB.
    *   Iniciar os containers em segundo plano (`-d`).
    *   Conectar o servidor Node.js ao MongoDB.

4.  **Acessar a Aplicação:**

    Abra o navegador e acesse `http://localhost:3000`. Você deverá ver a mensagem "Olá, mundo!".

5.  **Verificar os Logs:**

    Os logs da aplicação serão armazenados no MongoDB. Você pode usar um cliente MongoDB para visualizar os logs na coleção `logs` do banco de dados `dev`.

**Comandos Úteis:**

*   **Parar os containers:** `docker-compose -f docker-compose.dev.yml down`
*   **Reconstruir as imagens:** `docker-compose -f docker-compose.dev.yml up --build`
*   **Ver os logs do container da aplicação:** `docker logs <nome-do-container-app>`
*   **Conectar ao shell do container do MongoDB:** `docker exec -it <nome-do-container-mongo> mongo`

**Observações:**

*   Certifique-se de ter o Docker Compose instalado.
*   Substitua `<URL_DO_SEU_REPOSITORIO>` e `<NOME_DO_SEU_PROJETO>` pelos valores corretos.
*   Os nomes dos containers podem variar dependendo do seu projeto. Use o comando `docker ps` para ver os nomes exatos.

**Estrutura do Projeto:**

```
meu-projeto/
├── .env                 # Variáveis de ambiente
├── Dockerfile.dev       # Dockerfile para desenvolvimento
├── docker-compose.dev.yml # Arquivo Docker Compose para desenvolvimento
├── node_modules/        # Dependências do projeto (geradas pelo npm)
├── server.js            # Arquivo principal do servidor
├── package.json
├── package-lock.json
├── controllers/         # (Opcional) Controladores da aplicação
├── models/              # (Opcional) Modelos de dados
├── views/               # (Opcional) Views (se usar um motor de templates)
└── tests/               # (Opcional) Testes da aplicação
```
