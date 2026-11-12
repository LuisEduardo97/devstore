# Prática 2 - Pipeline de Integração Contínua

## Objetivo

A Prática 2 tem como objetivo automatizar o processo de validação do projeto DevStore por meio de uma pipeline de Integração Contínua utilizando GitHub Actions.

A automação permite que alterações realizadas no código sejam verificadas antes de serem integradas às branches principais do projeto.

## Tecnologia utilizada

Para implementação da pipeline foram utilizadas as seguintes tecnologias:

- GitHub Actions;
- Node.js;
- npm;
- Jest;
- Supertest;
- Git e GitHub.

## Testes automatizados

Foram implementados cinco testes automatizados no backend do projeto.

### Testes unitários

Foram criados dois testes unitários para validar regras isoladas da aplicação:

1. validação de produto com nome e preço válidos;
2. rejeição de produto com preço inválido.

Arquivo:

`backend/tests/unit/produtoService.test.js`

### Testes de integração

Foram criados três testes de integração para verificar o funcionamento das rotas da API:

1. GET / - valida o funcionamento da API;
2. POST /produtos - valida o cadastro de produto;
3. GET /produtos - valida a listagem de produtos.

Arquivo:

`backend/tests/integration/app.test.js`

## Cobertura de testes

A execução dos testes com Jest apresentou os seguintes resultados:

- Statements: 92%;
- Branches: 80%;
- Functions: 100%;
- Lines: 92%.

Foram executadas duas suítes de testes, totalizando cinco testes aprovados.

## Workflow do GitHub Actions

O workflow foi criado no arquivo:

`.github/workflows/ci.yml`

A pipeline é executada automaticamente quando uma Pull Request é aberta para as branches:

- main;
- develop.

Os eventos configurados são:

- opened;
- synchronize;
- reopened.

O evento `synchronize` permite que a pipeline seja executada novamente sempre que um novo commit for enviado para a branch de uma Pull Request já aberta.

## Etapas automatizadas

O workflow executa atualmente as seguintes etapas:

1. baixar o código do repositório;
2. configurar o Node.js;
3. instalar automaticamente as dependências com `npm ci`;
4. executar os testes unitários e de integração;
5. gerar o relatório de cobertura.

O comando utilizado pela pipeline é:

`npm run test:ci`

## Fail Fast

A pipeline aplica o conceito de Fail Fast.

Caso algum teste automatizado apresente falha, o job do GitHub Actions será marcado como falha e a validação da Pull Request não será concluída com sucesso.

Dessa forma, problemas podem ser identificados antes que o código seja integrado às branches principais do projeto.

## Fluxo atual

O fluxo implementado nesta etapa é:

Pull Request
↓
Checkout do código
↓
Configuração do Node.js
↓
Instalação das dependências
↓
Testes automatizados
↓
Relatório de cobertura
↓
Sucesso ou falha da pipeline

## Próximas etapas

A documentação será complementada com o build automatizado, análise estática, geração e versionamento do artefato, conforme os demais requisitos da Prática 2.