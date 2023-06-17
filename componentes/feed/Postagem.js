import Link from "next/link";
import Image from "next/image";
import Avatar from "../avatar";
import { useState } from "react";

import imgCurtir from "../../public/imagens/curtir.svg";
import imgCurtido from "../../public/imagens/curtido.svg";
import imgComentarioAtivo from "../../public/imagens/comentarioAtivo.svg";
import imgComentarioCinza from "../../public/imagens/comentarioCinza.svg";
import { FazerComentario } from "./FazerComentario";

const tamanhoLimiteDecricao = 93

export default function Postagem({
    usuario,
    fotoDoPost,
    descricao,
    comentarios,
    usuarioLogado
}) {

    const [deveExibirSecaoParaComentar, setDeveExibirSacaoParaComentar] = useState(false)
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
                        src={imgCurtir}
                        alt='icone curtir'
                        width={20}
                        height={20}
                        onClick={() => console.log('curtir')}
                    />

                    <image 
                        src={imgComentarioCinza}
                        alt='icone comentar'
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSacaoParaComentar(!deveExibirSecaoParaComentar)}
                    />

                    <span className="quantidadeCurtidas">
                        Curtido por <strong>32 pessaos</strong>
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
                    {comentarios.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>

            {deveExibirSecaoParaComentar &&
                <FazerComentario usuarioLogado={usuarioLogado} />

            }
        </div>
    )
}