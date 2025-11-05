import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import AuthGuard from './components/Auth/AuthGuard'
import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const routes = [

  {
    exact: 'true',
    path: 'Login',
    element: lazy(() => import('./views/login'))
  },
  {
    exact: 'true',
    path: 'Signup',
    element: lazy(() => import('./views/signup'))
  },
  
  {
    path: '*',
    layout: AdminLayout,
    routes: [
      {
        exact: 'true',
        path: '/series/:Series_code',
        element: lazy(() => import('./views/SeriesDetail'))
      },
      {
        exact: 'true',
        path: 'forgetpassword',
        element: lazy(() => import('./views/forgotpassword'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: 'SearchSeries/:Member_id',
        element: lazy(() => import('./views/SearchSeries'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: '/review/:Series_code/:Member_id',
        element: lazy(() => import('./views/review'))
      },
       {
        exact: 'true',
        path: 'VerifyOTP',
        element: lazy(() => import('./views/forgotpassword/VerifyOTP'))
      },
      {
        exact: 'true',
        path: 'ResetPassword',
        element: lazy(() => import('./views/forgotpassword/ResetPassword'))
      },
      {
        exact: 'true',
        path: 'conditions',
        element: lazy(() => import('./views/conditions'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: '/profile/:Member_id',
        element: lazy(() => import('./views/profile'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: '/editprofile/:Member_id',
        element: lazy(() => import('./views/profile/EditProfile'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: '/seriesm/:Series_code/:Member_id',
        element: lazy(() => import('./views/SeriesDetailM'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: '/edit-review/:Series_code/:Member_id/:Review_code',
        element: lazy(() => import('./views/review/EditReview'))
      },
      {
        exact: 'true',
        path: 'home',
        element: lazy(() => import('./views/home'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: '/SearchPopular/:Member_id',
        element: lazy(() => import('./views/SearchSeries/Popular'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: '/SearchRomantic/:Member_id',
        element: lazy(() => import('./views/SearchSeries/Romantic'))
      },
       {
        guard: AuthGuard,
        exact: 'true',
        path: '/SearchDrama/:Member_id',
        element: lazy(() => import('./views/SearchSeries/Drama'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: '/SearchThriller/:Member_id',
        element: lazy(() => import('./views/SearchSeries/Thriller'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: '/SearchAction/:Member_id',
        element: lazy(() => import('./views/SearchSeries/Action'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: '/HomeMember/:Member_id',
        element: lazy(() => import('./views/homem'))
      },
      {
        guard: AuthGuard,
        exact: 'true',
        path: 'swiper',
        element: lazy(() => import('./views/swiper'))
      },
        {
        guard: AuthGuard,
        exact: 'true',
        path: 'navbarm/:Member_id',
        element: lazy(() => import('./views/navber/navbarm'))
      },
        {
        guard: AuthGuard,
        exact: 'true',
        path: 'footer',
        element: lazy(() => import('./views/footer'))
      },
      
      {
        guard: AuthGuard,
        exact: 'true',
        path: 'swiperm/:Member_id',
        element: lazy(() => import('./views/swiperm'))
      },

      {
        exact: 'true',
        path: '/app/dashboard/default',
        element: lazy(() => import('./views/dashboard'))
      },
      {
        exact: 'true',
        path: '/basic/button',
        element: lazy(() => import('./views/ui-elements/basic/BasicButton'))
      },
      {
        exact: 'true',
        path: '/basic/badges',
        element: lazy(() => import('./views/ui-elements/basic/BasicBadges'))
      },
      {
        exact: 'true',
        path: '/basic/breadcrumb-paging',
        element: lazy(() => import('./views/ui-elements/basic/BasicBreadcrumb'))
      },
      {
        exact: 'true',
        path: '/basic/collapse',
        element: lazy(() => import('./views/ui-elements/basic/BasicCollapse'))
      },
      {
        exact: 'true',
        path: '/basic/tabs-pills',
        element: lazy(() => import('./views/ui-elements/basic/BasicTabsPills'))
      },
      {
        exact: 'true',
        path: '/basic/typography',
        element: lazy(() => import('./views/ui-elements/basic/BasicTypography'))
      },
      {
        exact: 'true',
        path: '/forms/form-basic',
        element: lazy(() => import('./views/forms/FormsElements'))
      },
      {
        exact: 'true',
        path: '/tables/bootstrap',
        element: lazy(() => import('./views/tables/BootstrapTable'))
      },
      {
        exact: 'true',
        path: '/charts/nvd3',
        element: lazy(() => import('./views/charts/nvd3-chart'))
      },
      {
        exact: 'true',
        path: '/maps/google-map',
        element: lazy(() => import('./views/maps/GoogleMaps'))
      },
      {
        exact: 'true',
        path: '/sample-page',
        element: lazy(() => import('./views/extra/SamplePage'))
      },
      {
        path: '*',
        exact: 'true',
        element: () => <Navigate to={BASE_URL} />
      }
    ]
  }
];

export default routes;
