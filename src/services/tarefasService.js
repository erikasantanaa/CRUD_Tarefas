const db = require('../db')

module.exports = {
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            
            db.query('SELECT * FROM tarefas', (error, results) => {
                if(error) { rejeitado(error); return}
                aceito(results)
            })
        })
    },

    buscarUm: (codigo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('SELECT * FROM tarefas WHERE codigo = ?', 
            [codigo],
            (error, results) => {
                if(error) {rejeitado(error); return; }
                if(results.length > 0) {
                    aceito(results[0])
                }else{
                    aceito(false)
                }
            })
        })
    },

    inserir: (tituloTarefa, dataEntrega) => {
        return new Promise((aceito, rejeitado) => {

            db.query('INSERT INTO tarefas (tituloTarefa, dataEntrega) VALUES (?, ?)',
                [tituloTarefa, dataEntrega],
                (error, results) => {
                    if(error) { rejeitado(error); return;}
                    aceito(results.insertCodigo);
                }
            )
        })
    },

    alterar: (codigo, tituloTarefa, dataEntrega) => {
        return new Promise((aceito, rejeitado) => {

            db.query('UPDATE tarefas SET tituloTarefa = ?, dataEntrega = ? WHERE codigo = ?',
                [tituloTarefa, dataEntrega, codigo],
                (error, results) => {
                    if(error) { rejeitado(error); return; }
                    aceito(results)
            })
        })

    },

    excluir: (codigo) => {
        return new Promise((aceito, rejeitado) => {

            db.query('DELETE FROM tarefas WHERE codigo = ?',
                [codigo],
                (error, results) => {
                    if(error) {
                        rejeitado(error)
                        return
                    }
                    aceito(results)
            })
        })
    }
}