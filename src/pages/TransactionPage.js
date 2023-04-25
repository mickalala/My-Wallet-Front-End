import styled from "styled-components"
import { useState, useContext } from "react"
import axios from "axios"
import UserContext from "../contexts/UserContext"
import { useNavigate } from "react-router-dom"

export default function TransactionsPage({tipo}) {

  const { userToken } = useContext(UserContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({ value: "", description: "" })

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  function sendForm(e) {
    e.preventDefault()
    axios.post(`${process.env.REACT_APP_API_URL}/nova-transacao/:${tipo}`, form, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    })
      .then(() => {
        console.log("foiii")
        navigate("/home")
      }
      ).catch(err => alert(err))
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input placeholder="Valor" type={"text"}
          name="value"
          value={form.value} onChange={handleForm}
        />

        <input placeholder="Descrição" type={"text"}
          name="description"
          value={form.description} onChange={handleForm}
        />

        <button onClick={sendForm}>Salvar TRANSAÇÃO</button>

      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
