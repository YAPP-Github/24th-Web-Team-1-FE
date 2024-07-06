import { Metadata } from "next";

export const createMetadata = ({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl?: string;
}): Metadata => {
  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 800,
              height: 600,
              alt: "Image",
            },
          ]
        : [],
    },
    twitter: {
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
  return metadata;
};
