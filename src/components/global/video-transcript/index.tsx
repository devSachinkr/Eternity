import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

interface Props {
    transcript: string
}

const VideoTranscript = ({ transcript }: Props) => {
    return (
        <TabsContent value="Transcript" >
            <div className='p-5 bg-[#1D1D1D] rounded-xl flex flex-col gap-y-6'>
            <p className='text-[#a7a7a7]'>{transcript}</p>
            </div>
        </TabsContent>
    )
}

export default VideoTranscript
