import express from 'express'
import { BuscarUsuarioPorId, BuscarUsuarios, DeletarUsuario } from '../db/usuarios'

export const buscarTodosUsuarios = async (req: express.Request, res: express.Response) => {
    try {
        const usuarios = await BuscarUsuarios()

        res.status(200).json(usuarios)
    } catch (erro) {
        console.log(erro)

        return res.status(400).send("Ocorreu um erro inesperado - " + erro)
    }
}

export const atualizarUsuario = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params
        const { usuario } = req.body

        if (!usuario) return res.status(400).send("O usuário é obrigatório")

        const usuarioAtual = await BuscarUsuarioPorId(id)

        if (!usuarioAtual) return res.status(400).send("O usuário não foi encontrado")

        usuarioAtual.Usuario = usuario

        await usuarioAtual.save()

        return res.status(200).json(usuarioAtual).end()
    } catch (erro) {
        console.log(erro)

        return res.status(400).send("Ocorreu um erro inesperado - " + erro)
    }
}

export const deletarUsuario = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params

        const usuarioDeletado = await DeletarUsuario(id)

        res.status(200).json(usuarioDeletado)
    } catch (erro) {
        console.log(erro)

        return res.status(400).send("Ocorreu um erro inesperado - " + erro)
    }
}