import "./App.css";
import React, { useState } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [advice, setAdvice] = useState("");
  const [randomNumber, setRandomNumber] = useState(0);
  const generalAdvice = [
    "You should meditate the answer lies within you.",
    "Ask your mom, she knows better.",
    "Talk to your friend about it.",
  ];

  const fireQuery = (e) => {
    e.preventDefault();
    setSearch(search);
    fetch(`https://api.adviceslip.com/advice/search/${search}`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result: ", result);
          if (!result.hasOwnProperty("slips")) {
            setRandomNumber(Math.floor(Math.random() * 3));
            console.log(
              "Current random advice : ",
              generalAdvice[randomNumber]
            );
            setAdvice("null");
          } else {
            setAdvice(result.slips[0].advice);
          }
        },
        (error) => {}
      );
    setSearch("");
  };

  return (
    <div className="App">
      <h1>Seek Advice and Keep Calm</h1>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLB3ZFUBeO9EEy0kLrwta-g4XXyjqa-Q177g&usqp=CAU"
        alt=""
      />
      <form>
        <input
          className="search__box"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="search__button" type="submit" onClick={fireQuery}>
          Search
        </button>
      </form>
      <div className="advice">
        <h3>{advice === "null" ? generalAdvice[randomNumber] : advice}</h3>
      </div>
    </div>
  );
}

export default App;
