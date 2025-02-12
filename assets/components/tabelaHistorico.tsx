import React from "react";

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

interface HistoricoPesquisasProps {
  history: SearchEntry[];
}

export default function HistoricoPesquisas({
  history,
}: HistoricoPesquisasProps): JSX.Element {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Par</th>
          <th className="border p-2">Nome</th>
          <th className="border p-2">Compra</th>
          <th className="border p-2">Venda</th>
          <th className="border p-2">Data/Hora</th>
        </tr>
      </thead>
      <tbody>
        {history.map((entry) => (
          <tr key={entry.id}>
            <td className="border p-2">{entry.id}</td>
            <td className="border p-2">{entry.pair}</td>
            <td className="border p-2">{entry.currency.name}</td>
            <td className="border p-2">{entry.currency.bid}</td>
            <td className="border p-2">{entry.currency.ask}</td>
            <td className="border p-2">{entry.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
