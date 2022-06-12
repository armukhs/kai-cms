import useSWR from 'swr';

export default function useAuthApi(sub: string, opt?: string | string[]) {
  const basePath = `/api/auth/get?sub=${sub}`;
  let path = opt ? `${basePath}&opt=${opt}` : basePath;
  if (Array.isArray(opt)) {
    let options = '';
    opt.forEach((o) => {
      options += `&opt=${o}`;
    });
    path = basePath + options;
  }
  // console.log('API', path);

  const { data, error, mutate } = useSWR(path);

  const isLoading = !data && !error;
  return { data, isLoading, error, mutate };
}
