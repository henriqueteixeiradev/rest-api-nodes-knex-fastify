# Iniciando o package.json

## O que ele faz?

O package.json é um arquivo que contém informações sobre o projeto, como nome, versão, dependências, scripts, etc.

## Porque é importante?

É importante para que o Node.js saiba como o projeto deve ser executado.

```bash
npm init -y
```

# Instalando o typescript

## O que ele faz?

O TypeScript é um superconjunto de JavaScript que adiciona tipagem estática ao código.

## Porque é importante?

A tipagem estática ajuda a evitar erros de tipagem em tempo de execução.

```bash
pnpm add typescript -D
```

# Instalando o TSC

## O que ele faz?

O TSC é o compilador do TypeScript.

## Porque é importante?

Ele é responsável por transformar o código TypeScript em JavaScript.

```bash
npx tsc --init
```

# Instalando Fastify

## O que ele faz?

Fastify é um framework web para Node.js.

## Porque é importante?

Ele é rápido e leve.

```bash
pnpm add fastify
```

# Instalando pacote Types Node

## O que ele faz?

O pacote Types Node é um pacote que contém os tipos do Node.js.

## Porque é importante?

Ele é necessário para que o TypeScript saiba como tipar o Node.js.

```bash
pnpm add @types/node -D
```

# Instalando o TSX

## O que ele faz?

O TSX é um pacote que contém os tipos do JSX.

## Porque é importante?

Ele é necessário para que o TypeScript saiba como tipar o JSX.

```bash
pnpm add tsx -D
```
## Criação de uma nova migration knex

```bash
npx knex migrate:make nome_da_migration
```