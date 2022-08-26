setInterval(() => {
    if(document.querySelector('body>iframe') !== null) {
        document.querySelector('body>iframe').style.display = 'none';
    }
}, 500);