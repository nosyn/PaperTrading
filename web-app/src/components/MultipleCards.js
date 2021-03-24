import React from "react";

// Queries
import { useQuery, useLazyQuery } from "@apollo/client";
import GET_RATES from "../graphql/queries/GET_RATES";
import PING from "../graphql/queries/PING";

// Components
import SingleCard from "./SingleCard";

const MultipleCards = () => {
  const { loading, error, data } = useQuery(GET_RATES);
  const [ping] = useLazyQuery(PING, {
    onCompleted: (data) => {
      console.log("PING SUCCESS: ", data);
    },
    onError: (error) => {
      console.log("PING ERROR: ", error);
    },
    fetchPolicy: "network-only",
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <div>
        <button onClick={ping}>Click me</button>
      </div>
      <div>
        {data.rates.map(({ currency, rate }) => (
          <SingleCard currency={currency} rate={rate} key={currency} />
        ))}
      </div>
    </>
  );
};

export default MultipleCards;
