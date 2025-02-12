# Documentação do Projeto de Cotação

## Descrição

Este projeto é um frontend desenvolvido em React para realizar cotação de moedas. A aplicação permite que os usuários consultem valores de pares de moedas e armazenem um histórico de pesquisas, utilizando a API "AwesomeAPI" para obter os dados atualizados.

## Tecnologias Utilizadas

- **React** com **Vite** para um ambiente de desenvolvimento rápido e eficiente
- **TypeScript** para tipagem segura e melhor manutenção do código
- **Tailwind CSS** para estilização moderna e responsiva
- **useState** para gerenciamento de estado local
- **Consumo de API** para obter dados dinâmicos sobre cotações

## Funcionalidades

- **Busca de Cotação de Moedas:** Permite ao usuário pesquisar pares de moedas e visualizar suas cotações em tempo real
- **Histórico de Pesquisas:** Armazena as últimas pesquisas realizadas pelo usuário
- **Top 10 Pares de Moedas:** Exibe os 10 pares de moedas mais populares

## Estrutura do Projeto

```
/cotacao-app
├── src
│   ├── components # Componentes reutilizáveis (TabelaMoedas, HistoricoPesquisas, etc.)
│   ├── style     # Arquivos CSS globais
├── assets
│   ├── App.tsx       # Componente principal
│   ├── main.tsx      # Ponto de entrada da aplicação
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## API Utilizada

A aplicação consome dados da **[AwesomeAPI](https://economia.awesomeapi.com.br/json/last/)** para obter informações sobre cotações de pares de moedas.

### Exemplo de Consumo de API

```typescript
const handleSearch = async (pair: string) => {
  const formattedPair = pair.includes("/") ? pair.replace("/", "-") : pair;

  try {
    const response = await fetch(
      `https://economia.awesomeapi.com.br/json/last/${formattedPair}`
    );
    const data = await response.json();

    const key = formattedPair.replace("-", "");
    const currency = data[key];

    if (!currency) {
      throw new Error("Dados não encontrados para o par informado.");
    }

    const newEntry = {
      id: Date.now(),
      pair: formattedPair,
      currency: {
        name: currency.name,
        bid: currency.bid,
        ask: currency.ask,
      },
      timestamp: new Date().toLocaleString(),
    };

    setHistory((prevHistory) => [...prevHistory, newEntry]);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
  }
};
```

## Deploy

A aplicação será hospedada na **Vercel** ou **Netlify**, permitindo acesso rápido e fácil aos usuários.

##
