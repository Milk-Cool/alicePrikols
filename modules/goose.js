module.exports = rbody => {
    const audio = [
        `<speaker audio="dialogs-upload/3a3e4f05-21fb-4017-8b1c-6a24863669a4/b4307521-bd5a-4736-8b18-ea784110448a.opus">`,
        `<speaker audio="dialogs-upload/3a3e4f05-21fb-4017-8b1c-6a24863669a4/51f5b139-036a-4559-bc2a-3317ad875ce9.opus">`
    ];

    const body = {
      "response": {
          "text": "*Гогот*",
          "tts": audio[Math.floor(Math.random() * audio.length)],
          "end_session": false,
          "should_listen": false
        },
        "version": "1.0"
    };

    return body;
};