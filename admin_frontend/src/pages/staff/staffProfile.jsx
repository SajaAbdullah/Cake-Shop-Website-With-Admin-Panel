import React from 'react'
import {useParams} from 'react-router-dom';

function staffProfile() {
    const { id } = useParams()
    return (
      <div>
        <h1>this edit page</h1>
        {id}
      </div>
    )
}

export default staffProfile