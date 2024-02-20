# Mi-Shop

### Установка проекта и его запуск

### `Терминал`

**NodeJS**

Перед установкой и запуска проекта проверьте ПК установлен ли у вас среда `NodeJS` на терминале:

```no-highlight
node -v или  node --version
```

если вам сообщает что такая команда не распознано, то переходите по следующий ссылке для установки [NodeJS](https://www.google.com "NodeJS")

Теперь откройте ту директорию в котором находится само проект и пропишите следующую команду:

```no-highlight
npm i или npm install
```

Команда `npm` и `npx` одновременно установливается при установке `NodeJS`

### `Запуск проекта и сборка`

**JSON-SERVER**

Перед началом проверьте установлен ли у вас `JSON-SERVER`  глобально, если нет то на терминале:

```no-highlight
npm i -g json-server или npm install --global json-server
```

а затем 

```no-highlight
npm i json-server или npm install json-server
```

после такой установке `json-server` овладает типа `npm` или `npx`. Почему так? Давайте посравним:

```no-highlight
npx json-server [--helpers path]
```

или

```no-highlight
json-server [--helpers path]
```

всё так и вам рекомендую использовать 2-вариант. Ещё подробно можете прочитать как документаций [JSON-SERVER](https://www.npmjs.com/package/json-server "Документация").

#### `!!! Не забудьте проверять`

Некоторые разработчики на файле `package.json` прописывают типа следующий код:

```no-highlight
"scripts": {

    "build": "webpack --mode=production",

    .........

    "server": "json-server --watch shop_db.json --port 3001"

  },
```

`--watch [path]` отслеживает где находиться `DB.JSON`.

`--port [port number]` открываетвашу локальную IP в том пустом порте которого вы укозали, на данный момент `--port 3001`. Не забудьте что `port` всегда открывается на четырех значном числе.

**Запуск проект**

Для запуска пишем следующий команду:

```
npm start
```

**Сборка проекта**

Чтобы собирать всю нашу проект пишем следующий команду:

```
npm run build
```

### `Кодинг`

Для разработки `JavaScript` кода используйте **_module_** папку, а для основного файла на самом директорий **_src_** можете создавать файле и подключить другие файлы.

## Автор

`Khaetbek Akhmadzhonov` ссылка на [портфолио](http://whpchust.ru/ "Khaetbek - Portfolio")