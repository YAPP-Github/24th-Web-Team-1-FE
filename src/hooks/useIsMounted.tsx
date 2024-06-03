import { useEffect, useState } from "react";

const useIsMounted = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(function setMouteState() {
    setMounted(true);
  }, []);

  return mounted;
};

export default useIsMounted;
