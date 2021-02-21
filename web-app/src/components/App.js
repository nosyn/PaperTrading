import { useQuery } from "@apollo/client";
import React from "react";

// Queries
import GET_RATES from "../graphql/queries/GET_RATES";

function App() {
  const { loading, error, data } = useQuery(GET_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));
}

export default App;
