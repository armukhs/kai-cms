import { Button, LoadingOverlay, Table, Text, Title } from '@mantine/core';
import ActivateUser from 'components/ActivateUser/ActivateUser';
import DeleteteUser from 'components/DeleteteUser/DeleteUser';
import Layout from 'components/Layout/Layout';
import Navbar from 'components/Navbar/Navbar';
import { SessionUser } from 'lib/session';
import useAuthApi from 'lib/useAuthApi';
import { useState } from 'react';

export default function Users({ user }: { user: SessionUser }) {
  const { data, mutate } = useAuthApi('get-users');
  const navbar = <Navbar user={user} />;

  const [tobeActivated, setTobeActivated] = useState<any>(null);
  const [tobeDeleted, setTobeDeleted] = useState<any>(null);

  return (
    <Layout title="Projects" navbar={navbar}>
      <Title order={4} mb={20}>
        Daftar User
      </Title>

      <ActivateUser user={tobeActivated} setUser={setTobeActivated} mutate={mutate} />
      <DeleteteUser user={tobeDeleted} setUser={setTobeDeleted} mutate={mutate} />

      <div style={{ position: 'relative' }}>
        <LoadingOverlay visible={!data} />
        <Table>
          <tbody>
            <tr>
              <td>
                <strong>Nama</strong>
              </td>
              <td>
                <strong>Jabatan</strong>
              </td>
              <td></td>
            </tr>
            {data &&
              data.map((item: any) => (
                <tr key={item.id} style={{ color: item.deleted ? '#abc' : '' }}>
                  <td>{item.nama}</td>
                  <td>
                    {item.Jabatan.kode}
                    {' - '}
                    {item.Jabatan.nama}
                  </td>
                  <td width={50} align="right">
                    {item.deleted && (
                      <Button
                        size="xs"
                        variant="outline"
                        color="gray"
                        onClick={() => setTobeActivated(item)}
                      >
                        Activate
                      </Button>
                    )}
                    {!item.deleted && (
                      <Button size="xs" color="red" onClick={() => setTobeDeleted(item)}>
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {/* <Pojo obj={data} /> */}
    </Layout>
  );
}
