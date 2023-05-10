import Image from "next/image";

export default function InputPublico({
    tipo,
    texto,
    imagem,
    valor="",
    aoAlterarValor,
    mensagemValidacao = "",
    exibirMensagemValidadcao = false
}) {
    return (
        <div className="inputPublicoContainer">
            <div className="inputPublico">
                <Image
                    src={imagem}
                    alt="imagem do campo"
                    className="iconeInputPublico"
                    width={20}
                    height={20}
                />

                <input
                    type={tipo}
                    value={valor}
                    placeholder={texto}
                    onChange={aoAlterarValor}
                />
            </div>

            { exibirMensagemValidadcao && 
                <p className="mensagemValidacao"> 
                    {mensagemValidacao} 
                </p>
            }
        </div>
    );
}