import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { gigService } from "../services/gig.service"
import { loadGigs } from "../store/gig.actions"
import { GigPlans } from "../cmps/gig-plans"
import { SellerInfo } from "../cmps/seller-info"
import { ReviewList } from "../cmps/review-list"
import { GigImgsCarousel } from "../cmps/gig-imgs-carousel"
import { SellerOverview } from "../cmps/seller-overview"
import { CssVarsProvider } from '@mui/joy/styles'
import { userService } from "../services/user.service"
import ReactStars from 'react-stars'
import { utilService } from "../services/util.service"
import { ReviewsFilter } from "../cmps/reviews-filter"
import { useEffectUpdate } from "../hooks/useEffectUpdate"






export const GigDetails = () => {

    const [gig, setGig] = useState({
        currGig: undefined,
        reviews: []
    })
    // const [reviews, setReviews] = useState()
    const params = useParams()
    const navigate = useNavigate()
    const loadInterval = useRef()

    useEffect(() => {
        loadData()
        console.log('gig-details page: params.id:', params.id);

    }, [])

    useEffect(() => {

    }, [])




    useEffectUpdate(() => {
        console.log(gig.currGig);
        if (gig.currGig) {
            loadReviews()
            console.log("gigged", gig);
        }
        console.log("updated");

    }, [gig.currGig])

    const loadData = () => {
        gigService.loadDemoData()
        userService.loadDemoData()
        loadInterval.current = setTimeout(() => {
            console.log('loading');
            loadGig()
        }, 1000)
    }


    const loadGig = () => {
        const gigId = params.id
        gigService.getById(gigId)
            .then(newGig => {
                setGig(prevGig => ({ ...prevGig, currGig: newGig }))
            })
            .then(() => {
                console.log(gig);
                // loadReviews()
            })
    }

    const loadReviews = () => {
        userService.getReviewsById(gig.currGig.owner._id)
            .then(newReviews => {
                console.log("newReviews:", newReviews);
                setGig(prevGig => ({ ...prevGig, reviews: newReviews }))
            })

    }

    // const onChangeSortBy = (sortBy) => {
    //     let sortedReviews
    //     (sortBy === 'rate') ?
    //         sortedReviews = reviews.sort((a, b) => (b.rate > a.rate) ? 1 : ((a.rate > b.rate) ? -1 : 0)) :
    //         sortedReviews = reviews.sort((a, b) => (b.createdAt > a.createdAt) ? 1 : ((a.createdAt > b.createdAt) ? -1 : 0));

    //     setReviews([...sortedReviews])
    //     console.log("reviews:", reviews);

    // }


    if (!gig.currGig) return <div>Loading</div>
    return (
        <CssVarsProvider>

            <div className='gig-details'>
                <section className="gig-description">
                    <div className="gig-layout">

                        <h1>{gig.currGig.title}</h1>
                        <SellerOverview seller={gig.currGig.owner} />
                        <hr />
                        <div className="carousel-container">
                            <GigImgsCarousel imgList={gig.currGig.imgUrls} />
                        </div>
                        <h2>About this Gig</h2>
                        <p>{gig.currGig.description}</p>
                        <hr />
                        <h2>About the Seller</h2>
                        <SellerInfo seller={gig.currGig.owner} />
                        {!gig.reviews ? <div>0 Reviews</div> :
                            <section className="reviews-container">

                                <div className="flex align-center reviews-title" >

                                    <h2><span>{gig.reviews.length}</span> Reviews </h2>
                                    <ReactStars
                                        value={utilService.averageRating(gig.reviews)}
                                        count={5}
                                        size={24}
                                        color={'#ffd700'}
                                        edit={false}
                                    />
                                    <b>{utilService.averageRating(gig.reviews)}</b>
                                </div>
                                <div>
                                    {/* <ReviewsFilter onChangeSortBy={onChangeSortBy} /> */}
                                </div>
                                <div>
                                    <ReviewList reviews={gig.reviews} />
                                </div>
                            </section>
                        }
                    </div>

                </section>
                <section className="plans">
                    <GigPlans plans={gig.currGig.plans} />
                </section>
            </div>
        </CssVarsProvider>

    )
}