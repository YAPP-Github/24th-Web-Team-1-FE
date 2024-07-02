'use client';

import React, { useEffect,useState } from 'react';

import SubscribePopup from 'src/shared/components/ExternalControlOpenDialog';

import SubscribeForm from '@subscription/components/SubscribeForm';
import { SUBSCRIBE_TITLES } from '@subscription/constants/subscribe';

const SUBSCRIBE_POPUP_TITLE = (
  <div className="h3-bold text-lg text-black">
    <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_1}</div>
    <div>{SUBSCRIBE_TITLES.SUBSCRIBE_TITLE_2}</div>
  </div>
);

export function ClientSubscribePopup() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <SubscribePopup
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={SUBSCRIBE_POPUP_TITLE}
          content={<SubscribeForm setIsOpen={setIsOpen} />}
        />
      )}
    </>
  );
}
