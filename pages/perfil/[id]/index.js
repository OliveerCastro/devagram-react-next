import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Feed from "../../../componentes/feed"
import comAutorizacao from "../../../hoc/comAutorizacao"
import CabecalhoPerfil from "../../../componentes/cabecalhoPerfil"

function Perfil({ usuarioLogado }) {
    const [usuario, setUsuario] = useState({})
    const router = useRouter()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        setUsuario({
            nome: 'Wagner Oliveira'
        })
        
    }, [router.query.id])

    return (
        <div className="paginaPerfil">
            <CabecalhoPerfil 
                usuarioLogado={usuarioLogado}
                usuario={usuario}
            />

            <Feed usuarioLogado={usuarioLogado} />
        </div>
    )
}

export default comAutorizacao(Perfil)