import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  wrapper: {
    paddingLeft: 24,
    paddingRight: 24,

    '@media (min-width: 640px)': {
      paddingLeft: 50,
      paddingRight: 50,
    },
  },
}));
