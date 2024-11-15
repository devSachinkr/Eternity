import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';
import React from 'react'
import ToastNotify from '../toast';

interface Props {
    videoId: string;
    className?: string;
    variant?: "default" | "destructive"|"outline"|"ghost"|"link"|"secondary";
}

const CopyLink = ({ videoId, className, variant }: Props) => {
    return (
        <Button variant={variant} className={className}
        onClick={() => {
            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_URL}/preview/${videoId}`);
            ToastNotify({
                title: "Success",
                msg: "Copied to clipboard",
            });
          
        }}
        >
            <Link size={20} className='text-[#a4a4a4]'/>
        </Button>
    )
}

export default CopyLink
