'use client';

import { ButtonText } from '@/shared/ui/ButtonText/ButtonText';
import { useCallback, useState, MouseEvent } from 'react';

export const NotificationSubscribeButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const handleToggleSub = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setIsSubscribed((s) => !s);
    },
    []
  );
  return (
    <ButtonText onClick={handleToggleSub}>
      {isSubscribed ? 'Подписан' : 'Подписаться'}
    </ButtonText>
  );
};
