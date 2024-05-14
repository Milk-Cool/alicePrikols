const sounds = require("../data/sounds/sounds.json");

let answers = {};

module.exports = rbody => {
    const original = `<speaker audio="dialogs-upload/2bc64863-4653-4ec5-b2fb-b74c7aa69b95/f452d89c-b714-4862-be1a-ad9eb2034151.opus">`;

    let { command } = rbody.request;
    command = command.toLowerCase().match(/[а-я0-9 ]/g)?.join("") ?? "";
    const { session_id } = rbody.session;

    const word2num = word => ({
        "один": 1,
        "два": 2,
        "три": 3,
        "четыре": 4,
        "пять": 5,
        "шесть": 6,
        "семь": 7,
        "восемь": 8,
        "девять": 9
    })[word];

    let ans;
    if(!command) ans = `Скажите "начать", чтобы играть.
        Скажите "правила", чтобы узнать правила.
        Скажите "звуки", чтобы узнать, откуда автор взял звуки.
        Скажите "стоп", чтобы выйти.`;
    else switch(command) {
        case "начать":
        case "играть":
        case "да":
            const key = Object.keys(sounds)[Math.floor(Math.random() * Object.keys(sounds).length)];
            const answer = parseInt(key);
            answers[session_id] = answer;
            ans = sounds[key];
            break;
        case "правила":
        case "как играть":
            ans = `Правила простые: вы услышите аудиозапись с разными звуками.
            Вам нужно определить, сколько будет таких звуков в аудиозаписи:
            ${original}
            Ну что, готовы начать?`
            break;
        case "звуки":
            ans = `Звуки взяты с сайта freesound.org.`
            break;
        default:
            if(!answers[session_id]) {
                ans = `Неправильная команда!`;
                break;
            }
            const num = parseInt(command) == command ? command : word2num(command);
            if(!num) {
                ans = `Это не натуральное число меньше 10!`;
                break;
            }
            if(num == answers[session_id])
                ans = `Правильно! Сыграем ещё?`;
            else
                ans = `Неправильно! Попробуем ещё?`;
            break;
    }

    const body = {
      "response": {
          "text": ans?.replace(/<.+/g, "") || "*звук*",
          "tts": ans,
          "end_session": false,
          "should_listen": false
        },
        "version": "1.0"
    };

    return body;
};