import { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { SessionProvider } from 'components/SessionProvider/SessionProvider';
import fetchJson from 'lib/fetchJson';
import { OrganizationProvider } from 'components/OrganizationContext/OrganizationContext';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Mantine next example</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.log(err);
          },
        }}
      >
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <SessionProvider>
              <OrganizationProvider>
                <Component {...pageProps} />
              </OrganizationProvider>
            </SessionProvider>
          </NotificationsProvider>
        </MantineProvider>
      </SWRConfig>
    </>
  );
}

// App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
//   colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
// });
