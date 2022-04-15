import { QueryClient } from 'react-query';

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var queryClient: QueryClient | undefined;
}

function getQueryClient() {
  const queryClient = global.queryClient || new QueryClient();

  if (process.env.NODE_ENV !== 'production') global.queryClient = queryClient;

  return queryClient;
}

export default getQueryClient;
