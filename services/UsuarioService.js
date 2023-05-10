import HttpService from "./HttpService";

export default class UsuarioService extends HttpService {
    async login(credenciais) {

        // o data vem do axios, acessa a resposta da requisição
        const { data } = await this.post('/login', credenciais)

        localStorage.seItem("nome", data.nome)
        localStorage.seItem("email", data.email)
        localStorage.seItem("token", data.token)

        /*
        Encapsulamento axios.get do usuarioService.
        Pegando o usuario para devolvar o avatar.
        */ 
        const usuario = await this.get('/usuario')
        localStorage.setItem('id', usuario.data._id)

        if(data.avatar) {
            localStorage.setItem("avatar", data.avatar)
        }
    }

    async cadastro(dados) {
        return this.post('/cadastro', dados)
    }

    estaAutenticado() {
        return localStorage.getItem('token') !== null
    }
}