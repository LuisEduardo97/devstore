# DevStore

## Descrição

O DevStore é um projeto acadêmico de e-commerce desenvolvido para aplicação prática dos conceitos de DevOps. O projeto será evoluído ao longo das atividades da disciplina, incorporando versionamento com Git, integração contínua, testes automatizados, conteinerização, infraestrutura como código, observabilidade e segurança.

## Objetivo

Desenvolver uma aplicação simples para gerenciamento de produtos de um e-commerce e utilizar o projeto como base para implementação de práticas DevOps durante a disciplina.

## Funcionalidades iniciais

- Cadastrar produtos;
- Listar produtos;
- Buscar produtos;
- Atualizar produtos;
- Excluir produtos.

## Tecnologias

- Node.js;
- JavaScript;
- Express;
- Git;
- GitHub.

## Estrutura do projeto

```text
devstore/
├── src/
├── tests/
├── docs/
├── .gitignore
├── package.json
└── README.md
```

## Backlog inicial

| Prioridade | Funcionalidade | Situação |
|---|---|---|
| Alta | Cadastro de produtos | A fazer |
| Alta | Listagem de produtos | A fazer |
| Média | Busca de produtos | A fazer |
| Média | Atualização de produtos | A fazer |
| Média | Exclusão de produtos | A fazer |
| Alta | Testes automatizados | A fazer |
| Alta | Pipeline de integração contínua | A fazer |

## Responsabilidades

Como esta atividade está sendo desenvolvida individualmente, as responsabilidades de desenvolvimento e operações são executadas pelo mesmo estudante.

**Desenvolvimento:** implementação das funcionalidades, testes e correções da aplicação.

**DevOps/Operações:** versionamento do código, organização das branches, configuração da pipeline, documentação e manutenção do ambiente de execução.

## Estratégia Git

O projeto utilizará uma estratégia simplificada baseada em Gitflow, contendo uma branch principal para versões estáveis, uma branch de desenvolvimento e branches específicas para novas funcionalidades.

Exemplos:

```text
main
develop
feature/cadastro-produto
feature/testes
feature/pipeline
```

Os commits seguirão o padrão Conventional Commits.

Exemplos:

```text
feat(produto): adiciona cadastro de produtos
fix(produto): corrige validação de preço
test(produto): adiciona testes automatizados
docs(readme): atualiza documentação
ci(pipeline): configura integração contínua
```

## Execução do projeto

As instruções para instalação das dependências e execução da aplicação serão atualizadas conforme o desenvolvimento do projeto.