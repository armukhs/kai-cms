import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },

  daftarWrapper: {
    // display: 'flex',
    alignItems: 'center',
    minHeight: 34,
    paddingTop: 4,
    paddingBottom: 8,
    // backgroundColor: theme.colors.yellow[2],
  },

  empty: {
    textAlign: 'center',
    padding: '10px 0',
  },

  kode: {
    width: 45,
    flexShrink: 0,
    fontSize: 11,
    fontWeight: 700,
    backgroundColor: theme.colors.orange[5],
    padding: '0 3px',
    textAlign: 'center',
    color: 'white',
    paddingTop: 0,
    paddingBottom: 1,
    borderRadius: 3,
  },

  label: {
    flexGrow: 1,
    fontSize: 13,
    fontWeight: 400,
    paddingLeft: 5,
    paddingRight: 5,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  button: {
    padding: 0,
    height: 20,
  },
}));
