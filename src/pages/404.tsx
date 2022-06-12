import { useState, useEffect } from 'react';
import { Center, Container } from '@mantine/core';

export default function NotFound() {
  return (
    <Container py={32}>
      <Center>404 = Page Not Found</Center>
    </Container>
  );
}
