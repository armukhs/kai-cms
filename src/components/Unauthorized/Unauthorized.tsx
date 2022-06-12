import { useState, useEffect } from 'react';
import { Center, Container } from '@mantine/core';

export default function Unauthorized() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setMessage('401 - Unathorized');
    }, 1000);
    return () => {};
  }, []);

  return (
    <Container py={32}>
      <Center>{message}</Center>
    </Container>
  );
}
