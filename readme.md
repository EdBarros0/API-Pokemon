# PokéManager API

API REST para gerenciamento de Pokémons, desenvolvida para a disciplina de Tópicos Especiais em Engenharia de Software.

**Aluno:** Eduardo Almeida de Barros Evangelista

## Tecnologias

- Node.js
- TypeScript
- Express
- Swagger / OpenAPI

## Arquitetura

O projeto segue princípios de Clean Architecture, separando responsabilidades entre domínio, aplicação, infraestrutura e composição da aplicação.

```text
src/
├── domain/          # Entidades, erros e contratos
├── application/     # DTOs e casos de uso
├── infrastructure/  # Repositório em memória e camada HTTP
└── main/            # Configuração, factories e servidor
```

Os dados são mantidos em memória por meio do `InMemoryPokemonRepository`.

## Como executar

```bash
npm install
npm run run-dev
```

A API será iniciada em `http://localhost:3000`.

## Documentação Swagger

A documentação interativa está disponível em:

```text
http://localhost:3000/api/docs
```

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/api/v1/pokemons` | Lista todos os Pokémons |
| GET | `/api/v1/pokemons?type=Electric` | Filtra Pokémons por tipo |
| GET | `/api/v1/pokemons/:id` | Busca um Pokémon por ID |
| POST | `/api/v1/pokemons` | Cria um Pokémon |
| PUT | `/api/v1/pokemons/:id` | Atualiza um Pokémon |
| DELETE | `/api/v1/pokemons/:id` | Remove um Pokémon |

## Exemplo de criação

```http
POST /api/v1/pokemons
Content-Type: application/json
```

```json
{
  "id": "25",
  "name": "Pikachu",
  "type": "Electric",
  "hp": 35,
  "attack": 55,
  "defense": 40
}
```

## Status HTTP utilizados

- `200 OK`: consulta ou atualização realizada.
- `201 Created`: Pokémon criado.
- `204 No Content`: Pokémon removido.
- `400 Bad Request`: dados inválidos.
- `404 Not Found`: Pokémon não encontrado.
- `409 Conflict`: já existe um Pokémon com o mesmo ID.
