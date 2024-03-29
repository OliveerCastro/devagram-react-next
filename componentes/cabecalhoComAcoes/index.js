import Image from "next/image"

export default function CabecalhoComAcoes({
    className,
    iconeEsquerda,
    textoEsquerda = null,
    aoClicarAcaoEsquerda,
    titulo
}) {
    return (
        <div className={`cabecalhoComAcoes ${className}`}>
            {iconeEsquerda ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image
                    src={iconeEsquerda}
                    alt="icone esquerda cabeçalho com ações"
                    onClick={aoClicarAcaoEsquerda}
                    width={25}
                    height={25}
                />
            ) : (
                textoEsquerda !== null && (
                    <span className="cabecalhoComAcoesTextoEsquerda" onClick={aoClicarAcaoEsquerda}>
                        {textoEsquerda}
                    </span>
                )  
            )}

            <h3>{titulo}</h3>

            {elementoDireita && (
                <button 
                    type="button"
                >
                    {elementoDireita}
                </button>
            )}
        </div>
   ) 
}