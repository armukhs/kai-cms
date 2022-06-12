import useApi from 'lib/useApi';
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';

interface IOrganization {
  units: any[];
  parents: any[];
  jabatans: any[];
}

interface IOrganizationContext {
  organization: IOrganization;
  setOrganization: Dispatch<SetStateAction<IOrganization>>;
  getJabatan: (id: string) => any;
}

const defaultValue: IOrganizationContext = {
  organization: {
    units: [
      {
        // sample unit
        id: 'cl1uzwby501ho3b650uik9zth',
        parentId: null,
        kode: 'C',
        nama: 'Direktorat Niaga',
        value: 'cl1uzwby501ho3b650uik9zth',
        label: 'C - Direktorat Niaga',
      },
    ],
    parents: [
      {
        // sample
        id: 'cl1uzwby501ho3b650uik9zth',
        parentId: null,
        kode: 'C',
        nama: 'Direktorat Niaga',
      },
    ],
    jabatans: [
      {
        // sample
        id: 'cl1v199c405f13b60vftlldh1',
        unitId: 'cl1uzwby501ho3b650uik9zth',
        kode: 'C01',
        nama: 'Direktur Niaga',
        value: 'cl1v199c405f13b60vftlldh1',
        label: 'C01 - Direktur Niaga',
      },
    ],
  },
  setOrganization: () => undefined,
  getJabatan: (id: string) => undefined,
};

const OrganizationContext = createContext<IOrganizationContext>(defaultValue);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { data } = useApi('organization');
  const [organization, setOrganization] = useState(defaultValue.organization);

  useEffect(() => {
    if (data) setOrganization(data);
  }, [data]);

  const getJabatan = (id: string) => {
    const filtered: any[] = organization.jabatans.filter((j: any) => j.id == id);
    if (filtered.length > 0) {
      return filtered[0];
    }
    return null;
  };

  return (
    <OrganizationContext.Provider value={{ organization, setOrganization, getJabatan }}>
      {children}
    </OrganizationContext.Provider>
  );
}

export default OrganizationContext;
