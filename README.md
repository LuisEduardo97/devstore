# DevStore

## Descrição

O DevStore é um projeto acadêmico de e-commerce desenvolvido para aplicação prática dos conceitos de DevOps.

O projeto será evoluído ao longo das atividades da disciplina, incorporando versionamento com Git, integração contínua, testes automatizados, conteinerização, infraestrutura como código, observabilidade, segurança e entrega contínua.

A aplicação é composta por um frontend desenvolvido em React e um backend desenvolvido com Node.js e Express.

## Objetivo

Desenvolver e evoluir uma aplicação de e-commerce utilizando práticas de desenvolvimento e operações, aplicando os conceitos estudados na disciplina de DevOps.

O projeto será utilizado como base para as práticas da disciplina.

## Funcionalidades

- Cadastro de usuários;
- Login administrativo;
- Cadastro de produtos;
- Listagem de produtos;
- Edição de produtos;
- Exclusão de produtos;
- Carrinho de compras;
- Validação de dados;
- API para gerenciamento de produtos;
- Testes automatizados;
- Pipeline de integração contínua.

## Tecnologias

### Frontend

- React;
- JavaScript;
- HTML;
- CSS;
- React Router;
- LocalStorage.

### Backend

- Node.js;
- Express;
- JavaScript;
- API REST.

### DevOps

- Git;
- GitHub;
- Gitflow simplificado;
- Conventional Commits.

## Estrutura do projeto

```text
devstore/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── package-lock.json
│
├── docs/
├── tests/
├── .gitignore
└── README.md
```

## Backlog

| Prioridade | Funcionalidade | Situação |
|---|---|---|
| Alta | Cadastro de produtos | Concluído |
| Alta | Listagem de produtos | Concluído |
| Alta | Integração do frontend React | Concluído |
| Alta | Organização do backend | Concluído |
| Média | Busca de produtos | Em evolução |
| Média | Atualização de produtos | Em evolução |
| Média | Exclusão de produtos | Em evolução |
| Alta | Testes automatizados | Próxima etapa |
| Alta | Pipeline de integração contínua | Próxima etapa |
| Média | Dockerização | Planejado |
| Média | Observabilidade | Planejado |
| Média | Segurança DevSecOps | Planejado |

## Responsabilidades

Como a atividade está sendo desenvolvida individualmente, as responsabilidades de desenvolvimento e operações são executadas pelo mesmo estudante.

**Desenvolvimento:** implementação das funcionalidades, testes, manutenção e correções da aplicação.

**DevOps/Operações:** versionamento do código, organização das branches, Pull Requests, configuração de pipelines, documentação e manutenção do ambiente.

## Estratégia Git

Foi adotada uma estratégia simplificada baseada em Gitflow.

### Branches principais

```text
main
develop
```

A branch `main` representa a versão principal e estável do projeto.

A branch `develop` é utilizada para integração das funcionalidades durante o desenvolvimento.

### Branches de trabalho

Foram utilizadas branches específicas para cada atividade:

```text
feature/cadastro-produto
feature/integracao-frontend
docs/documentacao-pratica1
```

O fluxo utilizado é:

```text
feature/*
    ↓
develop
    ↓
main
```

As alterações das branches de funcionalidades são integradas à branch `develop` por meio de Pull Requests.

## Pull Requests realizados

### Pull Request #1

```text
feature/cadastro-produto → develop
```

Implementação da API Node.js/Express com:

- cadastro de produtos;
- listagem de produtos;
- validação de nome;
- validação de preço.

### Pull Request #2

```text
feature/integracao-frontend → develop
```

Integração do frontend React ao DevStore e reorganização da aplicação nas pastas:

```text
frontend/
backend/
```

## Conventional Commits

Os commits seguem o padrão Conventional Commits.

Exemplos utilizados no projeto:

```text
chore(projeto): cria estrutura inicial do DevStore

feat(produto): adiciona cadastro e listagem de produtos

feat(projeto): integra frontend React e reorganiza backend
```

Outros tipos que poderão ser utilizados:

```text
feat: nova funcionalidade
fix: correção
test: testes
docs: documentação
ci: integração contínua
refactor: refatoração
chore: manutenção
```

## Execução do backend

Acesse a pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
node src/server.js
```

O backend será iniciado em:

```text
http://localhost:3000
```

## Execução do frontend

Acesse a pasta:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

No PowerShell, execute:

```powershell
$env:PORT=3001; npm start
```

O frontend será iniciado em:

```text
http://localhost:3001
```

## Evidências da Prática 1

Durante a Prática 1 foram realizadas as seguintes atividades:

- criação do repositório Git;
- criação das branches `main`, `develop` e branches de trabalho;
- utilização de Conventional Commits;
- execução da API;
- cadastro e listagem de produtos;
- envio das branches para o GitHub;
- criação de Pull Requests;
- merge das funcionalidades na branch `develop`;
- integração do frontend React;
- reorganização do backend;
- execução simultânea do frontend e backend;
- sincronização do repositório local com o GitHub.

## Próxima etapa

A próxima etapa será a Prática 2, envolvendo:

- testes unitários;
- testes de integração;
- cobertura de testes;
- build automatizado;
- pipeline de integração contínua;
- geração de artefatos.