import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    paddingTop: 24,
    paddingBottom: 22,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    borderBottom: '1px dotted #aae',

    '@media (min-width: 640px)': {
      paddingTop: 36,
      // paddingBottom: 32,
    },

    '@media (min-width: 800px)': {
      // paddingBottom: 40,
    },
  },

  inner: {
    display: 'flex',
    alignItems: 'start',
    margin: 0,
    flexGrow: 0,
  },

  right: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    margin: 0,
    flexGrow: 1,
  },
}));
