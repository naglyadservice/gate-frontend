import React from "react";
import toast from "react-hot-toast";

import apiClient from "../utils/client";
import { useAuth } from "../state/auth";

import GateItem from "./GateItem";
import { SmallSpinner } from "../components/Spinner";



interface IGroupedAccessPoints {
  location: string;
  items: IMyAccesspoints[];
}

function GateList() {
  const id = useAuth(selector => selector.id);
  const [isLoading, setIsLoading] = React.useState(false);
  const [accesspoints, setAccesspoints] = React.useState<IGroupedAccessPoints[]>([]);

  React.useEffect(() => {
    if (!id) return;

    setIsLoading(true);

    (async () => {
      try {
        const res = await apiClient.get(`/users/me/accesspoints`);
        const incAccessPoints: IMyAccesspoints[] = res.data || [];

        if (incAccessPoints.length === 0) return;

        interface IAccum {
          [key: string]: IMyAccesspoints[]
        }

        const result = incAccessPoints.reduce((accum: IAccum, item: IMyAccesspoints) => {
          const locationId = item.location.name || item.location.address || item.location.id || "Без локації";
          accum[locationId] = accum[locationId] || [];
          accum[locationId].push(item);
          return accum;
        }, {});

        const mapped = Object
          .entries(result)
          .map(([key, value]) => ({ location: key, items: value }));

        setAccesspoints(mapped);
      } catch (error) {
        toast.error("Error...")
      } finally {
        setIsLoading(false)
      }
    })();
  }, [id])

  if (isLoading) return <SmallSpinner />;

  if (accesspoints.length === 0) return <div>Точки доступу відсутні</div>;

  return (
    <div className="flex flex-col gap-8">
      {accesspoints.map(group => (
        <>
          {group.location && group.items.length && (
            <div>
              <div className="mb-4 font-semibold">{group.location}</div>
              <ul className="flex flex-col gap-4">
                {group.items.map(el => (
                  <GateItem
                    key={el.id}
                    id={el.id}
                    address={el.address}
                    gateFor={el.label || "точка проїзду"}
                  />
                ))}
              </ul>
            </div>
          )}
        </>
      ))}
    </div>
  )
}

export default GateList