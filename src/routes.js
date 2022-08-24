const express = require('express')
const router = express.Router()


const tarefasControllers = require('./controllers/tarefasControllers')

router.get('/tarefas', tarefasControllers.buscarTodos)
router.get('/tarefas/:codigo', tarefasControllers.buscarUm)
router.post('/tarefas', tarefasControllers.inserir)
router.put('/tarefas/:codigo', tarefasControllers.alterar)
router.delete('/tarefas/:codigo', tarefasControllers.excluir)

module.exports = router 