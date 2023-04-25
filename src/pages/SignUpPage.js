import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"

export default function SignUpPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [confirmPassword, setConfirmPassword]= useState("")

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function sendForm(e) {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/cadastro`, form)
      .then(() => {
        console.log("deubom")
        navigate("/")
      }).catch(err => {
        alert(err.response.data.message)
      })
  }

  return (
    <SingUpContainer>
      <form>
        <MyWalletLogo />
        <input placeholder="Nome" type={"name"}
          name="name"
          value={form.name} onChange={handleForm} />

        <input placeholder="E-mail" type={"email"}
          name="email"
          value={form.email} onChange={handleForm} />

        <input placeholder="Senha" type={"password"}
          name="password"
          value={form.password} onChange={handleForm} autoComplete="new-password" />

        <input placeholder="Confirme a senha" type="password" autoComplete="new-password" />

        <button onClick={sendForm}>Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
