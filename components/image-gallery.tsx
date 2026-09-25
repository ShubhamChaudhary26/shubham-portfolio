import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@heroui/react";

interface ImageGalleryProps {
  images: readonly string[];
  title: string;
  fit?: "contain" | "cover";
}

const ImageGallery = memo(({ images, title, fit = "cover" }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fitClass = fit === "contain" ? "object-contain" : "object-cover";

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setImageLoaded(false);
  };

  return (
    <div className="mb-6 flex w-full flex-col items-center gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[activeIndex]}
          animate={{ opacity: 1 }}
          className="h-64 w-full max-w-xl overflow-hidden rounded-xl bg-content2/60 md:h-80"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Skeleton className="h-full w-full rounded-lg" isLoaded={imageLoaded}>
            <img
              alt={`${title} image ${activeIndex + 1}`}
              className={`h-full w-full ${fitClass}`}
              height={640}
              loading="lazy"
              src={images[activeIndex]}
              width={1024}
              onLoad={() => setImageLoaded(true)}
            />
          </Skeleton>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-3">
        {images.map((img, index) => (
          <button
            key={img}
            className={`h-16 w-16 overflow-hidden rounded-lg border-2 bg-content2/60 md:h-20 md:w-20 ${
              index === activeIndex ? "border-primary" : "border-transparent"
            }`}
            type="button"
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              alt={`${title} thumbnail ${index + 1}`}
              className={`h-full w-full ${fitClass}`}
              height={160}
              loading="lazy"
              src={img}
              width={160}
            />
          </button>
        ))}
      </div>
    </div>
  );
});

export default ImageGallery;

ImageGallery.displayName = "ImageGallery";
