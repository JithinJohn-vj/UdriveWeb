/* eslint-disable perfectionist/sort-imports */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Toaster } from 'sonner';
// ----------------------------------------------------------------------

export default function App() {
  const queryClient = new QueryClient();

  useScrollToTop();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster richColors position="top-right" />
          <Router />
        </QueryClientProvider>
      </ThemeProvider>
    </LocalizationProvider>
  );
}
