import Image from "next/legacy/image";
import imgHomeAtivo from "../../public/imagens/homeAtivo.svg";
 import imgHomeCinza from "../../public/imagens/homeCinza.svg";
 import imgUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import imgUsuarioCinza from "../../public/imagens/usuarioCinza.svg";
import imgPublicacaoCinza from "../../public/imagens/publicacaoCinza.svg";
import imgPublicacaoAtivo from "../../public/imagens/publicacaoAtivo.svg";
import { useState } from "react";

const mapaDeRota = {
    home: {
        imagemAtivo: imgHomeAtivo,
        rotasAtivacao: ['/'],
        imagemPadaro: imgHomeCinza
    },
    publicacao: {
        imagemAtivo: imgPublicacaoAtivo,
        rotasAtivacao: ['/publicacao'],
        imagemPadaro: imgPublicacaoCinza
    },
    perfil: {
        imagemAtivo: imgUsuarioAtivo,
        rotasAtivacao: ['/perfil/eu', '/perfil/eu/editar'],
        imagemPadaro: imgUsuarioCinza
    }
}

export default function Navegacao({ className }) {
    const [rotaAtiva, setRotaAtiva] = useState('home')

    return(
        <nav className={'barraNavegacao ${className}'}>
            <ul>
                <li>
                    <Image
                        src={imgHomeAtivo}
                        alt="logo home"
                        width={20}
                        height={20}
                    />
                </li>

                <li>
                    <Image
                        src={imgPublicacaoCinza}
                        alt="icone publicacao"
                        width={20}
                        height={20}
                    />
                </li>

                <li>
                    <Image
                        src={imgUsuarioCinza}
                        alt="icone usuario"
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    )
}