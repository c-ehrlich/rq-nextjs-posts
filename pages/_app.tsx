import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';
import getQueryClient from '../utils/queryClient';

function MyApp({ Component, pageProps }: AppProps) {
  console.log("creating new query client");
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
