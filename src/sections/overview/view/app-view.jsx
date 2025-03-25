// import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';

// import AppTasks from '../app-tasks';

import { useEffect } from 'react';
import { io } from 'socket.io-client';

// import AppNewsUpdate from '../app-news-update';
import CircularProgress from '@mui/material/CircularProgress';

import { useGetCustomers } from 'src/api/customers/Queries';
import {
  useGetCars,
  useGetCarsOnRun,
  useGetCarsOnYard,
  useGetTopBookedCars,
} from 'src/api/cars/Queries';
import {
  useGetAllBookings,
  useGetTotalRevenue,
  useGetUnupdatedKms,
  useGetMonthlyRevenue,
  useGetUpcomingBookings,
  useGetBookingInvoice2d,
} from 'src/api/bookings/Queries';

import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
import AppTrafficBySite from '../app-traffic-by-site';

// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const bookingInvoiceDue2D = useGetBookingInvoice2d();
  const totalBookings = useGetAllBookings();
  const totalCustomers = useGetCustomers();
  const topFivecars = useGetTopBookedCars();
  const getCarsQuery = useGetCars();
  const getMonthlyRevenueChartData = useGetMonthlyRevenue();
  const getTotalRevenue = useGetTotalRevenue();
  const getUpcomingBookings = useGetUpcomingBookings();
  const getCarsOnYard = useGetCarsOnYard();
  const getCarsOnRun = useGetCarsOnRun();
  const getCarsWithUnupdatedKms = useGetUnupdatedKms();
  console.log(bookingInvoiceDue2D);
  console.log(getCarsWithUnupdatedKms);
  useEffect(() => {
    const socket = io('https://udrive-server-ts-2.onrender.com');
    console.log(socket);
  }, []);
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Revenue Generated"
            total={getTotalRevenue?.data?.totalRevenue || '0'}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Customers"
            total={totalCustomers?.data?.length || '0'}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bookings"
            total={totalBookings?.data?.length || 'o'}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Cars"
            total={getCarsQuery?.data?.length || '0'}
            color="error"
            icon={<img className="w-full h-full" alt="icon" src="/assets/icons/glass/ic-car.png" />}
          />
        </Grid>

        {bookingInvoiceDue2D.data?.length > 0 && (
          <>
            {bookingInvoiceDue2D.isFetched ? (
              <Grid xs={12}>
                <AppNewsUpdate
                  api="bookinginvoice2d"
                  title="Incomplete Invoices"
                  list={bookingInvoiceDue2D?.data || []}
                />
              </Grid>
            ) : (
              <Grid xs={12}>
                <div className="flex justify-center items-center w-full h-full ">
                  <CircularProgress />
                </div>
              </Grid>
            )}
          </>
        )}
        {getCarsWithUnupdatedKms.data?.length > 0 && (
          <>
            {getCarsWithUnupdatedKms.isFetched ? (
              <Grid xs={12}>
                <AppNewsUpdate
                  api="getCarsWithUnupdatedKms"
                  title="Incomplete Bookings (Trip kms not updated)"
                  list={getCarsWithUnupdatedKms?.data || []}
                />
              </Grid>
            ) : (
              <Grid xs={12}>
                <div className="flex justify-center items-center w-full h-full ">
                  <CircularProgress />
                </div>
              </Grid>
            )}
          </>
        )}
        {getMonthlyRevenueChartData.isFetched ? (
          <Grid xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Revenue"
              subheader="(+43%) than last year"
              chart={
                // labels: [
                //   '01/01/2024',
                //   '02/01/2024',
                //   '03/01/2024',
                //   '04/01/2024',
                //   '05/01/2024',
                //   '06/01/2024',
                //   '07/01/2024',
                //   '08/01/2024',
                //   '09/01/2024',
                //   '10/01/2024',
                //   '11/01/2024',
                // ],
                // series: [
                //   // {
                //   //   name: 'Team A',
                //   //   type: 'column',
                //   //   fill: 'solid',
                //   //   data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                //   // },
                //   // {
                //   //   name: 'Team B',
                //   //   type: 'area',
                //   //   fill: 'gradient',
                //   //   data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                //   // },
                //   {
                //     name: 'Revenue',
                //     type: 'column',
                //     fill: 'solid',
                //     data: [3000, 2500, 36000, 20000, 45000, 3000, 2000, 5200, 59000, 0, 0],
                //   },
                // ],
                getMonthlyRevenueChartData?.data?.chart
              }
            />
          </Grid>
        ) : (
          <Grid xs={12} md={6} lg={8}>
            <div className="flex justify-center items-center w-full h-full ">
              <CircularProgress />
            </div>
          </Grid>
        )}

        {topFivecars.isFetched ? (
          <Grid xs={12} md={6} lg={4}>
            <AppCurrentVisits title="Yard Status" chart={topFivecars.data} />
          </Grid>
        ) : (
          <Grid xs={12} md={6} lg={4}>
            <div className="flex justify-center items-center w-full h-full ">
              <CircularProgress />
            </div>
          </Grid>
        )}

        {getUpcomingBookings.isFetched ? (
          <Grid xs={12}>
            <AppNewsUpdate title="Upcoming Bookings" list={getUpcomingBookings?.data || []} />
          </Grid>
        ) : (
          <Grid xs={12}>
            <div className="flex justify-center items-center w-full h-full ">
              <CircularProgress />
            </div>
          </Grid>
        )}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AnalyticsOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        <Grid xs={12} md={6}>
          <AppTrafficBySite title="Cars on yard" api="carsonyard" list={getCarsOnYard?.data} />
        </Grid>
        <Grid xs={12} md={6}>
          <AppTrafficBySite title="Running cars" api="carsrunning" list={getCarsOnRun?.data} />
        </Grid>
        {/* <Grid xs={12} md={6}>
          <AppTrafficBySite
            title="Running cars"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
