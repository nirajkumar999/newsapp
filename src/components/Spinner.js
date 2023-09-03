import React, { Component } from 'react'
import _loading from '../_loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={_loading} alt="loading" />
      </div>
    )
  }
}

export default Spinner
