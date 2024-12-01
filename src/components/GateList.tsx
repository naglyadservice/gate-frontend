import React from "react";
import GateItem from "./GateItem";
import { useAuth } from "../state/auth";
import { useGates } from "../state/gates";

function GateList() {
  const user_id = useAuth(selector => selector.user_id);
  const { getAllGates, gates } = useGates();

  React.useEffect(() => {
    if (!user_id) return;

    getAllGates();
  }, [user_id])

  if (!gates.length) return null;

  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      {
        gates.map(el => (
          <GateItem gateFor="точка проїзду" key={el.id} id={el.id} address={el.label} />
        ))
      }
    </ul>
  )
}

export default GateList