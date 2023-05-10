import { validarEmail, validarSenha } from '../../utils/validadores';
import UsuarioService from "../../services/UsuarioService";
import Botao from "../botao";

import Link from "next/link";
import { useState } from "react";
import Image from "next/legacy/image";
import InputPublico from "../inputPublico";

import imagemLogo from "../../public/imagens/logo.svg";
import imagemChave from "../../public/imagens/chave.svg";
import imagemEnvelope from "../../public/imagens/envelope.svg";

const usuarioService = new UsuarioService()

export default function Login({ aposAutenticacao }) {
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [estaSubmetendo, setEstaSubmetendo] = useState(false) 

    const validaFormulario = () => {
        return(
            validarEmail(email) 
            && validarSenha(senha)
        )
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if (!validaFormulario()) {
            return;
        }

        setEstaSubmetendo(true)

        try {
            await usuarioService.login({
                login: email,
                senha
            })

            if (aposAutenticacao) {
                aposAutenticacao()
            }

        } catch (error) {
            alert(
                "Erro ao realizar login. " 
                + error?.response?.data?.erro
            )
        }
        
        setEstaSubmetendo(false)
    }

    return(
        <section className={
            `paginaLogin paginaPublica`
            }>
            <div className="logoContainer">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"

                />
            </div>
            
            <div className="conteudoPaginaPublica">
                
                <form onSubmit={aoSubmeter}>
                    <InputPublico 
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={
                            e => setEmail(e.target.value)
                        }
                        valor={email}
                        mensagemValidacao="O endereço informado é inválido"
                        exibirMensagemValidadcao={
                            email && !validarEmail(email)
                        }
                        />

                    <InputPublico 
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={
                            e => setSenha(e.target.value)
                        }
                        valor={senha}
                        mensagemValidacao="Precisa ter pelo menos 3 caracteres"
                        exibirMensagemValidadcao={
                            senha && !validarSenha(senha)
                        }
                    />
                    
                    <Botao 
                        texto="Login"
                        tipo="submit"
                        desabilitado={
                            !validaFormulario() || estaSubmetendo
                        }
                    />
                </form>
            
                <div className="rodapePaginaPublica">
                    <p>Não possui uma conta?</p>
                    <Link href="/cadastro">
                        Faça seu cadastro agora!
                    </Link>
                </div>
            
            </div>
        </section>
    );
}