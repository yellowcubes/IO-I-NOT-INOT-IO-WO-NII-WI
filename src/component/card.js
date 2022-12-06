import { database } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
function Card({ text, id }) {
  const HandleDelete = async (id) => {
    let dataToDelete = doc(database, "memes", id);

    try {
      await deleteDoc(dataToDelete);
      console.log("deleted");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card_text">
        <h2>{text}</h2>
      </div>
      <img className="card_img" src="henlo.jpg" alt="henlo" />
      <button style={{backgroundColor: 'rgb(20,0,0,0,0)'}} onClick={() => HandleDelete(id)}>.</button>
    </div>
  );
}
export default Card;
