# Prática 3 - Containerização com Docker

## Projeto

DevStore - aplicação acadêmica de e-commerce desenvolvida para aplicação prática dos conceitos de DevOps.

## Objetivo

A Prática 3 teve como objetivo realizar a containerização da aplicação DevStore utilizando Docker, permitindo que o backend seja executado de forma padronizada, isolada e reproduzível.

## Preparação do ambiente

Para execução dos containers no Windows foi configurado o WSL 2 com uma distribuição Ubuntu.

Também foi instalado o Docker Desktop utilizando o backend WSL 2.

A configuração do ambiente foi validada por meio dos comandos:

```bash
docker --version
docker compose version
```

Os testes confirmaram o funcionamento do Docker e do Docker Compose no ambiente de desenvolvimento.

## Dockerfile

Foi criado um arquivo `Dockerfile` na raiz do projeto.

A imagem utiliza Node.js 24 sobre Alpine Linux:

```dockerfile
FROM node:24-alpine
```

Foi definido `/app` como diretório de trabalho:

```dockerfile
WORKDIR /app
```

Os arquivos responsáveis pelas dependências do backend são copiados para a imagem:

```dockerfile
COPY backend/package*.json ./
```

As dependências necessárias para execução da aplicação são instaladas com:

```dockerfile
RUN npm ci --omit=dev
```

Posteriormente, o código-fonte do backend é copiado para dentro da imagem:

```dockerfile
COPY backend/src ./src
```

A aplicação utiliza a porta 3000:

```dockerfile
EXPOSE 3000
```

Por fim, foi definido o comando responsável pela inicialização da aplicação:

```dockerfile
CMD ["node", "src/server.js"]
```

Dessa forma, a imagem contém os arquivos e dependências necessários para executar o backend do DevStore de maneira independente do ambiente local.

## Configuração do .dockerignore

Também foi criado o arquivo `.dockerignore`.

O objetivo desse arquivo é impedir que arquivos e diretórios desnecessários sejam enviados ao contexto de construção da imagem Docker.

Foram ignorados:

```text
**/node_modules
**/coverage
**/dist
**/tests
.git
.github
frontend
docs
*.log
.env
```

A utilização do `.dockerignore` contribui para reduzir o contexto de build e evita a inclusão de arquivos que não são necessários para a execução da aplicação.

## Construção da imagem Docker

A imagem Docker do DevStore foi construída por meio do comando:

```bash
docker build -t devstore:1.0.0 .
```

Foi utilizada a identificação `devstore:1.0.0`, permitindo o versionamento da imagem.

Após a conclusão do processo, a existência da imagem foi confirmada com:

```bash
docker images devstore
```

O resultado apresentou a imagem `devstore:1.0.0` criada no ambiente Docker.

## Execução do container

Após a criação da imagem, foi iniciado um container com o comando:

```bash
docker run -d --name devstore-container -p 3000:3000 devstore:1.0.0
```

Nesse comando:

- `-d` executa o container em segundo plano;
- `--name devstore-container` define um nome para o container;
- `-p 3000:3000` realiza o mapeamento da porta 3000 do computador para a porta 3000 do container;
- `devstore:1.0.0` identifica a imagem utilizada.

A execução foi verificada através do comando:

```bash
docker ps
```

O resultado confirmou o container `devstore-container` em estado de execução e a publicação da porta 3000.

## Validação da aplicação containerizada

Com o container em execução, a aplicação foi acessada pelo navegador através do endereço:

```text
http://localhost:3000
```

A API respondeu corretamente com:

```json
{"mensagem":"API DevStore funcionando com sucesso!"}
```

Essa resposta confirmou que a aplicação estava sendo executada corretamente dentro do ambiente containerizado.

Também foram consultados os logs do container:

```bash
docker logs devstore-container
```

A saída apresentada foi:

```text
DevStore rodando em http://localhost:3000
```

Dessa forma, foi possível confirmar tanto a inicialização do servidor quanto o funcionamento da aplicação.

## Integração do Docker com a pipeline de CI

A pipeline de Integração Contínua desenvolvida na Prática 2 foi atualizada para incluir também a construção automática da imagem Docker.

Foram adicionadas ao arquivo `.github/workflows/ci.yml` as seguintes etapas:

```yaml
- name: Construir imagem Docker
  run: docker build -t devstore:${{ github.run_number }} .
  working-directory: ${{ github.workspace }}

- name: Validar imagem Docker
  run: docker image inspect devstore:${{ github.run_number }}
  working-directory: ${{ github.workspace }}
```

A primeira etapa realiza automaticamente o build da imagem Docker no ambiente do GitHub Actions.

A segunda etapa verifica se a imagem foi criada corretamente durante a execução da pipeline.

Com essa atualização, o fluxo de Integração Contínua passou a contemplar:

```text
Instalação de dependências
        ↓
Análise estática com ESLint
        ↓
Build da aplicação
        ↓
Testes automatizados
        ↓
Build da imagem Docker
        ↓
Validação da imagem Docker
        ↓
Publicação do artefato
```

Essa integração amplia a automação do projeto, reduzindo a necessidade de tarefas manuais e garantindo que a imagem Docker seja validada a cada execução da pipeline.

## Versionamento

As alterações referentes à containerização foram desenvolvidas na branch:

```text
feature/pratica3-docker
```

Os arquivos `Dockerfile`, `.dockerignore` e a atualização da pipeline foram versionados utilizando o padrão Conventional Commits.

Foi utilizado o commit:

```text
feat(docker): adiciona containerizacao e integra build a pipeline
```

A documentação da prática também foi incluída no controle de versão.

## Resultado

A aplicação DevStore foi containerizada com sucesso utilizando Docker.

Durante a prática foram realizados:

- configuração do ambiente WSL 2;
- instalação e validação do Docker Desktop;
- criação do Dockerfile;
- criação do `.dockerignore`;
- construção de uma imagem Docker versionada;
- execução de um container;
- publicação da porta 3000;
- validação da aplicação pelo navegador;
- análise dos logs do container;
- integração da construção da imagem Docker à pipeline de Integração Contínua;
- versionamento das alterações com Git.

A adoção do Docker tornou o ambiente da aplicação mais padronizado e reproduzível. Dessa maneira, o DevStore pode ser executado em ambientes compatíveis com Docker mantendo as mesmas dependências e configurações definidas durante a construção da imagem.