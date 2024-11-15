import React from 'react'

interface Props {
  videoId: string;
  title: string;
  description: string;
}

const EditVideo = ({ videoId, title, description }: Props) => {
    return (
        <div>
            Edit
        </div>
    )
}

export default EditVideo
