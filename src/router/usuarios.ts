import express from 'express'

import { atualizarUsuario, buscarTodosUsuarios, deletarUsuario } from '../controllers/usuariosController'

import { ehProprietario, estaAutenticado } from '../middlewares'

export default (router: express.Router) => {
    router.get("/usuarios", estaAutenticado, buscarTodosUsuarios)
    router.put("/usuarios/:id", estaAutenticado, atualizarUsuario)
    router.delete("/usuarios/:id", ehProprietario, deletarUsuario)
}