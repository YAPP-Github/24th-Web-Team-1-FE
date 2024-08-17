import { ImageModel } from "@shared/models/ImageModel";
import { useEffect, useState } from "react";

export default function useIsWebpBrowser() {
  const imageModel = new ImageModel();

  const [isWebpBrowser, setIsWebpBrowser] = useState(false);

  useEffect(function checkIsLogin() {
    (async () => {
      await imageModel.checkWebpSupport();
      if (imageModel.webpBrowser) setIsWebpBrowser(true);
    })();
  }, []);

  return { isWebpBrowser };
}
