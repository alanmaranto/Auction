import React from "react";
import { THeader, TRow, THeaderCell } from "../indexSemanticUi";

export const TableHeader = ({ column, direction, handleSort }) => {
  return (
    <THeader>
      <TRow>
        <THeaderCell
          width={1}
        >
          Título
        </THeaderCell>
        <THeaderCell
          width={1}
        //   sorted={column === "endingAuction" ? direction : null}
        //   onClick={() => handleSort("endingAuction")}
        >
          Fecha de finalización
        </THeaderCell>
        <THeaderCell
          width={1}
        >
          Ganador
        </THeaderCell>
      </TRow>
    </THeader>
  );
};
