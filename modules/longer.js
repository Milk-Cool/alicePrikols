const themes = require("../data/longer/themes.json");

class Room {
    constructor() {
        this.theme = "";
        this.words = ["", ""];
        this.players = [-1, -1];
    }
}

class State {
    constructor() {
        this.room = -1;
        this.player = 0;
        this.start = new Date(0);
    }
}

const timeout = 35000;
const NOPE = "nope";

let counter = 0;
/** @type {Room[]} */
const rooms = [];
/** @type {Object.<string, State>} */
const states = {};

const sound = `<speaker audio="dialogs-upload/0f6af6b3-4f11-4c66-a851-e6ee9993dbbd/e1cf9076-2de4-4a90-9657-422a7f9611ab.opus">`;

module.exports = rbody => {
    let { command } = rbody.request;
    command = command.toLowerCase().match(/[а-я ]/g)?.join("") ?? ""
    /** @type {string} */
    const { session } = rbody;
    const { session_id } = session;
    if(!(session_id in states))
        states[session_id] = new State();
    const { state } = rbody;
    let updateState = state?.user ?? {};
    if(!("played" in updateState))
        updateState.played = 0;
    if(!("won" in updateState))
        updateState.won = 0;
    let final = false;

    let ans;
    
    if(states[session_id].room == -1) {
        if(command == "правила") {
            ans = `Объясняю правила:
Вы играете с союзником, если таковые находятся.
Вам даётся тема слова.
Вам нужно придумать самое длинное слово на эту тему, а потом сказать "Алиса" и ваше слово.
Тот, кто придумал слово длиннее - выигрывает.`;
        } else if(command == "статистика") {
            ans = `${updateState.played} игр сыграно, ${updateState.won} игр выиграно.`
        } else if(command == "музыка") {
            ans = `Музыка взята с сайта purpleplanet.com.`;
        } else if(command == "играть" || command == "начать") {
            if(rooms.length == counter + 1) { // We have a free room!
                states[session_id].player = 2;
                rooms[counter].players[1] = session_id;
                states[session_id].room = counter;
                states[session_id].start = new Date();
                counter++;
                ans = `Вы нашли соперника! Выберите слово на тему ${rooms[counter - 1].theme}. Время пошло! ${sound} Время вышло! Скажите "результат", чтобы узнать, какое слово загадал соперник.`;
            } else {
                rooms[counter] = new Room();
                // заговнокодил, но лень фиксить
                const theme = Object.keys(themes)[Math.floor(Math.random() * Object.keys(themes).length)];
                states[session_id].player = 1;
                rooms[counter].players[0] = session_id;
                rooms[counter].theme = theme;
                states[session_id].room = counter;
                states[session_id].start = new Date();
                ans = `Пока вы ждёте соперника, выберите слово на тему ${theme}. Время пошло! ${sound} Время вышло! Скажите "результат", чтобы узнать, какое слово загадал соперник.`;
            }
        } else
            ans = `Привет!
            Чтобы сыграть, скажите "Начать".
            Чтобы объяснить правила, скажите "Правила".
            Чтобы послушать статистику по играм, скажите "Статистика".
            Чтобы узнать автора музыки, скажите "Музыка".
            Чтобы выйти, скажите Алисе "Хватит" или "Стоп".`;
    } else {
        if(command == "результат") {
            const roomID = states[session_id].room;
            const thisPlayer = states[session_id].player - 1;
            const otherPlayer = 1 - thisPlayer;
            if(rooms[roomID].players[otherPlayer] == -1)
                ans = `Мы всё ещё ищем соперника... Подождите и скажите "результат" снова.`;
            else {
                if(rooms[roomID].words[thisPlayer] == "")
                    rooms[roomID].words[thisPlayer] = NOPE;
                const otherPlayersWord = rooms[roomID].words[otherPlayer];
                let finish = true;
                if(otherPlayersWord == "" || otherPlayersWord == NOPE) {
                    if(new Date() - states[rooms[roomID].players[otherPlayer]].start > timeout)
                        ans = `Ваш соперник не уложился во время. Сыграем снова?`;
                    else {
                        ans = `Ваш соперник ещё придумывает слово. Подождите, пожалуйста. ${sound} Скажите "результат" снова.`;
                        finish = false;
                    }
                } else
                    ans = `Слово соперника: ${otherPlayersWord}.
                    ${otherPlayersWord.length > rooms[roomID].words[thisPlayer].length ? "Вы проиграли..." : "Вы выиграли!"}
                    Сыграем снова?`;
                if(finish) {
                    if(rooms[roomID].words[thisPlayer].length > rooms[roomID].words[otherPlayer].length) {
                        updateState.won++;
                    }
                    updateState.played++;
                    states[session_id].player = 0;
                    states[session_id].room = -1;
                    if(states[rooms[roomID].players[otherPlayer]].player == 0)
                        delete rooms[roomID];
                }
            }
        } else {
            if(new Date() - states[session_id].start > timeout)
                ans = `Время истекло! Скажите "результат", чтобы узнать результат.`;
            else if(command.match(/[а-я]+/)?.[0] != command || !themes[rooms[states[session_id].room].theme].includes(command))
                ans = `Выберите другое слово!`;
            else {
                rooms[states[session_id].room].words[states[session_id].player - 1] = command;
                if(rooms[states[session_id].room].words[1 - (states[session_id].player - 1)] != "")
                    ans = `Готово! Скажите "результат", чтобы узнать результат.`;
                else
                    ans = `Готово! Ждём соперника... ${sound} Скажите "результат", чтобы узнать результат.`;
            }
        }
    }

    const body = {
        version: "1.0",
        response: {
            text: ans?.replace(/<.+/g, "") ?? "",
            tts: ans ?? "",
            end_session: final,
        },
        // session,
        user_state_update: updateState
    };

    return body;
};