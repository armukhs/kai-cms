import { Box, Button, Checkbox, Group } from '@mantine/core';
import { useEffect, useState } from 'react';
import { TipeUnit } from '../UnitTerdampak/UnitTerdampak';

import useStyles from './PilihUnitTerdampak.styles';

export default function PilihUnitTerdampak({
  data,
  pilihan,
  setPilihan,
}: {
  data: TipeUnit[];
  pilihan: TipeUnit[];
  setPilihan: (param: any) => void;
}) {
  const { classes } = useStyles();
  const [kodeInduk, setKodeInduk] = useState<string[]>(['...', '..']);
  const [kodeDipilih, setKodeDipilih] = useState('');

  useEffect(() => {
    const array = [];
    for (let unit of data) {
      if (unit.idInduk === null) {
        array.push(unit.kode);
      }
    }
    setKodeInduk(array);
    setKodeDipilih(array[0]);

    return () => {};
  }, []);

  return (
    <Box className={classes.wrapper}>
      {/* Header */}
      <div className={classes.codesWrap}>
        <Group spacing={4}>
          {kodeInduk.map((kode) => (
            <Button
              key={kode}
              color="grape"
              variant={kodeDipilih == kode ? 'filled' : 'default'}
              className={classes.button}
              onClick={() => setKodeDipilih(kode)}
            >
              {kode}
            </Button>
          ))}
        </Group>
      </div>

      {/* Body */}
      <div className={classes.daftarWrapper}>
        <div className={classes.daftarInner}>
          {data
            .filter((unit) => unit.kode.startsWith(kodeDipilih))
            .map((unit) => (
              <Checkbox
                key={unit.kode}
                value={unit.id}
                label={unit.nama}
                width="100%"
                size="xs"
                py={2}
                checked={pilihan.includes(unit)}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setPilihan([...pilihan, unit]);
                  } else {
                    setPilihan(pilihan.filter((u) => u.id != unit.id));
                  }
                }}
                styles={{
                  // @ts-ignore
                  label: { ...classes.checkboxLabel },
                }}
              />
            ))}
        </div>
      </div>
    </Box>
  );
}
