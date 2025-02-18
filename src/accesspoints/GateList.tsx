import React from "react";

import { useAuth } from "../state/auth";
import { useGates } from "../state/accesspoints";

import GateItem from "./GateItem";



function GateList() {
  const id = useAuth(selector => selector.id);
  const { getAllGates, gates } = useGates();

  React.useEffect(() => {
    if (!id) return;

    getAllGates();
  }, [id])

  if (!gates.length) return null;

  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      {gates.length > 0 && gates.map(el => (
        <GateItem
          key={el.id}
          id={el.id}
          address={el.address}
          gateFor={el.label || "точка проїзду"}
        />
      ))}
    </ul>
  )
}

export default GateList