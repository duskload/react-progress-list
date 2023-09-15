import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./AddSection.scss";

interface IAddSection {
  onClick: (text: string) => void;
  placeholder?: string;
  buttonTitle?: string;
}

export function AddSection({
  onClick,
  placeholder = "Add new section",
  buttonTitle = "Add",
}: IAddSection) {
  const [value, setValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onClick(value);
    setValue("");
  };

  return (
    <form onSubmit={onSubmit} className="add-section-container">
      <TextField
        value={value}
        onChange={onChange}
        fullWidth
        label={placeholder}
        variant="outlined"
        size="small"
      />
      <div className="add-section-container--button">
        <Button type="submit" variant="outlined">
          {buttonTitle}
        </Button>
      </div>
    </form>
  );
}
