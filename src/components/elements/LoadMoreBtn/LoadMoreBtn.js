import React from 'react'
import './LoadMoreBtn.css'


const LoadMoreBtn = (props) => {
    return (
        <div className="rmdb-loadmorebtn" onClick={props.onClick}>
            {props.text}
        </div>
    )
}

export default LoadMoreBtn;