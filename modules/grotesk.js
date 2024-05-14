module.exports = rbody => {
    const audio = `<speaker audio="dialogs-upload/0439971d-552c-431b-bc6b-107dcc7358f3/83209fcb-1dfd-4b6c-bf8c-5ffe6b3010af.opus">`;
    const text = `Сешв+ец какув+ац! Вы нашли секретную грот+ескную команду! Мне приснилось, что я говорил с Алисой и что Игорь начал что-то петь, поэтому наслаждайтесь.`;

    const body = {
      "response": {
          "text": text.replaceAll("+", ""),
          "tts": `${text} ${audio}`,
          "end_session": false,
          "should_listen": false
        },
        "version": "1.0"
    };

    return body;
};