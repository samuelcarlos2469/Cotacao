import { useState, useEffect } from "react";
import "../style/style.css";

// Define a interface para cada moeda
interface Currency {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

// A resposta da API retorna um objeto onde cada propriedade é uma moeda
type ApiResponse = Record<string, Currency>;

export default function TabelaMoedas(): JSX.Element {
  // Estado para armazenar os dados da API
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Função assíncrona para buscar os dados
  async function getData(): Promise<ApiResponse> {
    const res = await fetch(
      "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,BTC-BRL"
    );
    // Faz o parse da resposta JSON e tipa como ApiResponse
    const json: ApiResponse = await res.json();
    return json;
  }

  // useEffect para buscar os dados quando o componente monta
  useEffect(() => {
    getData()
      .then((responseData) => {
        setData(responseData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  }, []);

  // Enquanto os dados não chegam, renderiza uma mensagem de carregamento
  if (loading || data === null) {
    return <p>Carregando...</p>;
  }

  return (
    <table className="w-5xl">
      <thead>
        <tr>
          <th>Moeda</th>
          <th>Compra</th>
          <th>Venda</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(data).map((currency) => (
          <tr key={currency.code}>
            <td>{currency.name}</td>
            <td>{currency.bid}</td>
            <td>{currency.ask}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
