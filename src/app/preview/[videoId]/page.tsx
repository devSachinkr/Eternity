import { getUserProfile, getVideoComments} from "@/actions/user";
import { getPreviewVideo } from "@/actions/video";
import PreviewVideo from "@/components/global/videos/preview-video";
import { queryClient } from "@/lib/react-query";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

interface Props {
  params: Promise<{
    videoId: string;
  }>;
}

const page = async ({ params }: Props) => {
  const { videoId } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["preview-video"],
    queryFn: () => getPreviewVideo({ videoId }),
  });
  await queryClient.prefetchQuery({
    queryKey: ["user-profile"],
    queryFn: () => getUserProfile(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["video-comments"],
    queryFn: () => getVideoComments(videoId),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PreviewVideo videoId={videoId} />
    </HydrationBoundary>
  );
};

export default page;
