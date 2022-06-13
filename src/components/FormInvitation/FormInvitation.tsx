import { Button, Checkbox, Paper, Select, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import OrganizationContext from 'components/OrganizationContext/OrganizationContext';
import Pojo from 'components/Pojo/Pojo';
import SessionContext from 'components/SessionProvider/SessionProvider';
import TopUnitSelector from 'components/TopUnitSelector/TopUnitSelector';
import fetchJson, { FetchError } from 'lib/fetchJson';
import { createPostData } from 'lib/utils';
import { useContext, useEffect, useState } from 'react';
import { KeyedMutator } from 'swr';

const protocol = process.env.NODE_ENV === 'production' ? 'https:' : 'http:';

export default function FormInvitation({
  mutate,
  onCancel,
}: {
  mutate: KeyedMutator<any>;
  onCancel: () => void;
}) {
  const { sessionUser } = useContext(SessionContext);
  const { organization } = useContext(OrganizationContext);
  //
  const form = useForm({
    initialValues: {
      fromName: sessionUser?.nama,
      fromEmail: sessionUser?.email,
      nama: '',
      nipp: '',
      email: '',
      jabatan: '',
      jabatanId: '',
      unitId: '',
      roles: '',
      baseUrl: '',
    },
    initialErrors: {
      // nama: 'nama-error',
    },
    validate: {
      nama: (value) => (value.length > 3 ? null : 'Minimal 4 karakter'),
      jabatanId: (value) => (value.length == 0 ? '...' : null),
    },
  });

  function hasEmpty() {
    const v = form.values;
    return (
      v.nama == '' ||
      v.nipp == '' ||
      v.email == '' ||
      v.jabatan == '' ||
      v.jabatanId == '' ||
      v.unitId == ''
    );
  }

  const [submitting, setSubmitting] = useState(false);
  const [kodeInduk, setKodeInduk] = useState('C');
  const [projectRole, setProjectRole] = useState(false);
  const [mentorRole, setmentorRole] = useState(false);
  const [superguest, setSuperguest] = useState(false);

  useEffect(() => {
    form.setFieldValue('baseUrl', protocol + '//' + window.location.host);
    return () => {};
  }, []);

  useEffect(() => {
    form.setFieldValue('unitId', '');
  }, [kodeInduk]);

  useEffect(() => {
    form.setFieldValue('jabatanId', '');
    form.setFieldValue('jabatan', '');
  }, [form.values['unitId']]);

  useEffect(() => {
    if (form.values['jabatanId']) {
      checkJabatan();
      const jbt = organization.jabatans.filter((j) => j.id == form.values['jabatanId'])[0];
      form.setFieldValue('jabatan', jbt.nama);
    } else {
      form.setFieldValue('jabatan', '');
    }
  }, [form.values['jabatanId']]);

  function roleChanged(checked: boolean, role: string) {
    const roles = form.values['roles'].split(' ');
    if (checked) {
      if (!roles.includes(role)) {
        roles.push(role);
        form.setFieldValue('roles', roles.join(' ').trim());
      }
    } else {
      form.setFieldValue(
        'roles',
        roles
          .filter((r) => r != role)
          .join(' ')
          .trim()
      );
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    // const values = form.values
    // values.email = encodeURIComponent(form.values['email'])
    try {
      await fetchJson('/api/auth/post?sub=create-invitation', createPostData(form.values));
      mutate();
      form.reset();
      onCancel();
    } catch (error) {
      console.log(error);
    }
  }

  async function checkNipp() {
    try {
      await fetchJson('/api/get?sub=check-nipp&opt=' + form.values['nipp']);
      form.clearFieldError('nipp');
      // delete form.errors['nipp'];
    } catch (error) {
      const err = error as FetchError;
      form.setFieldError('nipp', err.data.message);
    }
  }

  async function checkJabatan() {
    try {
      await fetchJson('/api/get?sub=check-jabatan&opt=' + form.values['jabatanId']);
      form.clearFieldError('jabatanId');
    } catch (error) {
      const err = error as FetchError;
      form.setFieldError('jabatanId', err.data.message);
    }
  }

  async function checkEmail() {
    try {
      await fetchJson('/api/get?sub=check-email&opt=' + encodeURIComponent(form.values['email']));
      form.clearFieldError('email');
    } catch (error) {
      const err = error as FetchError;
      form.setFieldError('email', err.data.message);
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <div>
        <TextInput
          {...form.getInputProps('nama')}
          label="Nama Lengkap"
          placeholder="Nama Lengkap"
          required
          autoFocus
          styles={{ error: { display: 'none' } }}
          mb={10}
          onBlur={() => form.validateField('nama')}
        />
        <TextInput
          {...form.getInputProps('nipp')}
          label="NIPP"
          placeholder="NIPP"
          required
          mb={10}
          onChange={(event) => {
            form.setFieldValue('nipp', event.currentTarget.value);
          }}
          onBlur={checkNipp}
          styles={{ error: { fontSize: 12 } }}
        />
        <TextInput
          {...form.getInputProps('email')}
          label="Email"
          placeholder="Email"
          required
          mb={10}
          onBlur={checkEmail}
          styles={{ error: { fontSize: 12 } }}
        />

        <Text size="sm" mb={4} weight={500}>
          Pilih Jabatan:
        </Text>

        <Paper withBorder sx={{ borderColor: '#d4d4d4' }}>
          <div style={{ padding: 7, borderBottom: '1px solid #d4d4d4' }}>
            <TopUnitSelector
              parents={organization.parents}
              selected={kodeInduk}
              callback={setKodeInduk}
              effect={() => {}}
            />
          </div>
          <div style={{ padding: 7, borderBottom: '1px solid #d4d4d4' }}>
            <div style={{ fontSize: 13 }}>Pilih Unit Organisasi</div>
            <Select
              {...form.getInputProps('unitId')}
              data={
                organization.units
                  ? organization.units.filter((u) => u.kode.startsWith(kodeInduk))
                  : []
              }
            />
          </div>
          <div style={{ padding: 7, borderBottom: '1px solid #d4d4d4' }}>
            <div style={{ fontSize: 13 }}>Pilih Jabatan</div>
            <Select
              {...form.getInputProps('jabatanId')}
              data={
                organization.jabatans
                  ? organization.jabatans.filter((j) => j.unitId == form.values['unitId'])
                  : []
              }
              styles={{ error: { fontSize: 12 } }}
            />
          </div>
        </Paper>

        <Checkbox
          mt={15}
          label="Dapat membuat project"
          checked={projectRole}
          onChange={(event) => {
            setProjectRole(event.currentTarget.checked);
            roleChanged(event.currentTarget.checked, 'project');
          }}
        />
        <Checkbox
          mt={5}
          label="Dapat menjadi mentor/pengawas"
          checked={mentorRole}
          onChange={(event) => {
            setmentorRole(event.currentTarget.checked);
            roleChanged(event.currentTarget.checked, 'mentor');
          }}
        />
        <Checkbox
          mt={5}
          label="Superguest"
          checked={superguest}
          onChange={(event) => {
            setSuperguest(event.currentTarget.checked);
            roleChanged(event.currentTarget.checked, 'superguest');
          }}
        />
        <Button
          size="xs"
          variant="outline"
          color="dark"
          mt={10}
          disabled={Object.keys(form.errors).length > 0 || hasEmpty()}
          onClick={() => handleSubmit()}
        >
          Send Invitation
        </Button>
        <Button size="xs" variant="outline" color="dark" mt={10} ml={10} onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
