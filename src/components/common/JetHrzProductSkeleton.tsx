import React from 'react'
import { Card, CardHeader, Skeleton } from '@mui/material'


const JetHrzProductSkeleton: React.FC<{}> = () => {
  return (
    <>
        <Card sx={{ maxWidth: 445, height: 120, m: 2 }}>
            <CardHeader
                avatar={ <Skeleton animation="wave" variant="circular" width={40} height={40} /> }
                title={
                    <Skeleton
                    animation="wave"
                    height={30}
                    width="80%"
                    style={{ marginBottom: 6 }}
                    />
                }
                subheader={ <Skeleton animation="wave" height={30} width="40%" /> }
            />
        </Card>
    </>
  )
}

export default JetHrzProductSkeleton