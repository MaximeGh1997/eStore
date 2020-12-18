import React from "react"
import ContentLoader from "react-content-loader"

/** <circle cx="175" cy="158" r="116" /> 
            <path d="M 9.2 295.7 H 137 v 17 H 9.2 z" /> 
            <path d="M 9.2 327.8 h 333.3 v 3.7 H 9.2 z" /> 
            <path d="M 9.2 372.9 h 17.6 v 10.6 H 9.2 z" /> 
            <path d="M 9.2 336.3 h 317.5 v 3.7 H 9.2 z" /> 
            <path d="M 9.2 344.8 h 258.2 v 3.7 H 9.2 z" /> 
            <path d="M 9.2 352.9 h 180.6 v 3.7 H 9.2 z" /> **/

const CardLoader = (props) => (
    <div className="col-md-6 col-lg-4 mb-5 justify-content-center">
        <ContentLoader 
            speed={1}
            viewBox="0 0 350 450"
            backgroundColor="#505050"
            foregroundColor="#565656"
            {...props}
        >
            <rect x="0" y="300" rx="5" ry="5" width="200" height="30" /> 
            <rect x="0" y="350" rx="5" ry="5" width="300" height="10" /> 
            <rect x="0" y="370" rx="5" ry="5" width="280" height="10" /> 
            <rect x="0" y="390" rx="5" ry="5" width="200" height="10" /> 
            <circle cx="154" cy="132" r="131" /> 
            <rect x="0" y="421" rx="3" ry="3" width="30" height="20" />
        </ContentLoader>
    </div>
)

export default CardLoader