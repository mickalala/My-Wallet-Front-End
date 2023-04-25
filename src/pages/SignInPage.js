import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState, useContext } from "react"
import UserContext from "../contexts/UserContext"

export default function SignInPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: "" })


  const { setUserToken } = useContext(UserContext)
  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function sendForm(e) {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/`, form).
      then((answer) => {
        setUserToken(answer.data.token)
        console.log(answer.data.token)
        console.log("deubom")
        navigate("/home")
      }
      ).catch(err => alert(err))
  }

  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input placeholder="E-mail" type={"email"}
          name="email"
          value={form.email} onChange={handleForm} />

        <input placeholder="Senha" type={"password"}
          name="password"
          value={form.password} onChange={handleForm} autoComplete="new-password" />

        <button onClick={sendForm}>Entrar</button>

      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
