import { Button, LoadingOverlay, Modal, Text } from '@mantine/core';
import fetchJson from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useState } from 'react';
import { KeyedMutator } from 'swr';

export default function DeleteteUser({
  user,
  setUser,
  mutate,
}: {
  user: any;
  setUser: (param: any) => void;
  mutate: KeyedMutator<any>;
}) {
  const [submitting, setSubmitting] = useState(false);

  async function handleDelete() {
    setSubmitting(true);
    try {
      await fetchJson('/api/auth/post?sub=delete-user', createPostData({ id: user?.id }));
      mutate();
    } catch (error) {
      console.log(error);
    }
    setUser(null);
    setSubmitting(false);
  }

  return (
    <Modal
      opened={user}
      withCloseButton={false}
      onClose={() => setUser(null)}
      styles={{
        header: {
          backgroundColor: 'yellow',
          marginTop: -5,
          fontSize: 12,
        },
      }}
    >
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={submitting} />
        <Text size="sm" mt={-5} weight={400}>
          Delete User:
        </Text>
        <Text size="sm" mt={10} mb={20} weight={600}>
          {user?.nama}
        </Text>
        <div>
          <Button size="xs" color="red" onClick={() => handleDelete()}>
            Delete
          </Button>
          <Button size="xs" ml={10} variant="outline" color="red" onClick={() => setUser(null)}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
}
