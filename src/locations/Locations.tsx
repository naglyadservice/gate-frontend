import LocationList from './LocationList';



export default function Locations() {
  return (
    <>
      <div className="pt-6 pb-5">
        <div className="flex justify-between items-center gap-5">
          <span className="text-xl sm:text-2xl font-semibold">Мої локації</span>
        </div>
      </div>
      <LocationList />
    </>
  )
}
