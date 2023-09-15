import { useState } from "react"
import Avatar from "../avatar"

export function FazerComentario({ usuarioLogado }) {
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
                onClick={manipularComentario}
            >
                Publicar
            </button>
        </div>
    )
}