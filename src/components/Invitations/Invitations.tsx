import { Button, LoadingOverlay, Table, Title } from '@mantine/core';
import { Unit, User } from '@prisma/client';
import FormInvitation from 'components/FormInvitation/FormInvitation';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Navbar/Navbar';
import Pojo from 'components/Pojo/Pojo';
import Show from 'components/Show';
import { SessionUser } from 'lib/session';
import useAuthApi from 'lib/useAuthApi';
import { useState } from 'react';

export default function Invitations({ user }: { user: SessionUser }) {
  const { data, mutate } = useAuthApi('get-invitations');
  const navbar = <Navbar user={user} />;

  const [showForm, setShowForm] = useState(false);

  return (
    <Layout title="Projects" navbar={navbar}>
      <Title order={4} mb={20}>
        {showForm ? 'Form ' : 'Daftar '} Invitasi
      </Title>

      <Show when={!showForm}>
        <Button mb={10} onClick={() => setShowForm(!showForm)}>
          Invite User
        </Button>
      </Show>

      <div style={{ position: 'relative', display: showForm ? 'none' : 'block' }}>
        <LoadingOverlay visible={!data} />
        <Table>
          <tbody>
            <tr style={{ fontWeight: 500 }}>
              <td>Tanggal</td>
              <td>Nama &amp; Jabatan</td>
            </tr>
            {data &&
              data.map((item: any) => (
                <tr
                  key={item.id}
                  style={{ backgroundColor: item.token.length < 5 ? '#f4f4fc' : '' }}
                >
                  <td>{item.created.substring(0, 10)}</td>
                  <td>
                    <span style={{ fontWeight: 600 }}>{item.nama}</span>
                    {` `}
                    <span style={{ color: 'gray' }}>({item.email})</span>
                    <br />
                    {item.jabatan}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <Show when={showForm}>
        <FormInvitation mutate={mutate} onCancel={() => setShowForm(false)} />
      </Show>
      {/* <Pojo obj={data} /> */}
    </Layout>
  );
}
