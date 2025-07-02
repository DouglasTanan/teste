const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.post('/verificar', async (req, res) => {
    const token = req.body['g-recaptcha-response'];
    const secret = '6LcnQHQrAAAAAO0HFAv3F3-AJINGsPmqmzSYAk75';
    
    if (!token){
        return res.send('Recaptcha não resolvido.');
    }

    const resposta = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method:'POST', 
        headers:{'Content-Type':'application/x-www-forms-urlencoded'},
        body:`secret=${secret}&response=${token}`
    });

    const dados = await resposta.json();

    if (dados.success){
        res.send('Verificação bem sucedida!');
    } else {
        res.send('Falha na verificação do recaptcha');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando porta: ${PORT}`);
});
