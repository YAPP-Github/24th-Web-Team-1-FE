import React from 'react';

import { Button } from '@/components/ui/button';
import useIsMounted from '@/hooks/useIsMounted';

export default function Home() {
  const mouted = useIsMounted();

  return (
    <div>
      <p>home</p>
      <p>home2</p>
      <Button>ㅋㅋ</Button>
    </div>
  );
}
