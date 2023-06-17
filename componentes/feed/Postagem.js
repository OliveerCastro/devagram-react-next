import Link from "next/link";
import Image from "next/image";
import Avatar from "../avatar";
import { useState } from "react";

import imgCurtir from "../../public/imagens/curtir.svg";
import imgCurtido from "../../public/imagens/curtido.svg";
import imgComentarioAtivo from "../../public/imagens/comentarioAtivo.svg";
import imgComentarioCinza from "../../public/imagens/comentarioCinza.svg";
import { FazerComentario } from "./FazerComentario";
import FeedService from "../../services/FeedService";

const tamanhoLimiteDecricao = 90
const feedService = new FeedService()

export default function Postagem({
    id,
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado,
    curtidas
}) {
    const [curtidasPostagem, setCurtidasPostagem] = useState(curtidas)
    const [comentariosPostagem, setComentariosPostagem] = useState(comentarios)
    const [deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] = useState(false)
    const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(
        tamanhoAtualDaDescricao
    )

    const exibirDescricaoCompleta = () => {
        setTamanhoAtualDaDescricao(Number.MIN_SAFE_INTEGER)
    }

    const descricaoMaiorQueLimite = () => {
        return descricao.length > tamanhoAtualDaDescricao
    }

    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDaDescricao)
        if (descricaoMaiorQueLimite()) {
            mensagem += '...'
        }

        return mensagem
    }

    const obterImagemComentario = () => {
        return deveExibirSecaoParaComentar
            ? imgComentarioAtivo
            : imgComentarioCinza
    }

    const comentar = async (comentario) => {
        console.log('fazer comentario');

        try {
            await feedService.adicionarComentario(id, comentario)
            setDeveExibirSecaoParaComentar(false)
            setComentariosPostagem([
                ...comentariosPostagem,
                {
                    nome: usuarioLogado.nome,
                    mensagem: comentario
                }
            ])
        } catch (e) {
            alert(`Erro ao fazer comentario! ` + (e?.response?data?.erro || ''))
            return false
        }
    }

    const usuarioLogadoCurtiuPostagem = () => {
        return curtidasPostagem.includes(usuarioLogado.id)
    }
    
    const alterarCurtida = async () =>{
        try {
            await feedService.alterarCurtida(id)
            if (usuarioLogadoCurtiuPostagem()) {
                // retira o usuario logado da lista de curtidas
                setCurtidasPostagem(
                    curtidasPostagem.filter(idUsuarioQueCurtiu !== usuarioLogado.id)
                )
            } else {
                // adiciona o usuario logado na lista de curtidas
                setCurtidasPostagem([
                    ...curtidasPostagem,
                    usuarioLogado.id
                ])
            }
        } catch (e) {
            alert(`Erro ao alterar a curtida! ` + (e?.response?data?.erro || ''))
            
        }
    }

    const obterimagemCurtida = () => {
        return usuarioLogadoCurtiuPostagem()
        ? imgCurtido
        : imgCurtir
    }

    return (
        <div className="postagem">
            <Link href={`/pefil/${usuario.id}`}>
                <section className="cabecalhoPostagem">
                    <Avatar src={usuario.avatar} />
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>

            <div className="fotoDaPostagem">
                <img src={fotoDoPost} alt="foto da postagem" />
            </div>

            <div className="rodapeDaPostagem">
                <div className="acoesDoRodapeDaPostagem">
                    <image 
                        src={obterimagemCurtida}
                        alt='icone curtir'
                        width={20}
                        height={20}
                        onClick={alterarCurtida}
                    />

                    <image 
                        src={obterImagemComentario()}
                        alt='icone comentar'
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                    />

                    <span className="quantidadeCurtidas">
                        Curtido por <strong>{curtidasPostagem.length} pessoas</strong>
                    </span>
                </div>
                
                <div className="decricaoDaPostagem">
                    <strong className="nomeUsuario">{usuario.nome}</strong>
                    <p className="descricaoPostagem">
                        {obterDescricao()}
                        {descricaoMaiorQueLimite() && (
                            <span 
                                onClick={descricaoMaiorQueLimite}   
                                className="descricaoMaiorQueLimite">
                                mais
                            </span>
                        )}
                    </p>
                </div>

                <div className="comentariosDaPublicacao">
                    {comentariosPostagem.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {deveExibirSecaoParaComentar &&
                <FazerComentario comentar={comentar} usuarioLogado={usuarioLogado} />

            }
        </div>
    )
}