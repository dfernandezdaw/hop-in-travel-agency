import React from 'react'
import { useParams } from 'react-router-dom'

const TourData = () => {
  const id = useParams().id
  return <div>TourData {id}</div>
}

export default TourData
