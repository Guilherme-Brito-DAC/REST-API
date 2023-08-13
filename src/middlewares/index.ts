import express from 'express'
import { get, merge } from 'lodash'
import { BuscarUsuarioPorToken } from '../db/usuarios'

export const ehProprietario = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params
        const idDoUsuarioAtual = get(req, "identity._id") as string

        if(!idDoUsuarioAtual) return res.status(400).send("Usuário não autenticado")

        if(idDoUsuarioAtual.toString() != id) res.status(400).send("O Usuário atual não tem propriedade no registro que quer processar")
        return next()
    } catch (erro) {
        console.log(erro)

        return res.status(400).send("Ocorreu um erro inesperado - " + erro)
    }
}

export const estaAutenticado = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const token = req.cookies["AUTH"]

        if (!token) return res.status(403).send("Usuário não está autenticado")

        const usuarioExistente = await BuscarUsuarioPorToken(token)

        if (!usuarioExistente) return res.status(403).send("Usuário não foi não encontrado")

        merge(req, { identity: usuarioExistente })

        return next()
    } catch (erro) {
        console.log(erro)

        return res.status(400).send("Ocorreu um erro inesperado - " + erro)
    }
}