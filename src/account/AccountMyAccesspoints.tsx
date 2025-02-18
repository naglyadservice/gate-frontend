import React from "react";
import apiClient from "../utils/client";
import toast from "react-hot-toast";
import GateItem from "../accesspoints/GateItem";



function MyAccesspointsList() {
  const [myGates, setMyGates] = React.useState<IMyAccesspoints[]>([]);

  React.useEffect(() => {
    apiClient.get(`/users/me/accesspoints/owned`)
      .then((res) => {
        if (res.status != 200) return toast.error("Помилка під час запиту");
        setMyGates(res.data);
      }).catch(() => {
        toast.error("Помилка під час запиту");
      })
  }, [])

  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      {myGates.length === 0 && <span>No gates</span>}

      {myGates.length > 0 && myGates.map(el => (
        <GateItem
          key={el.id}
          id={el.id}
          address={el.address}
          gateFor={el.label || "точка проїзду"}
          isEditing={true}
        />
      ))}

      {/* <GateItem
        id={"123"}
        address={"Some address"}
        gateFor="точка проїзду"
        isEditing={true}
      /> */}
    </ul>
  )
}

export default MyAccesspointsList