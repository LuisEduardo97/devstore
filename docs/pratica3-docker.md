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