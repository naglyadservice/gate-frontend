import GateItem from "./GateItem";

function GateList() {
  return (
    <ul className="flex flex-col gap-4 sm:gap-5">
      <GateItem gateFor="в’їзд" address="вул. Симона Петлюри 32, м. Київ" />
      <GateItem gateFor="виїзд" address="вул. Симона 32" />
      <GateItem gateFor="в’їзд та виїзд" address="вул. Симона Петлюри 158/4а" />
    </ul>
  )
}

export default GateList