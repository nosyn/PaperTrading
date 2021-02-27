import React from "react";

// Queries
import { useQuery } from "@apollo/client";
import GET_RATES from "../graphql/queries/GET_RATES";

// Components
import SingleCard from "./SingleCard";

const MultipleCards = () => {
  const { loading, error, data } = useQuery(GET_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.rates.map(({ currency, rate }) => (
    <SingleCard currency={currency} rate={rate} key={currency} />
  ));
};

export default MultipleCards;
