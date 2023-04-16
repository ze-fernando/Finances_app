/*Importa os elementos e frameworks que usamos*/
import React, { useState } from "react";
import "../Css/style.css"
import {MdDeleteForever} from "react-icons/md";

/*Pagina principal*/
function Home(){

        /*Cria os inputs e as variareis*/
    const [number, setNumber] = useState()
    const [select, setSelect] = useState('Entrada')
    const [entrada, setEntrada] = useState(0)
    const [saida, setSaida] = useState(0)
    const [total, setTotal] = useState(0)
    const [text, setText] = useState('')
    const [list, setList] = useState([]);

    /*Realiza a soma de algumas variaveis*/
    const output = parseFloat(saida) + parseFloat(number);
    const input = parseFloat(entrada) + parseFloat(number);

    /*Permite a edição dos inputs*/
    const input_text = (event) => {
        setText(event.target.value);
      };
    const input_number = (event) => {
        setNumber(event.target.value);
    };
    const input_select = (event) =>{
        setSelect(event.target.value);
    }

    /*Função pra mudar a cor do 'total'*/
    if (total<0){
        document.body.style.setProperty('--total', '#da0000');
    }
    else if(total>=0){
        document.body.style.setProperty('--total', '');
    }
    /*Função pra adcionar uma finança*/
    function add_debt(){
        if (number==='' || text===''){
            alert('Por favor, preencha corretamente todas as opções')
        }
        else{
            if (select==='Entrada'){
                setEntrada(input.toFixed(2))
                setTotal((input - saida).toFixed(2))
            }
            else {
                setSaida(output.toFixed(2))
                setTotal((entrada - output).toFixed(2))
                
            }
            const newtask = {
                id: Math.random(),
                name: text,
                money: number,
                tipo: select,
            }
            setList([ ...list, newtask])
        }
        setText('');
        setNumber('');  
    };
    /*Função pra deletar uma finança*/
    const remove_text = (id) => {
        const newlist = list.filter((t) => t.id !== id);
        const money_list = list.filter(((t) => t.id === id))
        money_list.filter((t) => {
            const money = t.money
            
            if (t.tipo === "Entrada"){
                setEntrada(parseFloat(entrada) - parseFloat(money).toFixed(2))
                setTotal((parseFloat(total) - parseFloat(money)).toFixed(2))
            }
            else{
                setSaida(parseFloat(saida) - parseFloat(money).toFixed(2))
                setTotal((parseFloat(total) + parseFloat(money)).toFixed(2))

            } 
        
        })
        setList(newlist)
    };

        return(
            /*Esqueleto da pagina*/
        <div className="Container">
            <div className="Painel">
                <h1>Finances</h1>
                <div className="Value">
                    <p className="Name">Entrada:</p>
                    <p className="Money">R${entrada}</p>
                    
                    </div>
                <div className="Value">
                    <p className="Name">Saida:</p>
                    <p className="Money">R${saida}</p>
                    
                    </div>
                <div className="Value">
                    <p className="Name">Total:</p>
                    <p className="Money" id="total">R${total}</p>
                    
                    </div>

                <div className="C_input">
                <input className="Text" type="text" value={text} onChange={input_text} placeholder="Ex: Fatura cartão"/>
                <input className="Number" type="number" value={number} onChange={input_number} placeholder="Ex: 13,00"/>
                <select className="Select" onChange={input_select}>
                    <option id="saida" value="Entrada">Entrada</option>
                    <option id="entrada" value="Saída">Saída</option>
                </select>
                <button className="Button" onClick={add_debt}>Adicionar</button>
                </div>

            </div>

            <ul className="Lista">
                {list.map((t) => (
               <li className="Itens" key={t.id}>
                <div className='Item'> <p>{t.name}</p> </div>
                <div className='Item'> <p>{t.money}</p> </div>
                <div className='Item'> <p >{t.tipo}</p> </div>
                <button className="Trash" onClick={() => remove_text(t.id)}> <MdDeleteForever id="icon"/></button>
                </li>
                ))}
            </ul>
        </div>
        )
}

export default Home;