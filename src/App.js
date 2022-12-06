import logo from "./logo.svg";
import "./App.css";
import Card from "./component/card";
import { useEffect, useState } from "react";
import shuffleWords from "shuffle-words";
import { database } from "./firebaseConfig";
import { collection, doc, setDoc, query, onSnapshot } from "firebase/firestore";
function App() {
  // a card is a meme

  //state for storing the user input
  const [textInput, settextInput] = useState("");

  //state for the list of cards
  const [cards, setCards] = useState([]);

  //state for the button switch on/off
  const [showInput, setShowInput] = useState(false);

  //updating in realtime and fetching data (list)
  useEffect(() => {
    if (database) {
      const q = query(collection(database, "memes"));

      const unsub = onSnapshot(q, (res) => {
        setCards(res.docs);
      });
      return unsub;
    }
  }, [database]);

  // adds the user input text to the database and then to the card
  const addCard = async () => {
    const shuffledText = shuffleWords(textInput);
    try {
      await setDoc(doc(collection(database, "memes")), {
        text: shuffledText,
      });
      console.log("Document Created");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header>
        <h1>C'est déjà un mème ?</h1>
      </header>
      <section>
        <h2>
          les mèmes ne sont pas publiés,mais{" "}
          <span className="interdimentional">partagés</span> 
        </h2>

        <h2>
         sur ce site, vous pouvez vous réapproprier l'image du tableau et créer vous même  
          <span className="interdimentional"> un mème</span>{" "}
       </h2>
        <button onClick={() => setShowInput(!showInput)}>
          Créons un mème 
        </button>
        {showInput && (
          <div className="inputContainer">
            <input
              placeholder="Ecrire ici..."
              onChange={(e) => settextInput(e.target.value)}
            ></input>

            <button onClick={addCard}>go</button>
          </div>
        )}

        <h2>ou regardez ce que d'autres ont fait.</h2>

        <div className="cards_container">
          {cards.map((card, i) => {
            return <Card key={i} id={card.id} text={card.data().text}></Card>;
          })}
        </div>
      </section>
    </>
  );
}

export default App;
