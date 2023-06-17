import { useState } from "react"
import Avatar from "../avatar"

export function FazerComentario({ usuarioLogado, comentar }) {
const [linhas, setLinhas] = useState(1)
const [comentario, setComentario] = useState('')

const aoDigitarComentario = (e) => {
    const valorInput = e.target.value.trim()
    setComentario(valorInput)
    setLinhas(valorInput.length > 0 ? 2 : 1)
}

const aoPressionarQualquerTecla = (e) => {
    if (e.key === 'Enter') {
        console.log(e);
        manipularComentario()
    }
}

const manipularComentario = async () => {
    if (comentario.trim().length === 0 || !comentar) {
        return
    }

    const sucessoAoComentar = await comentar(comentario)
    console.log({sucessoAoComentar});
    if (sucessoAoComentar) {
        setComentario('')
        setLinhas(1)
    }
}

    return (
        <div className="containerFazerComentario">
            <Avatar src={usuarioLogado.avatar} />
            <textarea
                rows={linhas}
                onChange={aoDigitarComentario}
                onKeyDown={aoPressionarQualquerTecla}
                value={comentario}
                placeholder="Adicione um comentario...">
            </textarea>

            <button
                type="button"
                className="btnPublicacao desktop"
            >
                Publicar
            </button>
        </div>
    )
}