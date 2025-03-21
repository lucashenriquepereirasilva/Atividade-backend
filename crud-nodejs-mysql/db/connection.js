const mysql = require('mysql2');

const connection = mysql.createConnection({ 
    host: 'localhost', 
    user: 'root', // seu usuário MySQL 
    password: '', // sua senha MySQL 
    database: 'crud_db' 
   }); 
   connection.connect((err) => { 
    if (err) throw err; 
    console.log('Conectado ao MySQL!'); 
   }); 
   module.exports = connection;