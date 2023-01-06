import React from 'react'

interface ISupplierProfileProps {
  id: number | string | null
}


const JetSupplierProfile: React.FC<ISupplierProfileProps> = ({id}) => {
  return (
    <div>JetSupplierProfile</div>
  )
}

export default JetSupplierProfile;