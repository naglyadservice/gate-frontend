import Button from "./Button";

function Add() {
  return (
    <div className="pt-6 pb-5">
      <div className="flex justify-between items-center gap-5">
        <span className="text-xl sm:text-2xl font-semibold">Moї точки доступу</span>

        <Button type="outlined">
          <span className="text-4xl font-light leading-4 mb-1">+</span>
          <span>Додати</span>
        </Button>
      </div>
    </div>

  )
}

export default Add