import express from 'express'

import { login, registrar } from '../controllers/autenticacaoController'

export default (router: express.Router) => {
    router.post("/autenticacao/registrar", registrar)
    router.post("/autenticacao/login", login)
}