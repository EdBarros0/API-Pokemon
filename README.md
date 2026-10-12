# PokéManager API

API REST para cadastro e gerenciamento de Pokémons, desenvolvida em TypeScript e Express. Os dados são armazenados em memória e são reiniciados quando o servidor é reiniciado.

## Tecnologias

- Node.js e TypeScript
- Express 5
- Swagger / OpenAPI
- Repositório em memória

## Requisitos

- Node.js e npm instalados

## Instalação e execução

Na raiz do projeto, instale as dependências e inicie o servidor:

```bash
npm install
npm run run-dev
```

A API ficará disponível em `http://localhost:3000`. A documentação Swagger pode ser acessada em `http://localhost:3000/api/docs`.

Para verificar os tipos TypeScript:

```bash
npm run typecheck
```

O projeto não possui um script automatizado de testes configurado. Os cenários HTTP podem ser exercitados manualmente com Bruno, cURL ou pela interface Swagger.

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/api/v1/pokemons` | Lista os Pokémons |
| `GET` | `/api/v1/pokemons?type=Electric` | Filtra por tipo |
| `GET` | `/api/v1/pokemons/:id` | Busca por ID |
| `POST` | `/api/v1/pokemons` | Cadastra um Pokémon |
| `PUT` | `/api/v1/pokemons/:id` | Atualiza um Pokémon |
| `DELETE` | `/api/v1/pokemons/:id` | Remove um Pokémon |

## Exemplos

### Cadastrar um Pokémon

```http
POST /api/v1/pokemons
Content-Type: application/json
```

Corpo:

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

Resposta `201 Created`:

```json
{
  "message": "Pokémon criado com sucesso.",
  "data": {
    "id": "25",
    "name": "Pikachu",
    "type": "Electric",
    "hp": 35,
    "attack": 55,
    "defense": 40
  }
}
```

### Erros de domínio

Ao cadastrar novamente um ID já existente, a API responde `409 Conflict`:

```json
{
  "status": "error",
  "statusCode": 409,
  "message": "Já existe um Pokémon cadastrado com este ID."
}
```

Ao buscar um ID inexistente, a API responde `404 Not Found`:

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Pokémon não encontrado na base de dados."
}
```

Erros inesperados retornam `500` com uma mensagem genérica, sem expor detalhes internos.

## Testes manuais com Bruno

Com o servidor em execução, configure a base URL no Bruno como `http://localhost:3000` e valide estes cenários:

1. Envie o exemplo de cadastro para `POST /api/v1/pokemons`; confirme `201`.
2. Envie o mesmo cadastro novamente; confirme `409` e a resposta de conflito acima.
3. Consulte `GET /api/v1/pokemons/id-inexistente`; confirme `404` e a resposta de não encontrado acima.
4. Consulte `GET /api/v1/pokemons` para conferir os registros criados durante a execução atual do servidor.

## Status HTTP

- `200 OK`: consulta ou atualização concluída.
- `201 Created`: Pokémon cadastrado.
- `204 No Content`: Pokémon removido.
- `400 Bad Request`: dados inválidos no corpo da atualização.
- `404 Not Found`: Pokémon não encontrado.
- `409 Conflict`: ID já cadastrado.
- `500 Internal Server Error`: falha inesperada.
