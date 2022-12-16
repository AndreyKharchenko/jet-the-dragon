import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const JetProduct = () => {
  const params = useParams();

  useEffect(() => {
    console.log('params', params.id);
  }, [])
  
  return (
    <div>JetProduct {params.id}</div>
  )
}

export default JetProduct