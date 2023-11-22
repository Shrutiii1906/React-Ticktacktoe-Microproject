import React, { useRef, useState, useEffect } from "react";
import "./Mobileout.css";
import X from "./fileimage/Monkey.svg";
import O from "./fileimage/yellow.svg";
import retry from "./fileimage/retry.svg"; 
import Mobilein from './Mobilein';

let GameArray = ["", "", "", "", "", "", "", "", ""];

function Mobileout(props) {

  let userIcon, compIcon;
  const userChoice = props.Choice;
  const compChoice = props.Choice === "X" ? "O" : "X"; // Corrected compChoice
  if (userChoice === "X") {
    userIcon = X;
    compIcon = O;
  } else {
    userIcon = O;
    compIcon = X;
  }

  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [userScore, setUserScore] = useState(0);
  let [compScore, setCompScore] = useState(0);
  let [tieScore, setTieScore] = useState(0);
  let [turn,setTurn] = useState(userChoice);
  let [Exit,showExit] = useState(false);
  let [WinnerDiv,showWinnerDiv] = useState(false);
  let [Winner,setWinner] = useState('');
  let [ShowStartPage,setShowStartPage] = useState(false);

  useEffect(() => {
    const User = localStorage.getItem("UserScore");
    const Computer = localStorage.getItem("CompScore");
    const Tie = localStorage.getItem("TieScore");


    if (User) {
      setUserScore(JSON.parse(User));
    }
    if (Computer) {
      setCompScore(JSON.parse(Computer));
    }
    if (Tie) {
      setTieScore(JSON.parse(Tie));
    }
  }, []);

  const UpdateLocal = (user, comp, tie) => {
    if (user !== "") localStorage.setItem("UserScore", JSON.stringify(user));
    if (comp !== "") localStorage.setItem("CompScore", JSON.stringify(comp));
    if (tie !== "") localStorage.setItem("TieScore", JSON.stringify(tie));
  };

  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);
  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

  const toggleBtn = (e, index) => {
    if (lock) {
      return;
    }
    if (count % 2 === 0 || count === 0) {
      // User's move
      if(GameArray[index]===""){
      e.target.innerHTML = `<img alt='user' src='${userIcon}' />`;
      GameArray[index] = userChoice;
      setCount(++count);
      setTurn(compChoice);
      winner(); 
      setTimeout(() => computerMove(), 1000);
    }} 
  };

  const computerMove = () => {
    if (lock) {
      return;
    }

    const emptyBoxes = GameArray.reduce((acc, value, index) => {
      if (value === "") {
        acc.push(index);
      }
      return acc;
    }, []);

    if (emptyBoxes.length > 0) {
      const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
      const compBoxIndex = emptyBoxes[randomIndex];

      if (box_array[compBoxIndex].current) {
        box_array[compBoxIndex].current.click();
        box_array[compBoxIndex].current.innerHTML = `<img alt='comp' src='${compIcon}' />`;
        GameArray[compBoxIndex] = compChoice;
        setCount(++count);
        winner();
        setTurn(userChoice);
      }
    } else {
      console.log("No empty boxes left.");
    }
  };

  const winner = () => {
    if (
      GameArray[0] === GameArray[1] &&
      GameArray[1] === GameArray[2] &&
      GameArray[2] !== ""
    ) {
      result(GameArray[2]);
    } else if (
      GameArray[3] === GameArray[4] &&
      GameArray[4] === GameArray[5] &&
      GameArray[5] !== ""
    ) {
      result(GameArray[5]);
    } else if (
      GameArray[6] === GameArray[7] &&
      GameArray[7] === GameArray[8] &&
      GameArray[8] !== ""
    ) {
      result(GameArray[8]);
    } else if (
      GameArray[0] === GameArray[3] &&
      GameArray[3] === GameArray[6] &&
      GameArray[6] !== ""
    ) {
      result(GameArray[6]);
    } else if (
      GameArray[2] === GameArray[5] &&
      GameArray[5] === GameArray[8] &&
      GameArray[8] !== ""
    ) {
      result(GameArray[8]);
    } else if (
      GameArray[1] === GameArray[4] &&
      GameArray[4] === GameArray[7] &&
      GameArray[7] !== ""
    ) {
      result(GameArray[7]);
    } else if (
      GameArray[0] === GameArray[4] &&
      GameArray[4] === GameArray[8] &&
      GameArray[8] !== ""
    ) {
      result(GameArray[8]);
    } else if (
      GameArray[2] === GameArray[4] &&
      GameArray[4] === GameArray[6] &&
      GameArray[6] !== ""
    ) {
      result(GameArray[6]);
    } else if (checkArray()) {
      result("Tie");
    }
  
  };

  const checkArray = () => {
    for (let i = 0; i < GameArray.length; i++) {
      if (GameArray[i] === "") {
        return false; 
      }
    }
    return true; 
  };

  const result = (won) => {
    setLock(true);
    if (won === userChoice) {
      setUserScore(userScore + 1);
      UpdateLocal(userScore + 1, compScore, tieScore);
      showWinnerDiv(true);
      setWinner(won);
    } else if (won === compChoice) {
      setCompScore(compScore + 1);
      UpdateLocal(userScore, compScore + 1, tieScore);
      showWinnerDiv(true);
      setWinner(won);
    } else {
      setTieScore(tieScore + 1);
      UpdateLocal(userScore, compScore, tieScore + 1);
      showWinnerDiv(true);
      setWinner('none');
    }
  };

  const toggleExit=()=>{
    showExit(true);
  }

  const togglePlayAgain=()=>{
    showExit(false);
    reset();
    resetScore();
  }

  const toggleNextRound=()=>{
    showWinnerDiv(false);
    reset();
  }

  const reset = () => {
    setLock(false);
    GameArray = ["", "", "", "", "", "", "", "", ""];
    setCount(0);
    setTurn(userChoice);

    box_array.forEach((ele) => {
      if (ele.current) {
        ele.current.innerHTML = "";
      }
    });
  };

  const resetScore = ()  => {
    localStorage.setItem("UserScore", JSON.stringify(0));
    localStorage.setItem("CompScore", JSON.stringify(0));
    localStorage.setItem("TieScore", JSON.stringify(0));
  };

  const handleExitClick = () =>{
    reset();
    resetScore();
    setShowStartPage(true);
  };

  return (
    <>
    {ShowStartPage? <Mobilein />:
    <div className="gameArea">
      <div className="top">
        <div className="icons">
          <img alt="XImage" src={X} />
          <img alt="OImage" src={O} />
        </div>
        <div className="Turn"><span>{turn}</span> Turn</div>
        <button
          className="Reset"
          onClick={() => {
            toggleExit();
          }}>
          <img src={retry} />
        </button>
      </div>
      <div className="board">
        <div className="rows">
          <div
            className="boxes"
            ref={box1}
            onClick={(e) => {
              toggleBtn(e, 0);
            }}
          ></div>
          <div
            className="boxes"
            ref={box2}
            onClick={(e) => {
              toggleBtn(e, 1);
            }}
          ></div>
          <div
            className="boxes"
            ref={box3}
            onClick={(e) => {
              toggleBtn(e, 2);
            }}
          ></div>
        </div>
        <div className="rows">
          <div
            className="boxes"
            ref={box4}
            onClick={(e) => {
              toggleBtn(e, 3);
            }}
          ></div>
          <div
            className="boxes"
            ref={box5}
            onClick={(e) => {
              toggleBtn(e, 4);
            }}
          ></div>
          <div
            className="boxes"
            ref={box6}
            onClick={(e) => {
              toggleBtn(e, 5);
            }}
          ></div>
        </div>
        <div className="rows">
          <div
            className="boxes"
            ref={box7}
            onClick={(e) => {
              toggleBtn(e, 6);
            }}
          ></div>
          <div
            className="boxes"
            ref={box8}
            onClick={(e) => {
              toggleBtn(e, 7);
            }}
          ></div>
          <div
            className="boxes"
            ref={box9}
            onClick={(e) => {
              toggleBtn(e, 8);
            }}
          ></div>
        </div>
      </div>
      {Exit &&    <div className='playAgain'>
      <div className="message">
        <h1>Do you want to quit?</h1>
        <div className="opt">
            <button className="yellow" onClick={handleExitClick}>QUIT</button>
            <button className="blue" onClick={togglePlayAgain}>PLAY AGAIN</button>
        </div>
        </div>
    </div>}
{WinnerDiv &&    
  <div className='playAgain'>
    <div className="message">
      {Winner === userChoice ? (
        <div className="title">
          <h3>YOU WON!</h3>
          <h1><img alt='comp' src={userIcon} /> TAKES THE ROUND</h1>
        </div>
      ) : Winner === compChoice ? (
        <div className="title">
          <h3>YOU LOST!</h3>
          <h1><img alt='comp' src={compIcon} /> TAKES THE ROUND</h1>
        </div>
      ) : (
        <div className="title">
          <h3>Tied!</h3>
          <h1>ROUND TIED</h1>
        </div>
      )}
      <div className="opt">
        <button className="blue" onClick={toggleNextRound}>NEXT ROUND</button>
        <button className="yellow" onClick={handleExitClick}>QUIT</button>
      </div>
    </div>
  </div>
}
      <div className="scoreBoard">
        <div className="scoreBtn blue">
          {userChoice}(You)<span>{userScore}</span>
        </div>
        <div className="scoreBtn yellow">
          Tie <span>{tieScore}</span>
        </div>
        <div className="scoreBtn grey">
          {compChoice}(CPU) <span>{compScore}</span>
        </div>
      </div>
    </div>
}
    </>
  );
}

export default Mobileout;