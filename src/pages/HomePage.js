import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import axios from "axios"
import { useEffect, useContext, useState } from "react"
import UserContext from "../contexts/UserContext"
import { Link, useNavigate } from "react-router-dom"

export default function HomePage() {
  const { userToken, setType } = useContext(UserContext)
  const [transactions, setTransactions] = useState([])
  const [values, setValues] = useState(0)

  useEffect(() => {
    axios.get((`${process.env.REACT_APP_API_URL}/home`), {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    }).then((ans) => {
      console.log(ans.data)
      setTransactions(ans.data)
    }).catch(err => alert(err))
  }, [])

  useEffect(() => { 
    let total = 0;
    transactions.map(t => {
      if (t.type === ":entrada") {
        total += parseInt(t.value)
      } else if (t.type === ":saida") {
        total = total - parseFloat(t.value)
      } 
    });
    setValues(total)
  }
  )
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, Fulano</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.length === 0 && <p>Nada para ver ainda</p>}
          {transactions.map((t) => (
            <ListItemContainer key={t._id}>
              <div>
                <span>30/11</span>
                <strong>{t.description}</strong>
              </div>
              <Value color={(t.type === ":saida") ? "negativo" : "positivo"}>{t.value}</Value>
            </ListItemContainer>))
          }

        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={(values>0)?"positivo":"negativo"}>{values}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>

        <button onClick={() => setType(":entrada")}>
          <Link to={"/nova-transacao/:entrada"}>
            <AiOutlinePlusCircle />
            <p>Nova <br /> entrada</p>
          </Link>
        </button>

        <button onClick={() => setType(":saida")}>
          <Link to={"/nova-transacao/:saida"} >
            <AiOutlineMinusCircle />
            <p>Nova <br />saída</p>
          </Link>
        </button>

      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`