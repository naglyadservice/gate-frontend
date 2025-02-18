import React from "react";
import toast from "react-hot-toast";

import apiClient from "../utils/client";
import { useAuth } from "../state/auth";

import GateItem from "./GateItem";
import { SmallSpinner } from "../components/Spinner";



function GateList() {
  const id = useAuth(selector => selector.id);
  const [isLoading, setIsLoading] = React.useState(false);
  const [accesspoints, setAccesspoints] = React.useState<IAccesspoint[]>([]);

  React.useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    apiClient.get(`/users/me/accesspoints`)
      .then((res) => setAccesspoints(res.data))
      .catch(() => toast.error("Error..."))
      .finally(() => setIsLoading(false));
  }, [id])

  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      {isLoading && <SmallSpinner />}

      {!isLoading && accesspoints.length === 0 && <span>Точки доступу відсутні</span>}

      {!isLoading && accesspoints.length > 0 && accesspoints.map(el => (
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