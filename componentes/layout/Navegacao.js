import Image from "next/legacy/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import imgHomeAtivo from "../../public/imagens/homeAtivo.svg";
import imgHomeCinza from "../../public/imagens/homeCinza.svg";
import imgUsuarioAtivo from "../../public/imagens/usuarioAtivo.svg";
import imgUsuarioCinza from "../../public/imagens/usuarioCinza.svg";
import imgPublicacaoCinza from "../../public/imagens/publicacaoCinza.svg";
import imgPublicacaoAtivo from "../../public/imagens/publicacaoAtivo.svg";

const mapaDeRotas = {
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
    const router = useRouter()

    useEffect(() => {
        definirRotaAtiva()
    }, [router.asPath])

    const definirRotaAtiva = () => {
        const chaveDoMapaDeRotas = Object.keys(mapaDeRotas)
        const indiceAtivo = chaveDoMapaDeRotas.findIndex(chave => {
            return mapaDeRotas[chave].rotasAtivacao.includes(
                window.location.pathname
            )
        })

        if(indiceAtivo === -1) {
            setRotaAtiva('home')
        } else {
            setRotaAtiva(chaveDoMapaDeRotas[indiceAtivo])
        }
    }
    
    const obterImagem = () => {
        const rotaAtivada = mapaDeRotas[nomeRota]

        if (rotaAtiva === nomeRota) {
            return rotaAtivada.imagemAtivo
        }

        return rotaAtivada.imagemPadaro
    }

    const aoClicarNoIcone = (nomeRota) => {
        setRotaAtiva(nomeRota)
        router.push(mapaDeRotas[nomeRota].rotasAtivacao[0])
    }

    return(
        <nav className={'barraNavegacao ${className}'}>
            <ul>
                <li onClick={aoClicarNoIcone('home')}>
                    <Image
                        src={obterImagem('home')}
                        alt="logo home"
                        width={20}
                        height={20}
                    />
                </li>

                <li onClick={() => aoClicarNoIcone('publicacao')}>
                    <Image
                        src={obterImagem('publicacao')}
                        alt="icone publicacao"
                        width={20}
                        height={20}
                    />
                </li>

                <li onClick={() => aoClicarNoIcone('perfil')}>
                    <Image
                        src={obterImagem('perfil')}
                        alt="icone usuario"
                        width={20}
                        height={20}
                    />
                </li>
            </ul>
        </nav>
    )
}