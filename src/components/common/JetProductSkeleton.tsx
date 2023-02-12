import React from 'react'
import { Skeleton, Stack } from '@mui/material'


const JetProductSkeleton: React.FC<{}> = () => {
  return (
    <>
        <Stack spacing={1}>
            <Skeleton variant="rounded" width={210} height={160} />
            <Skeleton variant="rounded" width={210} height={20} />
            <Skeleton variant="rounded" width={100} height={20} />
            <Skeleton variant="rounded" width={210} height={20} />
        </Stack>
    </>
  )
}

export default JetProductSkeleton;