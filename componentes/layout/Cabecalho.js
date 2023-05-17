import Navegacao from "./Navegacao";
import Image from "next/legacy/image";
import imagemLupa from "../../public/imagens/lupa.svg";
import logoHorizontalImg from "../../public/imagens/logoHorizontal.svg";
import { useState } from "react";
import ResultadoPesquisa from "./ResultadoPesquisa";

export default function Cabecalho() {
    const [resultadoPesquisa, setResultadoPesquisa] = useState([])
    const [termoPesquisado, setTermoPesquisado] = useState([])

    const aoPesquisar = (e) => {
        setTermoPesquisado(e.target.value)
        setResultadoPesquisa([])

        if (termoPesquisado.length < 3) {
            return
        }

        setResultadoPesquisa([
            {
                avatar: '',
                nome: 'Wagner',
                email: 'wagner@devagram.com',
                _id: '3242432'
            }
        ])
    }

    const aoClicarResultadoPesquisa = (id) => {
        console.log('aoClicarResultadoPesquisa', {id});
    }

    return(
        <header className="cabecalhoPrincipal">
            <div className="conteudoCabecalhoPrincipal">
                <div className="logoCabecalhoPrincipal">
                    <Image
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