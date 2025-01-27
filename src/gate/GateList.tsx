import React from "react";
import GateItem from "./GateItem";
import { useAuth } from "../state/auth";
import { useGates } from "../state/gates";
import { useAccountTab } from "../state/account.tabs";

function GateList() {
  const user_id = useAuth(selector => selector.user_id);
  const { getAllGates, gates } = useGates();
  const tab = useAccountTab(selector => selector.tab);

  React.useEffect(() => {
    if (!user_id) return;

    getAllGates();
  }, [user_id])

  // if (!gates.length) return null;

  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      <GateItem gateFor="точка проїзду" key={123} id={"123"} address={"TEST"} isEditing={tab === "settings"} />
      {
        gates.map(el => (
          <GateItem gateFor="точка проїзду" key={el.id} id={el.id} address={el.label} isEditing={tab === "settings"} />
        ))
      }
    </ul>
  )
}

export default GateList