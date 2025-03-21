const db = require('../db/connection');
const bcrypt = require('bcrypt')

// CREATE 
exports.createUser = (req, res) => { 
    const { nome_usuario, email_usuario, senha_usuario } = req.body; 

    bcrypt.hash(senha_usuario, 10,(err, hashedPassword_usuario)=>{
        if (err) return res.status(500).send(err)

            const sql = 'INSERT INTO usuarios (nome_usuario, email_usuario, senha_usuario) VALUES (?, ?, ?)'; 
        db.query(sql, [nome_usuario, email_usuario, hashedPassword_usuario], (err, result) => { 
        if (err) return res.status(500).send(err); 
        res.status(201).json(
            { id: result.insertId, 
                nome_usuario, 
                email_usuario, 
                senha_usuario
            }
        ); 
        })
    })
}; 



// READ 
exports.getUsers = (req, res) => { 
    db.query('SELECT nome_usuario, email_usuario FROM usuarios', (err, results) => { 
    if (err) return res.status(500).send(err); 
    res.json(results); 
    }); 
};  



// UPDATE 
exports.updateUser = (req, res) => { 
    const { id } = req.params; 
    const { nome_usuario, email_usuario, senha_usuario } = req.body; 
    const sql = 'UPDATE usuarios SET nome_usuario = ?, email_usuario = ? WHERE id = ?'; 
    db.query(sql, [nome_usuario, email_usuario, id], (err) => { 
    if (err) return res.status(500).send(err); 
    res.json({ id, nome_usuario, email_usuario }); 
    }); 
};



// DELETE 
exports.deleteUser = (req, res) => { 
    const { id } = req.params; 
    const sql = 'DELETE FROM usuarios WHERE id = ?'; 
    db.query(sql, [id], (err) => { 
    if (err) return res.status(500).send(err); 
    res.json({ message: `Usuário com ID ${id} deletado` }); 
    }); 
};


// LOGIN
exports.loginUser = (req, res) => {
    const { nome_usuario, senha_usuario } = req.body;
    
    const sql = 'SELECT * FROM usuarios WHERE nome_usuario = ?';
    db.query(sql, [nome_usuario], (err, results) => {
        if (err) return res.status(500).send(err);
        
        if (results.length === 0) {
            return res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
        }

        const user = results[0];
        bcrypt.compare(senha_usuario, user.senha_usuario, (err, isMatch) => {
            if (err) return res.status(500).send(err);
            
            if (!isMatch) {
                return res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
            }

            res.json({ message: 'Login bem-sucedido', user: { id: user.id, nome_usuario: user.nome_usuario, email_usuario: user.email_usuario } });
        });
    });
};