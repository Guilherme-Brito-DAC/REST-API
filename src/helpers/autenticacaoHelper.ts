import criptografia from 'crypto'

const SEGREDO = "4532438350365f4f46d2c20d43a6246c"

export const aleatorio = () => criptografia.randomBytes(128).toString("base64")

export const autenticacao = (salt: string, senha: string) => {
    return criptografia.createHmac("sha256", [salt, senha].join("/")).update(SEGREDO).digest("hex")
}