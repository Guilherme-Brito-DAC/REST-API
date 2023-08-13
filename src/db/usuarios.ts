import mongoose from 'mongoose'

const UsuarioEsquema = new mongoose.Schema({
    Usuario: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Autenticacao: {
        Senha: {
            type: String,
            required: true,
            select: false
        },
        Salt: {
            type: String,
            select: false,
        },
        Token: {
            type: String,
            select: false,
        },
    }
})

export const UsuarioModel = mongoose.model("Usuario", UsuarioEsquema)

export const BuscarUsuarios = () => UsuarioModel.find()

export const BuscarUsuarioPorEmail = (Email: string) => UsuarioModel.findOne({ Email })

export const BuscarUsuarioPorToken = (Token: string) => UsuarioModel.findOne({
    "Autenticacao.Token": Token
})

export const BuscarUsuarioPorId = (Id: string) => UsuarioModel.findById(Id)

export const CriarUsuario = (Dados: Record<string, any>) => new UsuarioModel(Dados).save().then((usuario) => usuario.toObject())

export const AtualizarUsuario = (Id: string, Dados: Record<string, any>) => UsuarioModel.findByIdAndUpdate(Id, Dados)

export const DeletarUsuario = (Id: string) => UsuarioModel.findOneAndDelete({ _id: Id })
