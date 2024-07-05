import React from 'react'
import loading from '../images/loading.gif'

const Spinner = () => {
  return (
    <div className='text-center'>
      <img src={loading} style={{
        height: 100,
        width: 100
      }} alt='Loading...' />
    </div>
  )
}

export default Spinner