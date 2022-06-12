import { Button, LoadingOverlay, Paper, Select, Table, Text, Title } from '@mantine/core';
import fetchJson from 'lib/fetchJson';
import useAuthApi from 'lib/useAuthApi';
import { createPostData } from 'lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { KeyedMutator } from 'swr';

export default function AdminProjects() {
  const { data, mutate } = useAuthApi('admin-projects');

  if (!data) return <></>;

  return (
    <>
      <Title order={4} mb={20}>
        New Projects
      </Title>
      {data.projects
        .filter((d: any) => d.Mentor == null)
        .map((project: any) => (
          <ProjectCard key={project.id} project={project} mentors={data.mentors} mutate={mutate} />
        ))}

      <Title order={4} mt={50} mb={10}>
        All Projects
      </Title>

      <Table>
        <tbody>
          <tr style={{ fontWeight: 500 }}>
            <td width={30}>#</td>
            <td>Project</td>
          </tr>
          {data.projects.map((project: any, index: number) => (
            <tr key={project.id}>
              <td>{index + 1}</td>
              <td>
                <Link href={`/projects/${project.id}`}>
                  <a style={{ color: 'blue' }}>{project.judul}</a>
                </Link>
                <Text size="sm" color="#789">
                  {project.Unit.nama}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function ProjectCard({
  project,
  mentors,
  mutate,
}: {
  project: any;
  mentors: any[];
  mutate: KeyedMutator<any>;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [mentorId, setMentorId] = useState('');

  async function saveProjectMentor() {
    if (!mentorId) return false;

    setSubmitting(true);
    try {
      await fetchJson(
        '/api/auth/post?sub=save-mentor',
        createPostData({ projectId: project.id, mentorId: mentorId })
      );
      setMentorId('');
      mutate();
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  }

  return (
    <Paper key={project.id} withBorder mb={10}>
      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={submitting} />
        <Table>
          <tbody>
            <tr>
              <td colSpan={3} style={{ fontWeight: 600, backgroundColor: '#f4f4f4' }}>
                {project.judul} {mentorId}
              </td>
            </tr>
            <tr>
              <td width={50}>Unit:</td>
              <td colSpan={2}>
                {project.Unit.kode} - {project.Unit.nama}
              </td>
            </tr>
            <tr>
              <td>Mentor:</td>
              <td colSpan={2}>{project.Mentor ? `${project.Mentor.nama}` : '- Belum ada'}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <Select
                  //
                  data={mentors}
                  clearable
                  value={mentorId}
                  // @ts-ignore
                  onChange={setMentorId}
                />
              </td>
              <td>
                <Button size="xs" onClick={() => saveProjectMentor()}>
                  Save
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Paper>
  );
}
