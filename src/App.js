import logo from "./logo.svg";
import "./App.css";
import Card from "./component/card";
import { useEffect, useState } from "react";
import shuffleWords from "shuffle-words";
import { database } from "./firebaseConfig";
import { collection, doc, setDoc, query, onSnapshot } from "firebase/firestore";
function App() {
  const Phrases = [
    "Ceci est un outil qui permet de créer une infinité du même mème. Créons-en un ensemble!",
    "bon travail ! tu veux réessayer ?",
    "cool et bien. tu penses que tu peux faire mieux ?",
    "cool et bien. faire mieux tu tu que penses peux ?",
    "tu peux cool faire et good. tu es mieux ? pense faire",
    "et peut penser cool vous bien. mieux ? faire faire vous",
    "faire bien. penser et vous pouvez cool vous faire mieux ?",
    "où faire encore ? - faire - un travail ! infini faire essayer vouloir laisser bon. mèmes. vous voici faire espace peut penser vous mieux ? vous cool - bon ensemble. faire vous et un peut",
    "mieux ? essayer à nouveau ? faire où Laissons l'espace bon. - vous vous ici cool penser mèmes. faire travail ! ensemble. faire peut peut faire un infini vous faire bien - un vouloir vous et",
    "cool mieux ? et bon. peut penser vous faites vous faites vous",
    " faire mieux ? faire vous cool pensez vous pouvez et bon.",
    "encore ? bon vous faites le travail ! essayez vous - où mieux ? pouvez faire l'espace mèmes. Faisons vous faites pouvez vous pensez infini cool font ici veulent un bon. - ensemble.",
    "vous pouvez cool faire et bon. vous mieux ? pensez faire",
  ];

  const Colors = [
    "#474a50",
    "#4b84f7",
    "#2ab841",
    "#b82a7d",
    "#e45d10",
    "#003170",
    "#ff2a4d",
    "#98ffc6",
    "#091444",
    "#edff9f",
  ];
  function randomNumberInRange(min, max) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  //latest meme input
  const [latestMeme, setLatestMeme] = useState("");
  const [countHeaderText, setcountHeaderText] = useState(0);
  const [countColors, setcountColors] = useState(0);
  const [countColorsHeaderText, setcountColorsHeaderText] = useState(0);
  const [countColorsHeaderBox, setcountColorsHeaderBox] = useState(0);
  const [countColorsHeaderBG, setcountColorsHeaderBG] = useState(0);
  const [successFlag, setsuccessFlag] = useState(false);
  const [HeaderText, setHeaderText] = useState(Phrases[countHeaderText]);
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

  useEffect(() => {
    setHeaderText(Phrases[countHeaderText]);
  }, [countHeaderText]);
  // adds the user input text to the database and then to the card
  const addCard = async () => {
    if (textInput.length > 100) {
      alert("Text is too long!");
      settextInput("");
    } else if (textInput === "") {
      alert("Please enter something...");
    } else {
      const shuffledText = shuffleWords(textInput);
      try {
        await setDoc(doc(collection(database, "memes")), {
          text: shuffledText,
        });
        settextInput("");
        if (countHeaderText === Phrases.length) {
          setcountHeaderText(0);
        } else {
          setcountHeaderText(countHeaderText + 1);
        }

        setcountColors(randomNumberInRange(1, Colors.length - 1));
        setcountColorsHeaderText(randomNumberInRange(1, Colors.length - 1));
        setcountColorsHeaderBox(randomNumberInRange(1, Colors.length - 1));
        setcountColorsHeaderBG(randomNumberInRange(1, Colors.length - 1));
        setLatestMeme(shuffledText);
        setsuccessFlag(true);
        console.log("Document Created");
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      <section
        style={{
          backgroundColor:
            countColorsHeaderBG === 0 ? "#ffffff" : Colors[countColorsHeaderBG],
        }}
      >
        <div className="section1">
          <div
            className="textbox"
            style={{
              backgroundColor:
                countColorsHeaderBG === 0
                  ? "#ffffff"
                  : Colors[countColorsHeaderBox],
            }}
          >
            <span
              style={{
                color:
                  countColorsHeaderText === 0
                    ? "#000000"
                    : Colors[countColorsHeaderText],
              }}
            >
              {HeaderText}
            </span>
          </div>

          <button
            style={{
              backgroundColor:
                countColorsHeaderText === 0 ? "#474a50" : Colors[countColors],
            }}
            onClick={() => setShowInput(!showInput)}
          >
            Créons un mème
          </button>
          {showInput && (
            <div className="inputContainer">
              <input
                placeholder="Commenter la photo et clicker sur GO!"
                value={textInput}
                onChange={(e) => settextInput(e.target.value)}
              ></input>

              <button
                style={{
                  backgroundColor:
                    countColorsHeaderText === 0
                      ? "#474a50"
                      : Colors[countColors],
                  padding: "7px 15px",
                  maxWidth: "100px",
                  width: "100%",
                  alignSelf: "center",
                  fontSize: successFlag ? "10px" : "15px",
                  pointerEvents: successFlag && "none",
                }}
                onClick={addCard}
                disabled={successFlag}
              >
                {successFlag ? "Votre meme est ci-dessous!" : "GO!"}
              </button>
            </div>
          )}
          {latestMeme !== "" && <h2>Ton mème:</h2>}
          {latestMeme !== "" && <Card text={latestMeme}></Card>}
        </div>
      </section>
      <hr></hr>
      <section className="section2">
        <div
          className="cards_container"
          style={{
            transform: cards.length > 20 ? "scale(60%) translateY(-30%)" : "",
            gridTemplateColumns: cards.length > 20 ? "repeat(6,1fr)" : "",
          }}
        >
          {cards.map((card, i) => {
            return <Card key={i} id={card.id} text={card.data().text}></Card>;
          })}
        </div>
      </section>
    </>
  );
}

export default App;
