import React from "react";

import { useAuth } from "../state/auth";
import { useLocation } from "../state/locations";
import { useAccountTab } from "../state/account.tabs";

import LocationItem from "./LocationItem";



function LocationList() {
  const user_id = useAuth(selector => selector.id);
  const tab = useAccountTab(selector => selector.tab);
  const { locations, getAllLocations } = useLocation();

  React.useEffect(() => {
    getAllLocations();
  }, [user_id])

  if (!locations.length) return null;

  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      {
        locations.map(el => (
          <LocationItem
            key={el.id}
            id={el.id}
            address={el.address}
            isEditing={tab === "settings"}
          />
        ))
      }
    </ul>
  )
}

export default LocationList