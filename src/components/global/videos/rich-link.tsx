import { Button } from "@/components/ui/button";
import React from "react";
import ToastNotify from "../toast";

interface Props {
  id: string;
  description: string;
  source: string;
  title: string;
}

const RichLink = ({ id, description, source, title }: Props) => {
  const copyRichText = () => {
    const originalTitle = title;
    const thumbnail = `<a style="display: flex; flex-direction: column; gap: 10px" href="${process.env.NEXT_PUBLIC_HOST_URL}/preview/${id}">
    <h3 style="text-decoration: none; color: black; margin: 0;">${originalTitle}</h3>
    <p style="text-decoration: none; color: black; margin: 0;">${description}</p>
    <video
        width="320"
        style="display: block"
        >
            <source
                type="video/webm"
                src="${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${source}"
            />
        </video>
    </a>`;
    const thumbnailBlob = new Blob([thumbnail], { type: "text/html" });
    const blobTitle = new Blob([originalTitle], { type: "text/plain" });
    const data = [
      new ClipboardItem({
        ["text/html"]: thumbnailBlob,
        ["text/plain"]: blobTitle,
      }),
    ];
    navigator.clipboard.write(data).then(() => {
      return ToastNotify({
        msg: "Copied to clipboard",
        title: "Success",
      });
    });
  };
  return (
    <Button
      onClick={copyRichText}
      className="rounded-full bg-demonGreen px-10   text-white font-semibold hover:bg-demonGreen/60 transition-all duration-300"
    >
      Get Embed Code
    </Button>
  );
};

export default RichLink;
