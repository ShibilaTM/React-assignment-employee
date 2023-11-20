import React from 'react'
import Navbar from '../Elements/Navbar'

const Main = (props) => {
  return (
    <div>
      <Navbar/>
      {props.child}
    </div>
  )
}

export default Main