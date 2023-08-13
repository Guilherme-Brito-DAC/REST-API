import express from 'express'
import { BuscarUsuarioPorEmail, CriarUsuario } from '../db/usuarios'
import { aleatorio, autenticacao } from '../helpers/autenticacaoHelper'

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, senha } = req.body

        if (!email || !senha) return res.status(400).send("O email e senha são obrigatórios")

        const usuario = await BuscarUsuarioPorEmail(email).select("+Autenticacao.Salt +Autenticacao.Senha")

        if (!usuario) return res.status(400).send("O usuário não foi encontrado, verifique o email")

        const hashEsperado = autenticacao(usuario.Autenticacao.Salt, senha)

        if (usuario.Autenticacao.Senha != hashEsperado) return res.status(403).send("A senha não está correta")

        const salt = aleatorio()

        usuario.Autenticacao.Token = autenticacao(salt, usuario._id.toString())

        await usuario.save()

        res.cookie("AUTH", usuario.Autenticacao.Token, { domain: "localhost", path: "/" })

        return res.status(200).json(usuario).end()
    } catch (erro) {
        console.log(erro)

        return res.status(400).send("Ocorreu um erro inesperado - " + erro)
    }
}

export const registrar = async (req: express.Request, res: express.Response) => {
    try {
        const { email, senha, usuario } = req.body

        if (!email || !senha || !usuario) return res.status(400).send("Dados obrigatórios não enviados, verifique se envio email, senha e usuário")

        const usuarioExistente = await BuscarUsuarioPorEmail(email)

        if (usuarioExistente) return res.status(400).send("Email já cadastrado")

        const salt = aleatorio()

        const usuarioNovo = await CriarUsuario({
            Email: email,
            Usuario: usuario,
            Autenticacao: {
                Senha: autenticacao(salt, senha),
                Salt: salt,
            }
        })

        res.status(200).json(usuarioNovo).end()
    } catch (erro) {
        console.log(erro)

        return res.status(400).send("Ocorreu um erro inesperado - " + erro)
    }
}