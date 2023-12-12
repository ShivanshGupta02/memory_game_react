import { useEffect,useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  {"src" : "/img/helmet-1.png", matched : false},
  {"src" : "/img/potion-1.png", matched : false},
  {"src" : "/img/ring-1.png", matched : false},
  {"src" : "/img/scroll-1.png", matched : false},
  {"src" : "/img/shield-1.png", matched : false},
  {"src" : "/img/sword-1.png", matched : false},
]


function App() {
  const [cards, setCards] = useState([]);

  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [turn, setTurn] = useState(1);

  const shuffleCards = ()=>{
    const shuffledCards = [...cardImages,...cardImages]
    .sort(()=>Math.random()-0.5)
    .map((card)=>({...card, id: Math.random()}))

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(1);
  }
  // console.log(cards,turns);

  // handle choice
  const handleChoice = (card) =>{
    if(turn==1) setChoiceOne(card);
    else setChoiceTwo(card);
  }

  // compare 2 selected cards
  useEffect(()=>{
    if(choiceOne && choiceTwo){
      if(choiceOne.src === choiceTwo.src ){
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src == choiceOne.src){
              return {...card, matched : true};
            }
            else return card;
          })
        })
        resetTurns();
      }
      else{
        resetTurns2();
        // setTimeout(()=>{resetTurns2()}, 1000);
      }
    }
    else resetTurns2();
    console.log(choiceOne);
    console.log(choiceTwo);
  }, [choiceOne, choiceTwo]);

  const resetTurns = ()=>{
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn(1);
  }
  const resetTurns2 = ()=>{
    setTurn(prevTurn =>(prevTurn%2)+1);
  }

  console.log(cards);

  return (
    <div>
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {
          cards.map(card=>(
            <SingleCard 
              card={card} 
              key={card.id} 
              handleChoice = {handleChoice}
              flipped = {card === choiceOne || card === choiceTwo || card.matched }
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
