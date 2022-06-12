import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    border: 1,
    borderStyle: 'solid',
    borderColor: '#ced4da',
    borderRadius: 4,
  },

  codesWrap: {
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    paddingRight: 10,
    minHeight: 41,
    borderBottom: '1px solid #ced4da',
  },

  button: {
    width: 28,
    height: 26,
    padding: 0,
    fontSize: '12px',
  },

  daftarWrapper: {
    height: 'auto',
    maxHeight: 168,
    overflowX: 'hidden',
    overflowY: 'scroll',
  },

  daftarInner: {
    padding: '4px 8px',
    width: '100%',
  },

  checkboxLabel: {
    fontSize: 12.5,
    display: 'block',
    cursor: 'pointer',
    marginLeft: -4,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
}));
