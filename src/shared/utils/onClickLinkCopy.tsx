import { toast } from "@shared/components/ui/use-toast";
import { COPY_CLIP_URL } from "@shared/constants/linkShareContent";

export const onClickLinkCopy = async ({ href }: { href: string }) => {
  try {
    await navigator.clipboard.writeText(href);
    toast({ title: COPY_CLIP_URL.SUCCESS });
  } catch (err) {
    console.error(err);
    toast({ title: COPY_CLIP_URL.FAIL });
  }
};
