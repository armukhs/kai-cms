import useSWR from 'swr';

export default function useApi(sub: string, opt?: string) {
  const basePath = `/api/get?sub=${sub}`;
  const path = opt ? `${basePath}&opt=${opt}` : basePath;
  // console.log('API', path);

  const { data, error, mutate } = useSWR(path);

  const isLoading = !data && !error;
  return { data, isLoading, error, mutate };
}
