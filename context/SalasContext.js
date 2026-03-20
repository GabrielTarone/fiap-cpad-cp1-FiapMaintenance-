import { createContext, useState } from "react";

export const SalasContext = createContext();

export function SalasProvider({ children }) {
  const [salas, setSalas] = useState([
    { id: "1", nome: "Lab 101", problemas: [] },
    { id: "2", nome: "Sala 202", problemas: [] },
  ]);

  function adicionarSala(nome) {
  const novaSala = {
    id: Date.now().toString(),
    nome,
    problemas: [],
  };

  setSalas((prev) => [...prev, novaSala]);

  return novaSala.id;
}

  function adicionarProblema(idSala, problema) {
    setSalas((prev) =>
      prev.map((sala) =>
        sala.id === idSala
          ? { ...sala, problemas: [...sala.problemas, problema] }
          : sala,
      ),
    );

}

  function removerSalaPorNome(nome) {
    setSalas((prev) =>
      prev.filter((sala) => sala.nome !== nome)
    );
  }


  return (
    <SalasContext.Provider value={{
      salas, 
      adicionarSala, 
      adicionarProblema,
      removerSalaPorNome,}}>
      {children}
    </SalasContext.Provider>
  )
}
