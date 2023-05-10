export default function Botao({
    texto,
    tipo = 'button',
    manipularClique,
    cor = 'primaria',
    desabilitado = false
}) {
    return (
        <button
            type={tipo}
            className={`btn ${cor}`}
            disabled={desabilitado}
            onClick={manipularClique}
        >
            {texto}
        </button>
    );
}