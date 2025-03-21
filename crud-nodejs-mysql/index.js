const express = require('express'); 
const bodyParser = require('body-parser'); 
const userRoutes = require('./routes/userRoutes.js'); 
const app = express(); 
const PORT = 5010; 
app.use(bodyParser.json()); 
app.use('/api', userRoutes); 
app.listen(PORT, () => { 
 console.log(`Servidor rodando na porta ${PORT}`); 
});