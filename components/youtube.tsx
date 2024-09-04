import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface YoutubeProps {
  ids?: string[];
}

const YoutubeComp = ({ ids }: YoutubeProps) => {
  const [itemHeight, setItemHeight] = useState<number | null>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (firstItemRef.current) {
      setItemHeight(firstItemRef.current.clientHeight);
    }
  }, [ids]);

  return (
    <div className="mx-6 my-10">
      <Carousel className="w-full" orientation="vertical">
        <CarouselContent
          className="w-full"
          style={{ height: itemHeight || "auto" }}
        >
          {ids?.map((id, index) => (
            <CarouselItem
              key={index}
              ref={index === 0 ? firstItemRef : null}
              className="md:basis-1/2 h-fit"
            >
              <div className="p-2">
                <Card>
                  <CardContent className="flex aspect-video items-center justify-center p-1">
                    <iframe
                      className="w-full aspect-video"
                      src={`https://www.youtube.com/embed/${id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <p className="text-sm text-muted-foreground/70 flex items-center gap-1 ml-5">
        {ids && ids?.length > 0
          ? "Note : YouTube videos tutorial might not match project content"
          : "No YouTube videos available"}
      </p>
    </div>
  );
};

export default YoutubeComp;
