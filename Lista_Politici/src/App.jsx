import { useState, useEffect, useMemo } from "react"

function App() {

  const [politici, setPolitici] = useState([]);
  const [ricerca, setRicerca] = useState("");

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then(res => res.json())
      .then(data => setPolitici(data))
      .catch(error => console.error(error))
  }, []);

  const politiciFiltrati = useMemo(() => {
    return politici.filter(p => {
      const ricercaNome = p.name.toLowerCase().includes(ricerca.toLowerCase());
      const ricercaBiografia = p.biography.toLowerCase().includes(ricerca.toLowerCase());
      return ricercaNome || ricercaBiografia
    });
  }, [politici, ricerca]);

  return (
    <>
      <div>
        <h1>Lista Politici</h1>
        <input type="text"
          placeholder="Quale Politico vuoi trovare?"
          value={ricerca}
          onChange={e => setRicerca(e.target.value)}
        />
        <div className="flex-container">
          {politiciFiltrati.map(p => (
            <div className="card" key={p.id}>
              <h2>{p.name}</h2>
              <img src={p.image} alt={p.name} />
              <p>{p.position}</p>
              <p>{p.biography}</p>
            </div>
          ))}
        </div>
      </div>

    </>
  )
}

export default App
