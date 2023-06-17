import Navegacao from "./Navegacao";
import Image from "next/legacy/image";
import imagemLupa from "../../public/imagens/lupa.svg";
import logoHorizontalImg from "../../public/imagens/logoHorizontal.svg";
import { useState } from "react";
import ResultadoPesquisa from "./ResultadoPesquisa";
import UsuarioService from "../../services/UsuarioService"
import { useRouter } from "next/router";

const usuarioService = new UsuarioService()

export default function Cabecalho() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([])
    const [termoPesquisado, setTermoPesquisado] = useState('')
    const router = useRouter()

    const aoPesquisar = async (e) => {
        setTermoPesquisado(e.target.value)
        setResultadoPesquisa([])

        if (termoPesquisado.length < 3) {
            return
        }

        try {
            const { data } = await usuarioService.pesquisar(termoPesquisado)
        } catch (error) {
            alert('Erro ao pesquisar usuário' + error?.response?.data?.error)
            
        }
    }


    const aoClicarResultadoPesquisa = (id) => {
        setResultadoPesquisa([])
        console.log('aoClicarResultadoPesquisa', {id});
        router.push(`/perfil/${id}`)
    }

    const redirecionarParaHome = ( ) => {
        router.push('/')
    }

    return(
        <header className="cabecalhoPrincipal">
            <div className="conteudoCabecalhoPrincipal">
                <div className="logoCabecalhoPrincipal">
                    <Image
                        onClick={redirecionar}
                        src={logoHorizontalImg}
                        alt="logo devagram"
                        layout="fill"
                    />
                </div>

                <div className="barraPesquisa">
                    <div className="containerImagemLupa">
                        <Image
                            src={imagemLupa}
                            alt="Icone lupa"
                            layout="fill"
                        />
                    </div>

                    <input
                        type="text"
                        placeholder="Pesquisar"
                        value={"t ermoPesquisado"}
                        onChange={aoPesquisar}
                    />
                </div>

                <Navegacao className="desktop" />
            </div>

            {resultadoPesquisa.length > 0 && (
                <div className="resultadoPesquisaContainer">
                    {resultadoPesquisa.map(r =>(
                        <ResultadoPesquisa 
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                    ))}
                </div>
                
            )}
        </header>
    )
}