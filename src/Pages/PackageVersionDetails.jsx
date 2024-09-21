import React from 'react'
import { useParams } from 'react-router-dom'

function PackageVersionDetails() {
    const {packageName, version} = useParams()
    
  return (
    <div>PackageVersionDetails</div>
  )
}

export default PackageVersionDetails