import React from 'react'
import { Tabs, TabsTrigger, TabsList } from '../ui/tabs'

interface Props {
  triggers: string[]
  children: React.ReactNode
  defaultValue: string
}

const TabMenu = ({ triggers, children, defaultValue }: Props) => {
    return (
        <Tabs defaultValue={defaultValue} className='w-full '>
            <TabsList className='flex justify-start bg-transparent '>
                {triggers.map((trigger, index) => (
                    <TabsTrigger className=' data-[state=active]:bg-demonGreen data-[state=active]:text-foreground ' key={index} value={trigger}>{trigger}</TabsTrigger>
                ))}
            </TabsList>
            {children}
        </Tabs>
    )
}

export default TabMenu
