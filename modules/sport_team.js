module.exports = _rbody => {
    const audio = `<speaker audio="dialogs-upload/4998976a-ce0c-4c20-a292-e20622afa142/2890314f-c6f6-496c-a2cf-f700768c6b0d.opus">`;

    const body = {
      "response": {
          "text": "LETOVO SPORT TEAM",
          "tts": audio.repeat(100),
          "end_session": false,
          "should_listen": false
        },
        "version": "1.0"
    };

    return body;
}