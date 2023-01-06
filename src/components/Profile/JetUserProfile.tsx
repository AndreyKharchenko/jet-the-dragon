import React, { useEffect } from 'react'

interface IUserProfileProps {
    id: number | string | null
}

const JetUserProfile: React.FC<IUserProfileProps> = ({id}) => {
    return (
        <div>JetUserProfile {id}</div>
    )
}

export default JetUserProfile