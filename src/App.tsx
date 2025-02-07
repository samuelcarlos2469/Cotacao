import React, { useState } from "react";
import "../assets/style/style.css";
import TabelaMoedas from "../assets/components/tabelaMoedas";
import HistoricoPesquisas from "../assets/components/tabelaHistorico";

interface Currency {
  name: string;
  bid: string;
  ask: string;
}

interface SearchEntry {
  id: number;
  pair: string;
  currency: Currency;
  timestamp: string;
}

export default function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"historico" | "tabela">(
    "historico"
  );
  const [history, setHistory] = useState<SearchEntry[]>([]);
  const [pairInput, setPairInput] = useState<string>("");

  // Função que faz a busca na API e atualiza o histórico
  const handleSearch = async (pair: string) => {
    // Formata o par para o padrão que a API espera: substitui "/" por "-" (ex: "USD/BRL" -> "USD-BRL")
    const formattedPair = pair.includes("/") ? pair.replace("/", "-") : pair;

    try {
      const response = await fetch(
        `https://economia.awesomeapi.com.br/json/last/${formattedPair}`
      );
      const data = await response.json();

      // A API retorna um objeto onde a chave é o par sem hífen, por exemplo "USDBRL" para "USD-BRL"
      const key = formattedPair.replace("-", "");
      const currency = data[key];

      if (!currency) {
        throw new Error("Dados não encontrados para o par informado.");
      }

      // Cria a nova entrada para o histórico
      const newEntry: SearchEntry = {
        id: Date.now(),
        pair: formattedPair,
        currency: {
          name: currency.name,
          bid: currency.bid,
          ask: currency.ask,
        },
        timestamp: new Date().toLocaleString(),
      };

      // Atualiza o estado do histórico
      setHistory((prevHistory) => [...prevHistory, newEntry]);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  // Função chamada quando o formulário é submetido
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pairInput.trim() !== "") {
      await handleSearch(pairInput);
      // Opcional: limpe o input após a busca
      setPairInput("");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center p-6 gap-4 bg-gray-100">
      {/* Formulário: Ao ser submetido, chama onSubmit */}
      <form
        onSubmit={onSubmit}
        className="flex gap-4 bg-gray-100 p-4 rounded-lg"
      >
        <input
          type="text"
          name="pair"
          placeholder="Ex: USD/BRL"
          value={pairInput}
          onChange={(e) => setPairInput(e.target.value)}
          className="border p-2 rounded-md bg-white"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-15"
        >
          Buscar
        </button>
      </form>

      <div className="flex border-b w-5xl">
        <button
          onClick={() => setActiveTab("historico")}
          className={`p-3 flex-1 text-center ${
            activeTab === "historico" ? "bg-gray-200" : ""
          }`}
        >
          Histórico de Pesquisas
        </button>
        <button
          onClick={() => setActiveTab("tabela")}
          className={`p-3 flex-1 text-center ${
            activeTab === "tabela" ? "bg-gray-200" : ""
          }`}
        >
          Top 10 Pares de Moedas
        </button>
      </div>

      <div className="p-4 w-5xl">
        {activeTab === "historico" && (
          <div>
            {/* Passa o histórico como prop para o componente de histórico */}
            <HistoricoPesquisas history={history} />
          </div>
        )}

        {activeTab === "tabela" && (
          <div>
            <TabelaMoedas />
          </div>
        )}
      </div>
    </div>
  );
}
