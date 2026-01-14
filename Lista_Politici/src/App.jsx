import { useState, useEffect, use } from "react"

function App() {

  const [politici, setPolitici] = useState([]);
  const [filtro, setFiltro] = useState();

  useEffect(() => {
    fetch("http://localhost:3333/politicians")
      .then(res => res.json())
      .then(data => setPolitici(data))
      .catch(error => console.error(error))
  }, []);

  console.log(politici)

  return (
    <>
      <div>
        <h1>Lista Politici</h1>
        <input type="text"
          placeholder="Quale Politico vuoi trovare?"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
        />
        <div className="flex-container">
          {politici.map(p => (
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
