import React from 'react'
import './LoadMoreBtn.css'


const LoadMoreBtn = (props) => {
    return (
        <div className="rmdb-loadmorebtn" onClick={props.onClick}>
            <p className="btntxt">{props.text}</p>
        </div>
    )
}

export default LoadMoreBtn;