import './Style.css'
import { UsuarioData } from '../../interface/UsuarioData'

function Login() {
  const data: UsuarioData[] = [];


  return (
    <div className="container">
       
      <section className='formularioContainer' id='FormularioLogin'>
      <img className='logo' id='logoLogin' src='/logoAp.png'></img>
      <form className='formulario' id='loginForm'>
        <h1>LOGIN</h1>
        <h2 id='email'>E-mail</h2>
        <input className='inputLogin' placeholder='usuario@gmail.com' type="text" />
        <h2 id='senha'>Senha</h2>
        <input className='inputLogin' placeholder='Senha!forte180' type='password' />
      </form>
      </section>
      <div className='recursos' id='AcessosTipos'>
        <p>Criar Conta</p>
        <p>Esqueci a Senha</p> 
      </div>
      <button type='submit' id='BotaoEntrar' form='LoginForm'>Entrar</button>
      
    </div>
  )
}

export default Login
