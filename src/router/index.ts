import express from 'express'

import autenticacao from './autenticacao'
import usuarios from './usuarios'

const router = express.Router()

export default (): express.Router => {
    autenticacao(router)
    usuarios(router)

    return router
}