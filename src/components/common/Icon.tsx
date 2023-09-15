import React from "react";
import { colors } from "../../constants/colors";

type TIcon = {
  Component: React.ElementType;
  color?: string;
  onClick?: () => void;
};

export function Icon({ Component, color, onClick }: TIcon) {
  return (
    <Component
      sx={{
        fontSize: 24,
        color: color || colors.defaultGrey,
      }}
      onClick={onClick}
    />
  );
}
