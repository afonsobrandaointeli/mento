# Mento

Mento é um aplicativo desenvolvido para administrar avaliações 360 em times. Este projeto tem como objetivo facilitar a gestão de feedbacks e avaliações entre membros de uma equipe, promovendo um ambiente de melhoria contínua e desenvolvimento pessoal.

## Funcionalidades

- **Criação e Gerenciamento de Avaliações 360:** Permite a criação de avaliações customizadas, definindo critérios e participantes.
- **Envio de Feedbacks:** Os membros do time podem enviar feedbacks anônimos uns para os outros.
- **Relatórios Detalhados:** Geração de relatórios com insights sobre o desempenho individual e do time.
- **Análise de Dados:** Ferramentas para analisar os dados das avaliações, identificando pontos fortes e áreas de melhoria.
- **Notificações:** Sistema de notificações para lembrar os membros sobre prazos e feedbacks pendentes.

## Tecnologias Utilizadas

- **Frontend:** Streamlit
- **Backend:** Python
- **Gerenciamento de Dependências:** Poetry
- **Banco de Dados:** PostgreSQL

## Instalação

### Pré-requisitos

- Python 3.8+
- Poetry
- PostgreSQL

### Passos para Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/mento.git
    cd mento
    ```

2. Instale as dependências:

    ```bash
    poetry install
    ```

3. Configure o banco de dados no arquivo `.env`:

    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=mento_db
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    ```

4. Inicie o aplicativo:

    ```bash
    poetry run streamlit run mento.py
    ```

## Uso

1. Acesse o aplicativo via navegador no endereço `http://localhost:8501`.
2. Faça login com suas credenciais de administrador.
3. Crie uma nova avaliação 360 definindo os critérios e os membros do time.
4. Envie os convites para os membros participarem da avaliação.
5. Acompanhe os feedbacks recebidos e gere relatórios detalhados.

## Contribuição

Contribuições são bem-vindas! Por favor, siga os passos abaixo para contribuir com o projeto:

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## Contato

Para mais informações, entre em contato com [seu-nome](mailto:seu-email@exemplo.com).

