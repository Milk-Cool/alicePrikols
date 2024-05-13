module.exports = rbody => {
    const audio = [
        `<speaker audio="dialogs-upload/e879aa6e-93dc-4c3d-8c2f-c733d22efb3a/f8000067-5194-465f-b2ae-8ca20e76285f.opus">`,
        `<speaker audio="dialogs-upload/e879aa6e-93dc-4c3d-8c2f-c733d22efb3a/4f4365dc-8608-4dd1-bad9-e68c25821caf.opus">`,
        `<speaker audio="dialogs-upload/e879aa6e-93dc-4c3d-8c2f-c733d22efb3a/00f2317f-6367-4c81-9e11-76dbb9fe9413.opus">`,
        `<speaker audio="dialogs-upload/e879aa6e-93dc-4c3d-8c2f-c733d22efb3a/91571bdf-9eb7-42ad-b8aa-6e71106450ad.opus">`,
        `<speaker audio="dialogs-upload/e879aa6e-93dc-4c3d-8c2f-c733d22efb3a/e35afe4b-dfce-4eb3-aac2-6678d8006de8.opus">`,
        `<speaker audio="dialogs-upload/e879aa6e-93dc-4c3d-8c2f-c733d22efb3a/13949ea8-6cf3-4c8f-b47b-800f6b68900b.opus">`,
        `<speaker audio="dialogs-upload/e879aa6e-93dc-4c3d-8c2f-c733d22efb3a/c697778a-4a72-4b6a-b363-f858f86422da.opus">`,
        `<speaker audio="dialogs-upload/e879aa6e-93dc-4c3d-8c2f-c733d22efb3a/498af20d-ca4e-4b28-843e-f5eec7f82eea.opus">`,
        `<speaker audio="dialogs-upload/e879aa6e-93dc-4c3d-8c2f-c733d22efb3a/5594cf9d-8b4c-4791-86b9-955eb4b40476.opus">`
    ];

    const body = {
      "response": {
          "text": "Режим Тимофея активирован!",
          "tts": audio.join(""),
          "end_session": true,
          "should_listen": false
        },
        "version": "1.0"
    };

    return body;
}