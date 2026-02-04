import { useEffect, useRef, useState } from "react";
import fundo from "./assets/img/fundo.jpg";
import sorteioImg from "./assets/img/sort 1.png";
import { registerSW } from "virtual:pwa-register";


function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const updateSW = registerSW({
    onNeedRefresh() {
      console.log("Nova versão disponível");
    },
    onOfflineReady() {
      console.log("App pronto para uso offline");
    },
  });

  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const [resultado, setResultado] = useState("");
  const [showResultado, setShowResultado] = useState(false);

  const intervalRef = useRef(null);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  function sortearNumero() {
    if (intervalRef.current) return;

    const minNum = Number(min);
    const maxNum = Number(max);

    if (
      min === "" ||
      max === "" ||
      isNaN(minNum) ||
      isNaN(maxNum) ||
      minNum >= maxNum
    ) {
      alert("Informe um intervalo válido!");
      return;
    }

    const numeroFinal =
      Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

    let contador = minNum;
    setShowResultado(false);

    intervalRef.current = setInterval(() => {
      setResultado(contador);
      contador++;

      if (contador > numeroFinal) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setResultado(`🎉 ${numeroFinal} 🎉`);
        setShowResultado(true);
      }
    }, 30);
  }

  return (
    <div className="app">
      <img src={fundo} className="fundo" alt="Fundo do site" />
      <img src={sorteioImg} className="sorteio" alt="Imagem de sorteio" />

      <button className="toggle-theme" onClick={toggleTheme}>
        {theme === "dark" ? "🌙 Modo Claro" : "☀️ Modo Escuro"}
      </button>

      <h2>Sortear um Número</h2>

      <div className="inputs">
        <input
          type="number"
          className="input-min"
          placeholder="entre"
          aria-label="Número mínimo"
          value={min}
          onChange={(e) => setMin(e.target.value)}
        />

        <input
          type="number"
          className="input-max"
          placeholder="e"
          aria-label="Número máximo"
          value={max}
          onChange={(e) => setMax(e.target.value)}
        />
      </div>

      <button
        className="btn-sortear"
        onClick={sortearNumero}
        disabled={intervalRef.current !== null}
      >
        Sortear
      </button>

      <p className={`resultado ${showResultado ? "show" : ""}`}>
        {resultado}
      </p>
    </div>
  );
}

export default App;