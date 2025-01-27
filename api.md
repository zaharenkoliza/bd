````markdown
# API Documentation для игры "Саботёр"

## Описание

Это API предназначено для взаимодействия с сервером игры "Саботёр". Игроки могут разгрывать карты на поле или игроках. В этой документации представлены все основные методы для взаимодействия с игрой.

### Авторизация

Для работы с API необходимо использовать **токен пользователя**. Токен можно получить через эндпоинт авторизации и регистрации.

## Методы API

### 1. Авторизация

**POST** `/api/auth.php`

**Описание**: Авторизация уже существующего пользователя, получение токена и списка пользователей.

**Тело запроса**:

```json
{
  "login": "player_name",
  "password": "player_password"
}
```
````

**Ответ**:

```json
{
  "status": "success",
  "info": {
    "status": "success",
    "token": "user_token",
    "users": [
      {
        "login": "login_user"
      }
    ]
  }
}
```

Если произошла ошибка:

```json
{
  "status": "error",
  "message": "Password is wrong"
}
```

### 2. Регистрация

**POST** `/api/register.php`

**Описание**: Регистрация нового пользователя, получение токена и списка доступных комнат.

**Тело запроса**:

```json
{
  "login": "player_name",
  "password": "player_password"
}
```

**Ответ**:

```json
{
  "status": "success",
  "info": {
    "status": "success",
    "token": "user_token",
    "users": [
      {
        "login": "login_user"
      }
    ]
  }
}
```

Если произошла ошибка:

```json
{
  "status": "error",
  "message": "Password should be at least 3 characters long"
}
```

### 3. Смена пароля

**POST** `/api/change_password.php`

**Описание**: Смена пароля пользователя.

**Тело запроса**:

```json
{
  "login": "player_name",
  "password": "password",
  "newPassword": "new_password"
}
```

**Ответ**:

```json
{
  "status": "success",
  "info": {
    "status": "success",
    "message": "Password changed successfully"
  }
}
```

Если произошла ошибка:

```json
{
  "status": "error",
  "message": "Invalid username or password"
}
```

### 4. Создание комнаты

**POST** `/api/new_room.php`

**Описание**: Создание новой игровой комнаты.

**Тело запроса**:

```json
{
  "amount_of_players": 4,
  "time_for_move": 30
}
```

**Ответ**:

```json
{
  "status": "success",
  "info": {
    "status": "success",
    "message": "Room created successfully",
    "id_room": "new_room_id",
    "available_rooms": [
      {
        "id": "room_id",
        "count": "count_players_in_room",
        "amount_of_players": "amount_of_players",
        "time_for_move": "time_for_move"
      }
    ]
  }
}
```

Если произошла ошибка:

```json
{
  "status": "error",
  "message": "Wrong amount of players"
}
```

### 5. Получение списка комнат

**GET** `/api/available_rooms.php`

**Описание**: Получение списка доступных комнат для игры.

**Ответ**:

```json
{
  "status": "success",
  "info": {
	[
      {
        "id": "room_id",
        "count": "count_players_in_room",
        "amount_of_players": "amount_of_players",
        "time_for_move": "time_for_move"
      }
    ]
  }
}
```

Если не удалось получить список комнат:

```json
{
  "status": "error",
  "message": "Error"
}
```

Если нет свободных комнат:

```json
{
  "status": "no-success",
  "message": "No available rooms"
}
```

### 6. Вход в комнату

**POST** `/api/join_room.php`

**Описание**: Позволяет игроку войти в выбранную игровую комнату.

**Тело запроса**:

```json
{
  "room": 1,
  "name": "liza"
}
```

**Ответ**:

```json
{
  "status": "success",
  "info": {
    "status": "User successfully connected to the room",
    "id_player": "new_player_id",
    "players_in_room": [
      {
        "login_user": "login_user",
        "name": "player_name"
      }
    ]
  }
}
```

Если не удалось войти в комнату:

```json
{
  "status": "error",
  "message": "Room does not exist"
}
```

### 7. Сыграть карту на игроке

**POST** `/api/play_card_on_player.php`

**Описание**: Разгрывает карту действия на игроке

**Тело запроса**:

```json
{
  "card": 1,
  "player": 15
}
```

**Ответ**:

```json
{
  "status": "success",
  "info": {
    "game_status": "game_status",
    "you": {
      "id_player": "id",
      "role": "role",
      "name": "player_name"
    },
    "current_move": {
      "id_player": "id",
      "end_time": "end_time"
    },
    "cards_on_field": [
      {
        "id_card": "id",
        "x": "x",
        "y": "y",
        "rotation": "rotation"
      }
    ],
    "players": [
      {
        "login_user": "login_user",
        "name": "player_name"
      }
    ],
    "cards_in_hand": ["id_card"],
    "moves_off": "moves"
  }
}
```

Если не удалось совершить ход:

```json
{
  "status": "error",
  "message": "Wrong items or no broken items"
}
```

### 8. Разграть карту на поле

**POST** `/api/chech_and_place_card.php`

**Описание**: Разгрывает карту туннеля на поле

**Тело запроса**:

```json
{
  "card": 1,
  "x": 1,
  "y": 1,
  "rot": 0
}
```

**Ответ**:

```json
{
  "status": "success",
  "info": {
    "game_status": "game_status",
    "you": {
      "id_player": "id",
      "role": "role",
      "name": "player_name"
    },
    "current_move": {
      "id_player": "id",
      "end_time": "end_time"
    },
    "cards_on_field": [
      {
        "id_card": "id",
        "x": "x",
        "y": "y",
        "rotation": "rotation"
      }
    ],
    "players": [
      {
        "login_user": "login_user",
        "name": "player_name"
      }
    ],
    "cards_in_hand": ["id_card"],
    "moves_off": "moves"
  }
}
```

Если не удалось совершить ход:

```json
{
  "status": "error",
  "message": "Wrong way"
}
```

### 9. Обновление игрового поля

**POST** `/api/get_game_state.php`

**Описание**: Обновление игрового поля, проверка текущего состояния игры.

**Тело запроса**:

```json
{
  "room": 1
}
```

**Ответ**:

```json
{
  "status": "success",
  "info": {
    "game_status": "game_status",
    "you": {
      "id_player": "id",
      "role": "role",
      "name": "player_name"
    },
    "current_move": {
      "id_player": "id",
      "end_time": "end_time"
    },
    "cards_on_field": [
      {
        "id_card": "id",
        "x": "x",
        "y": "y",
        "rotation": "rotation"
      }
    ],
    "players": [
      {
        "login_user": "login_user",
        "name": "player_name"
      }
    ],
    "cards_in_hand": ["id_card"],
    "moves_off": "moves"
  }
}
```

Если не удалось получить данные:

```json
{
  "status": "error",
  "message": "Wrong token"
}
```

### 10. Выход из игры

**POST** `/api/quit.php`

**Описание**: Позволяет игроку покинуть игру.

**Тело запроса**:

```json
{
  "room": 1
}
```

**Ответ**:

```json
{
  "status": "success",
  "info": {
	[
      {
        "id": "room_id",
        "count": "count_players_in_room",
        "amount_of_players": "amount_of_players",
        "time_for_move": "time_for_move"
      }
    ]
  }
}
```

Если не удалось покинуть игру:

```json
{
  "status": "error",
  "message": "Wrong token"
}
```
