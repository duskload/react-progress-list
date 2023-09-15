import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";

import "./UselessFact.scss";

const URI = "https://uselessfacts.jsph.pl/api/v2/facts/random";

type TUselessFact = {
  shouldGetQuote: boolean;
};

export function UselessFact({ shouldGetQuote = false }: TUselessFact) {
  const [text, setText] = useState("");

  const fetchFact = async () => {
    await fetch(URI, { method: "GET" })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.text) {
          setText(response.text);
        }
      })
      .catch((e) => {
        console.log("Error on fetching the quote", e.message);
      });
  };

  useEffect(() => {
    if (shouldGetQuote) {
      fetchFact();
    }
  }, [shouldGetQuote]);

  if (!text || !shouldGetQuote) return null;

  return (
    <div className="useless-fact-container">
      <Paper elevation={4} style={{ padding: 8 }}>
        <span className="useless-fact-container--text">{text}</span>
      </Paper>
    </div>
  );
}
