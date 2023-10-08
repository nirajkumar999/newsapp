import React from 'react'
import _loading from '../_loading.gif'

const Spinner = () => {
    return (
      <div className='text-center'>
        <img src={_loading} alt="loading" />
      </div>
    )
}

export default Spinner
