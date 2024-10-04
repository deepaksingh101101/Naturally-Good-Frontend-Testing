import MainLayout from '@/components/layout/main-layout';
import Providers from '@/components/layout/providers';
import { AppProps } from 'next/app';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Loader from '@/components/loader/Loader';

function MyApp({ Component, pageProps }: AppProps) {
  const { loading } = useSelector((state: RootState) => state.auth);

  return (

    <Providers>
     {loading && <Loader/>}
     {!loading && <MainLayout meta={{ title: 'Admin' }}>
        <Component {...pageProps} />
      </MainLayout>}

    </Providers>
  );
}

export default MyApp;
