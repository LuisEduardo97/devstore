# Prática 4 — Infraestrutura como Código e Orquestração

## 1. Objetivo

Esta prática teve como objetivo ampliar a aplicação DevStore conteinerizada, aplicando conceitos de Infraestrutura como Código (IaC), automação e orquestração.

Foram utilizadas as ferramentas Terraform, Ansible, Docker e Kubernetes, permitindo provisionar recursos, automatizar tarefas, executar múltiplas réplicas da aplicação e demonstrar mecanismos de escalabilidade e self-healing.

## 2. Estrutura da infraestrutura

A infraestrutura do projeto foi organizada no diretório `infrastructure`, separando as tecnologias utilizadas:

```text
infrastructure/
├── terraform/
├── ansible/
└── kubernetes/

## 3. Terraform — Infrastructure as Code

O Terraform foi utilizado para representar e provisionar a infraestrutura da aplicação DevStore por meio de código.

Os principais arquivos utilizados foram:

- `main.tf`
- `variables.tf`
- `outputs.tf`
- `.terraform.lock.hcl`
- `.gitignore`

Durante a execução foram utilizados os comandos:

```text
terraform init
terraform validate
terraform plan
terraform apply
terraform output
```

O Terraform provisionou o contêiner `devstore-iac`, utilizando a imagem Docker da aplicação DevStore.

O serviço foi configurado com o seguinte mapeamento de portas:

```text
localhost:3001 -> container:3000
```

A utilização do Terraform demonstrou as vantagens da Infraestrutura como Código, permitindo que a configuração seja versionada, reproduzida e modificada de maneira controlada.

## 4. Ansible — Automação

O Ansible foi utilizado para automatizar tarefas relacionadas à preparação e recuperação do ambiente da aplicação DevStore.

Os arquivos utilizados foram:

```text
infrastructure/ansible/
├── inventory.ini
└── playbook.yml
```

A execução foi realizada no ambiente WSL/Ubuntu. Inicialmente, o playbook foi validado para identificar possíveis problemas de sintaxe e configuração.

Em seguida, o playbook foi executado para automatizar o gerenciamento da aplicação.

Também foi realizado um teste de recuperação, no qual o contêiner da DevStore foi interrompido propositalmente. Após a execução do Ansible, o serviço foi restaurado, demonstrando como a automação pode reduzir intervenções manuais e tornar o ambiente mais previsível.

## 5. Kubernetes — Orquestração

O Kubernetes foi habilitado no Docker Desktop utilizando um cluster local com o método de provisionamento `kind`.

A comunicação com o cluster foi validada por meio do comando:

```text
kubectl get nodes
```

O nó `desktop-control-plane` apresentou estado `Ready`, confirmando o funcionamento do ambiente Kubernetes.

Foram criados os seguintes manifestos:

```text
infrastructure/kubernetes/
├── configmap.yml
├── deployment.yml
└── service.yml
```

### 5.1 ConfigMap

O `ConfigMap` denominado `devstore-config` foi criado para fornecer configurações à aplicação:

```text
PORT=3000
NODE_ENV=production
```

Para permitir o uso da variável de ambiente, o backend foi ajustado para:

```javascript
const PORT = process.env.PORT || 3000;
```

### 5.2 Deployment

O `Deployment` denominado `devstore-deployment` utiliza a imagem:

```text
devstore:1.0.0
```

A configuração padrão foi definida com duas réplicas e porta interna 3000.

### 5.3 Service

O `Service` denominado `devstore-service` foi configurado como `NodePort`, utilizando:

```text
port: 3000
targetPort: 3000
nodePort: 30080
```

## 6. Validação e implantação no Kubernetes

Antes da implantação dos recursos no cluster, os manifestos foram validados utilizando o modo `dry-run`:

```text
kubectl apply --dry-run=client -f infrastructure/kubernetes/configmap.yml -f infrastructure/kubernetes/deployment.yml -f infrastructure/kubernetes/service.yml
```

A validação confirmou corretamente os três recursos:

```text
configmap/devstore-config created (dry run)
deployment.apps/devstore-deployment created (dry run)
service/devstore-service created (dry run)
```

Após essa verificação, os manifestos foram aplicados ao cluster Kubernetes.

O comando `kubectl get pods` confirmou inicialmente duas réplicas da aplicação, ambas apresentando:

```text
READY: 1/1
STATUS: Running
RESTARTS: 0
```

O comando `kubectl get all` também confirmou a criação do Service, Deployment e ReplicaSet.

## 7. Validação dos logs e acesso à API

Os logs das réplicas foram verificados por meio do comando:

```text
kubectl logs -l app=devstore --prefix=true --tail=20
```

As duas instâncias registraram:

```text
DevStore rodando em http://localhost:3000
```

Inicialmente foi realizado um teste de acesso direto ao NodePort:

```text
Invoke-WebRequest http://localhost:30080
```

O teste apresentou a mensagem:

```text
Impossível conectar-se ao servidor remoto
```

Esse erro foi mantido como evidência do processo de troubleshooting.

Como solução, foi realizado o encaminhamento de portas:

```text
kubectl port-forward service/devstore-service 30080:3000
```

O encaminhamento apresentou:

```text
Forwarding from 127.0.0.1:30080 -> 3000
Forwarding from [::1]:30080 -> 3000
```

Em uma segunda janela do PowerShell, o acesso foi testado novamente:

```text
Invoke-WebRequest http://localhost:30080
```

O resultado foi:

```text
StatusCode        : 200
StatusDescription : OK
Content           : {"mensagem":"API DevStore funcionando com sucesso!"}
```

Dessa forma, foi comprovado que a aplicação implantada no Kubernetes estava funcionando corretamente.

## 8. Teste de escalabilidade

Para demonstrar a escalabilidade horizontal da aplicação, a quantidade de réplicas do Deployment foi alterada durante os testes.

### 8.1 Uma réplica

O Deployment foi reduzido para uma única réplica:

```text
kubectl scale deployment devstore-deployment --replicas=1
```

Após a alteração, apenas um Pod permaneceu em estado `Running`.

### 8.2 Três réplicas

Em seguida, o ambiente foi escalado para três réplicas:

```text
kubectl scale deployment devstore-deployment --replicas=3
```

O Kubernetes criou automaticamente novos Pods até atingir três instâncias disponíveis, todas em estado `Running`.

### 8.3 Dez réplicas

Por fim, o Deployment foi escalado para dez réplicas:

```text
kubectl scale deployment devstore-deployment --replicas=10
```

O Kubernetes criou dez Pods da aplicação DevStore, todos apresentando:

```text
READY: 1/1
STATUS: Running
```

O teste demonstrou, na prática, a capacidade de escalabilidade horizontal do workload.

## 9. Self-healing — Autocura

Com dez réplicas em funcionamento, um dos Pods foi removido manualmente utilizando:

```text
kubectl delete pod devstore-deployment-76c6d4dd5-r67sc
```

Após a exclusão, o Kubernetes identificou que o número de instâncias disponíveis estava abaixo do estado desejado e criou automaticamente um novo Pod.

O Deployment permaneceu apresentando:

```text
READY: 10/10
UP-TO-DATE: 10
AVAILABLE: 10
```

Esse comportamento demonstrou o mecanismo de `self-healing`, ou autocura, no qual o Kubernetes procura manter automaticamente o estado desejado definido pelo Deployment.

## 10. Relação com Auto-scaling

Os testes