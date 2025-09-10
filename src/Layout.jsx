import { useLoader } from '.context/LoaderContext.jsx';
import BookLoader from './components/book-loader.jsx';
import { Outlet } from 'react-router-dom'; // if using React Router

function Layout() {
  const { loading } = useLoader();

  return (
    <>
      {loading && <BookLoader />}
      <Outlet /> {/* or your page content */}
    </>
  );
}

export default Layout;
