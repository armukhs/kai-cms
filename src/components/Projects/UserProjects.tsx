import { Box, Button, Paper, Table, Title } from '@mantine/core';
import FormProject from 'components/FormProject/FormProject';
import Show from 'components/Show';
import { SessionUser } from 'lib/session';
import useAuthApi from 'lib/useAuthApi';
import Link from 'next/link';
import { useState } from 'react';

export default function UserProjects({ user }: { user: SessionUser }) {
  const { data, mutate } = useAuthApi('get-my-projects');
  const [showForm, setShowForm] = useState(false);

  if (!data) return <></>;

  function myProjects() {
    return data.filter((p: any) => p.managerId == user?.id || p.staffId == user?.id);
  }

  function myAssignments() {
    return data.filter((p: any) => p.mentorId == user?.id);
  }

  const isProjectUser = user?.roles.includes('project');
  const isMentorUser = user?.roles.includes('mentor');

  return (
    <>
      <Show when={showForm}>
        <FormProject user={user} onCancel={() => setShowForm(false)} />
      </Show>

      <Show when={!showForm && isProjectUser == true}>
        <Box mb={40}>
          <Title order={4} mb={20}>
            My Projects
          </Title>
          <Box>
            {myProjects().map((project: any) => (
              <div style={{ marginBottom: 10, fontSize: 14 }}>
                <Link href={`/projects/${project.id}`}>
                  <a style={{ color: 'blue' }}>{project.judul}</a>
                </Link>
              </div>
            ))}
            {myProjects().length == 0 && <div>Anda belum memiliki project</div>}
          </Box>

          <Show when={user?.roles.includes('project') || false}>
            <Button mt={20} onClick={() => setShowForm(true)}>
              New Project
            </Button>
          </Show>
        </Box>
      </Show>

      <Show when={(!showForm && user?.roles.includes('mentor')) || false}>
        <Title order={4} mb={20}>
          My Assignments
        </Title>
        <div>
          {myAssignments().map((project: any) => (
            <div style={{ marginBottom: 10, fontSize: 14 }}>
              <Link href={`/projects/${project.id}`}>
                <a style={{ color: 'blue' }}>{project.judul}</a>
              </Link>
            </div>
          ))}
          {myAssignments().length == 0 && <div>Anda tidak memiliki assignment</div>}
        </div>
      </Show>
    </>
  );
}
