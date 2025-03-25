/* eslint-disable */

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import { Avatar, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';

import Iconify from 'src/components/iconify';
import { formatSuffixDate } from 'src/components/format-changer/FormatChnager';
import { toBookingList, toCarsList } from 'src/paths/ShowMeTheWayFrontend';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export default function AppTrafficBySite({ title, api, subheader, list, ...other }) {
  console.log(list);

  const parseDateString = (dateString) => {
    // Split the date string into parts
    const parts = dateString.split(' ');
    const datePart = parts[0];
    const timePart = `${parts[1]} ${parts[2]}`; // Join time and AM/PM

    // Split the date part into day, month, and year
    const dateParts = datePart.split('-');
    const day = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Month is 0-based in JavaScript
    const year = parseInt(dateParts[2]);

    // Split the time part into hours and minutes
    const timeParts = timePart.split(':');
    let hours = parseInt(timeParts[0]);
    const minutes = parseInt(timeParts[1]);

    // Adjust hours for PM if necessary
    if (parts[2] === 'PM' && hours !== 12) {
      hours += 12;
    }

    // Create a new Date object with the parsed values
    return new Date(year, month, day, hours, minutes);
  };
  // Get the current date
  const currentDate = new Date();

  // Find the first booking greater than the current date
  const nextBooking = list
    ?.flatMap((item) => item.bookings)
    .find((booking) => parseDateString(booking.fromDate) > currentDate);

  console.log(nextBooking);

  const router = useRouter();

  return (
    <>
      {api === 'carsrunning' ? (
        <Card {...other}>
          <CardHeader title={title} subheader={subheader} />
          {list?.length > 0 ? (
            <Box
              sx={{
                p: 3,
                gap: 2,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
              }}
            >
              {list?.slice(0, 8).map((site) => (
                <Paper
                  key={site.name}
                  variant="outlined"
                  sx={{ py: 1.5, textAlign: 'center', borderStyle: 'dashed' }}
                >
                  <Avatar
                    className="mx-auto"
                    variant="square"
                    sx={{ width: 90, height: 60 }}
                    src={site.carImage?.url}
                  />
                  <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                    {site.name}
                  </Typography>

                  {/* <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Booked From <br />
                    {formatSuffixDate(site.bookings?.fromDate)}
                  </Typography> */}
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Booked Till <br />
                    <p className="font-bold text-sm">{formatSuffixDate(site.bookings?.toDate)}</p>
                  </Typography>
                </Paper>
              ))}
            </Box>
          ) : (
            <Box
              sx={{
                p: 3,
                gap: 2,
              }}
            >
              <Paper
                variant="outlined"
                sx={{ py: 1.5, textAlign: 'center', borderStyle: 'dashed' }}
              >
                No Running cars
                <br />
                Available at the moment
              </Paper>
            </Box>
          )}
          <Box sx={{ p: 2, textAlign: 'right' }}>
            <Button
              onClick={() => router.push(toCarsList)}
              size="small"
              color="inherit"
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            >
              View all
            </Button>
          </Box>
        </Card>
      ) : (
        <Card {...other}>
          <CardHeader title={title} subheader={subheader} />
          {list?.length > 0 ? (
            <Box
              sx={{
                p: 3,
                gap: 2,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
              }}
            >
              {list?.slice(0, 8).map((site) => {
                // Find the next booking for the current car
                const nextBooking = site.bookings.find((booking) => {
                  const bookingDate = parseDateString(booking.fromDate);
                  // Check if booking date is greater than current date
                  if (bookingDate > currentDate) {
                    return true;
                  }
                  // If booking date is equal to current date, check time
                  if (bookingDate.getTime() === currentDate.getTime()) {
                    const bookingTime = bookingDate.getHours() * 60 + bookingDate.getMinutes();
                    const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
                    // Return true if booking time is greater than current time
                    return bookingTime > currentTime;
                  }
                  return false;
                });
                return (
                  <Paper
                    key={site.car?.name}
                    variant="outlined"
                    sx={{ py: 1.5, textAlign: 'center', borderStyle: 'dashed' }}
                  >
                    <Avatar
                      className="mx-auto"
                      variant="square"
                      sx={{ width: 90, height: 60 }}
                      src={site?.carImage?.url}
                    />
                    <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                      {site.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {nextBooking ? (
                        <>
                          Free till
                          <p className="font-bold text-sm">
                            {formatSuffixDate(nextBooking.fromDate)}
                          </p>
                        </>
                      ) : (
                        'No upcoming bookings'
                      )}
                    </Typography>
                  </Paper>
                );
              })}
            </Box>
          ) : (
            <Box
              sx={{
                p: 3,
                gap: 2,
              }}
            >
              <Paper
                variant="outlined"
                sx={{ py: 1.5, textAlign: 'center', borderStyle: 'dashed' }}
              >
                No cars on yard
                <br />
                Available at the moment
              </Paper>
            </Box>
          )}

          <Box sx={{ p: 2, textAlign: 'right' }}>
            <Button
              onClick={() => router.push(toCarsList)}
              size="small"
              color="inherit"
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
            >
              View all
            </Button>
          </Box>
        </Card>
      )}
    </>
  );
}

AppTrafficBySite.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  api: PropTypes.string,
  list: PropTypes.array.isRequired,
};
