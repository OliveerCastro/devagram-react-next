import HttpService from "./HttpService";

export default class FeedService extends HttpService {
    async carregarPostagem(idUsuario){
        let url = '/feed'
        if(idUsuario){
            url += `?id=${idUsuario}`
        }
        
        return this.get('/feed')
    }

    async adicionarComentario(idPostagem, comentario) {
        
    }
}