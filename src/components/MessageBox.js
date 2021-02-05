import React from 'react'

export default function MessageBox(props) {
    return (
        //value based on props.variant. if props.variant exists use 
        //it otherwise use 'info'(defualt variant). Props.children
        //is used to access children of MessageBox
        <div className={`alert alert-${props.variant || 'info'}`}>{props.children}</div>
    )
}
