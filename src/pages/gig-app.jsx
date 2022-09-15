import React, { useEffect } from "react"

import {
  loadGigs,
  addGig,
  updateGig,
  removeGig,
  addToCart,
} from "../store/gig.actions.js"
import { useDispatch, useSelector } from "react-redux"
import { showSuccessMsg } from "../services/event-bus.service.js"
import { gigService } from "../services/gig.service.js"

export function GigApp() {
  const gigs = useSelector((state) => state.gigModule.gigs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadGigs())
  }, [])

  const onRemoveGig = (gigId) => {
    dispatch(removeGig(gigId))
  }
  const onAddGig = () => {
    const gig = gigService.getEmptyGig()
    gig.vendor = prompt("Vendor?")
    dispatch(addGig(gig))
  }
  const onUpdateGig = (gig) => {
    const price = +prompt("New price?")
    const gigToSave = { ...gig, price }
    dispatch(updateGig(gigToSave))
  }

  const onAddToCart = (gig) => {
    console.log(`Adding ${gig.vendor} to Cart`)
    addToCart(gig)
    showSuccessMsg("Added to Cart")
  }
  if (!gigs) return <h1>Loading..</h1>
  return (
    <div>
      {console.log(gigs)}
      <h3>Gigs App</h3>
      <main>
        <button onClick={onAddGig}>Add Gig ⛐</button>

        <ul className="gig-list">
          {gigs.map((gig) => (
            <li className="gig-preview" key={gig._id}>
              <h4>{gig.vendor}</h4>
              <h1>⛐</h1>
              <p>
                Price: <span>${gig.price.toLocaleString()}</span>
              </p>
              <p>
                Owner: <span>{gig.owner && gig.owner.fullname}</span>
              </p>
              <div>
                <button
                  onClick={() => {
                    onRemoveGig(gig._id)
                  }}
                >
                  x
                </button>
                <button
                  onClick={() => {
                    onUpdateGig(gig)
                  }}
                >
                  Edit
                </button>
              </div>

              <button
                className="buy"
                onClick={() => {
                  onAddToCart(gig)
                }}
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
