import HttpService from "./HttpService";

export default class UsuarioService extends HttpService {
    async login(credenciais) {

        // o data vem do axios, acessa a resposta da requisição
        const { data } = await this.post('/login', credenciais)
        console.log(data);
        localStorage.setItem("nome", data.nome)
        localStorage.setItem("email", data.email)
        localStorage.setItem("token", data.token)
        console.log(localStorage.getItem("token"));
        /*
        Encapsulamento axios.get do usuarioService.
        Pegando o usuario para devolvar o avatar.
        */ 
        const usuario = await this.get('/usuario')
        console.log(usuario);
        localStorage.setItem('id', usuario.data._id)

        if(usuario.data.avatar) {
            localStorage.setItem("avatar", usuario.data.avatar)
        }
    }

    async cadastro(dados) {
        return this.post('/cadastro', dados)
    }

    estaAutenticado() {
        return localStorage.getItem('token') !== null
    }

    async pesquisar(termoDaPesquisa) {
        return this.get('/pesquisa?filter=' + termoDaPesquisa)
    }

    obterInformacaoDoUsuarioLogado() {
        return {
            id: localStorage.getItem('id'),
            nome: localStorage.getItem('nome'),
            email: localStorage.getItem('email'),
            avatar: localStorage.getItem('avatar')
        }
    }
}