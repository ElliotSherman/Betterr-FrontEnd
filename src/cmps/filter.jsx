import { useState } from "react"
import { useFormRegister } from "../hooks/useFormRegister"

export const Filter = ({ onChangeFilter }) => {
  const [maxPriceOpen, setMaxPriceOpen] = useState(false)
  const [maxDeliveryOpen, setMaxDeliveryOpen] = useState(false)
  const [maxRatingOpen, setMaxRatingOpen] = useState(false)
  const [register, setFields] = useFormRegister(
    {
      basicPrice: "",
      basicDaysToMake: "",
      rate: "",
    },
    onChangeFilter
  )
  const filterSettings = [
    {
      text: "Max Price",
      handler: () => setMaxPriceOpen(!maxPriceOpen),
      state: maxPriceOpen,
      placeholder: "Max Price",
      name: "basicPrice",
      type: "number",
    },
    {
      text: "Delivery Time",
      handler: () => setMaxDeliveryOpen(!maxDeliveryOpen),
      state: maxDeliveryOpen,
      placeholder: "Delivery Time",
      name: "basicDaysToMake",
      type: "number",
    },
    {
      text: "Rating",
      handler: () => setMaxRatingOpen(!maxRatingOpen),
      state: maxRatingOpen,
      placeholder: "Rating",
      name: "rate",
      type: "number",
    },
  ]
  const filters = filterSettings.map((filter) => (
    <div
      className="flex align-center fiverr-style-filter"
      onClick={filter.state ? undefined : filter.handler}
    >
      <div className="text">{filter.text}</div>
      <span className={`filter-chevron ${filter.state && "open"}`}>
        <ChevronSvgIcon />
      </span>
      <form
        className="form-modal"
        style={{
          display: `${filter.state ? "" : "none"}`,
        }}
      >
        <section>
          <input
            {...register(`${filter.name}`, `${filter.type}`)}
            placeholder={`${filter.placeholder}`}
          />
        </section>
      </form>
    </div>
  ))

  return (
    <section className="flex filter-options">
      {filters}
      {filterSettings.map((st) => (
        <div
          className="open-listner"
          onClick={st.state ? st.handler : undefined}
          style={{
            display: `${!st.state ? "none" : ""}`,
          }}
        ></div>
      ))}
      <button
        className="btn btn-reset-filter"
        onClick={() =>
          setFields({ basicPrice: "", basicDaysToMake: "", rate: "" })
        }
      >
        reset
      </button>
    </section>
  )
}
const ChevronSvgIcon = () => {
  return (
    <svg
      width="11"
      height="7"
      viewBox="0 0 11 7"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5.4636 6.38899L0.839326 1.769C0.692474 1.62109 0.692474 1.38191 0.839326 1.23399L1.45798 0.61086C1.60483 0.462945 1.84229 0.462945 1.98915 0.61086L5.72919 4.34021L9.46923 0.61086C9.61608 0.462945 9.85354 0.462945 10.0004 0.61086L10.619 1.23399C10.7659 1.38191 10.7659 1.62109 10.619 1.769L5.99477 6.38899C5.84792 6.5369 5.61046 6.5369 5.4636 6.38899Z"></path>
    </svg>
  )
}
