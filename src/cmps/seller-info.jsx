import ReactStars from 'react-stars'
import { utilService } from '../services/util.service'



export const SellerInfo = ({ seller, reviews }) => {

    const averageRate = utilService.averageRating(reviews)



    return (
        <div className='seller-info'>
            <div className="seller-img">
                <img src={seller.imgUrl}></img>
            </div>
            <div className="seller-details">
                <a href={`/profile/${seller._id}`}>{seller.fullname}</a>
                <div className='flex align-center'>
                    <ReactStars
                        value={averageRate}
                        count={5}
                        size={22}
                        color2={'#FFB33E'}
                        edit={false}
                    />
                    <span>{`(${reviews.length})`}</span></div>
                <button>Contact Me</button>
            </div>
        </div>
    )
}