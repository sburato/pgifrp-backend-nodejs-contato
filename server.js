const express = require('express');
const bodyparser = require('body-parser');

const app  = express();
const port = 3000;

app.use(bodyparser.urlencoded({ extended: false}));
app.use('/', express.static(__dirname + '/public/landingpage'));
app.use('/contatos', express.static(__dirname + '/public/contato'));

app.use((request, response, next) => {
  console.log("Executando Middleware - Início."); 
  next();
});

const validarPreenchimentoCampos = (request, response, next) => {
  console.log("Executando Middleware - Validação de preenchimento de campos.");   
  
  if ((request.body.txt_nome == "") || 
      (request.body.txt_email == "") || 
      (request.body.txt_comentario == "")) {
    return response.status(400).json({ erro:  "Um ou mais campos não foram preenchidos." });
  }
  
  request.hoje = new Date(Date.now()).toUTCString();      
  next();
}

app.post('/contatos', validarPreenchimentoCampos, (request, response) => {
  console.log("Data......: " + request.hoje);
  console.log("Nome......: " + request.body.txt_nome);
  console.log("Email.....: " + request.body.txt_email);
  console.log("Comentário: " + request.body.txt_comentario);

  response.redirect('/');
});

app.get('*', (request, response) => {
  response.send("<h1>Rota não encontrada: 404</h1>");
});

app.listen(port, () => console.log(`Servidor escutando na porta ${port}`));