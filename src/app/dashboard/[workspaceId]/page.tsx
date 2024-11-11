import React from 'react'

interface Props {
 params:{
    workspaceId:string
 }    
}

const page = ({params:{workspaceId}}: Props) => {
    return (
        <div>
             page
        </div>
    )
}

export default page
