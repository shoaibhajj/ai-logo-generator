import { Button } from "../ui/button";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogClose,
  MorphingDialogImage,
  MorphingDialogContainer,
} from "./morphing-dialog";
import { XIcon } from "lucide-react";

export function MorphingDialogBasicImage({
  imageUrl,
  alt,
  width,
  height,
}: {
  imageUrl: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <MorphingDialog
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <MorphingDialogTrigger>
        <MorphingDialogImage
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          className="max-w-xs rounded-[4px]"
        />
      </MorphingDialogTrigger>
      <MorphingDialogContainer>
        <MorphingDialogContent className="relative">
          <MorphingDialogImage
            src={imageUrl}
            alt={alt}
            width={width}
            height={height}
            className="h-auto w-full max-w-[90vw] rounded-[4px] object-cover lg:h-[90vh]"
          />
        </MorphingDialogContent>
        <MorphingDialogClose
          className="fixed right-6 top-6 h-fit w-fit rounded-full bg-white p-1"
          variants={{
            initial: { opacity: 0 },
            animate: {
              opacity: 1,
              transition: { delay: 0.3, duration: 0.1 },
            },
            exit: { opacity: 0, transition: { duration: 0 } },
          }}
        >
          <XIcon className="h-5 w-5 text-zinc-500" />
        </MorphingDialogClose>
        <a
          href={`${imageUrl.replace(/\/upload\//, "/upload/fl_attachment/")}`}
          download={alt || "image.jpg"}
          className=" fixed mx-auto bottom-8 md:bottom-0 "
        >
          <Button className="w-full">Download</Button>
        </a>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
