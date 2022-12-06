import React, { useState, useEffect } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {
  const [sushis, setSushis] = useState([])
  const [fourSushis, setFourSushis] = useState([])
  const [budget, setBudget] = useState(100)

  useEffect(() => {
    fetch(API)
    .then((r) => r.json())
    .then((data) => {
      const allSushis = data.map(s => {
        return {...s, eaten: false}
      })
      
      const four = allSushis.splice(0, 4)
      setSushis(allSushis)
      setFourSushis(four)
    })
  }, [])

  const getSushi = () => {
    console.log("getSushi")
    const allSushis = sushis
    const four = allSushis.splice(0, 4)
    setSushis(allSushis)
    setFourSushis(four)
  }

  const eatSushi = (e) => {
    console.log(e.target)
    if (budget - parseInt(e.target.dataset.price) >= 0) {
      const newSushis = fourSushis.map(s => s.id == e.target.id ? {...s, eaten: true} : s)
    setFourSushis(newSushis)
    const newBudget = budget - parseInt(e.target.dataset.price)
    setBudget(newBudget)
    }
  }


  return (
    <div className="app">
      <SushiContainer fourSushis={fourSushis} eatSushi={eatSushi} getSushi={getSushi}/>
      <Table fourSushis={fourSushis} budget={budget}/>
    </div>
  );
}

export default App;
