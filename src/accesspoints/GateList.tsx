import React from "react";
import GateItem from "./GateItem";
import { useAuth } from "../state/auth";
import { useGates } from "../state/accesspoints";
import { useAccountTab } from "../state/account.tabs";

function GateList() {
  const id = useAuth(selector => selector.id);
  const { getAllGates, gates } = useGates();
  const tab = useAccountTab(selector => selector.tab);


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
          gateFor="точка проїзду"
          isEditing={tab === "settings"}
        />
      ))}
    </ul>
  )
}

export default GateList