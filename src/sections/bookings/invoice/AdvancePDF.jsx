/* eslint-disable */

import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';

// utils
import { fCurrency } from 'src/utils/formatNumber';

//

import {
  formatPhoneNumber,
  formatSuffixDate,
  formatSuffixDateAdv,
} from 'src/components/format-changer/FormatChnager';

import styles from './InvoiceStyle';
import { upperCase } from 'lodash';

// ----------------------------------------------------------------------

AdvancePDF.propTypes = {
  selectedCustomer: PropTypes.object,
  taxValue: PropTypes.number,
  discountValue: PropTypes.number,
  subtotal: PropTypes.number,
  invoiceId: PropTypes.number,
  grandTotal: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.object),
  invoice: PropTypes.shape({
    id: PropTypes.string.isRequired,
    taxes: PropTypes.array,
    status: PropTypes.string.isRequired,
    discount: PropTypes.number,
    invoiceTo: PropTypes.object.isRequired,
    invoiceFrom: PropTypes.object.isRequired,
  }).isRequired,
};

export default function AdvancePDF({
  selectedCustomer,
  taxValue,
  discountValue,
  selectedCar,
  totalDuration,
  pickupCost,
  costAfterMinimumKm,
  minimumKilometer,
  deliveryCost,
  fromDate,
  toDate,
  pickupPoint,
  dropPoint,
  costPerDay,
  advanceValue,
  subtotal,
  amntStatus,
  p,
  listTotal,
  grandTotal,
  formData,
  perDayCarCost,
  items,
  invoice,
  invoiceId,
}) {
  console.log(items);
  console.log(p);
  console.log(selectedCustomer);
  const { status, invoiceFrom } = invoice;
  console.log(advanceValue);
  console.log(formData);
  console.log(selectedCar);
  return (
    <Document>
      <Page size="A4" style={styles.advance}>
        <View style={[styles.gridContainer, styles.mb40]}>
          <Image source="/logo/logo_full.jpg" style={{ height: 32 }} />
          <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
            {/* <Text style={styles.h3}>Advance payment</Text> */}
            <Text>BK-CNF-{invoiceId}</Text>
          </View>
        </View>

        <View style={[styles.mb8]}>
          <View style={styles.colFull}>
            <Text style={[styles.mb8, styles.h1]}>Booking confirmation Reciept</Text>
            <Text style={[styles.mb4, styles.h5]}>Hey {selectedCustomer.name},</Text>
            <Text style={[styles.mb4, styles.h6]}>
              We are pleased to inform you that your booking for the{' '}
              <Text style={[styles.bold]}>
                {' '}
                {selectedCar.manufacturingCompany}-{selectedCar.name}
              </Text>
              
              <Text style={[styles.uppercase]}>
                {' '}
                ({selectedCar.transmission})
              </Text>
              

               from{' '}
              <Text style={[styles.bold]}>{formatSuffixDateAdv(fromDate)} </Text>
              to <Text style={[styles.bold]}>{formatSuffixDateAdv(toDate)}</Text> has been confirmed
              with us.
            </Text>
            <Text style={[styles.mb4, styles.h6]}>
              We have received an advance payment of{' '}
              <Text style={[styles.bold]}>₹ {advanceValue}</Text> to confirm your booking .
            </Text>
            <Text style={[styles.mb4, styles.h6]}>
              We look forward to serving you on time. Cheers, and thank you for booking with us.
            </Text>
          </View>
        </View>

        <View style={[styles.gridContainer, styles.mb8, styles.border]}></View>

        <View style={[styles.gridContainer, styles.mb8]}>
          <View style={styles.col8}>
            <Text style={[styles.overline, styles.mb8]}>CUSTOMER INFORMATION</Text>
            <Text style={styles.body1}>{selectedCustomer.name}</Text>
            456 Elm Street, Townsville, State, 54321
            
            <Text style={styles.body1}>
              {selectedCustomer?.email}
            </Text>

            <Text style={styles.body1}>
              {selectedCustomer.locality}
            </Text>
            

            <Text style={styles.body1}>
              {selectedCustomer.cityOrDistrict},{selectedCustomer.state},
            </Text>

            <Text style={styles.body1}>{formatPhoneNumber(selectedCustomer.contactNumber)}</Text>
          </View>
          <View style={styles.col8}>
            <Text style={[styles.overline, styles.mb8]}>CAR INFORMATION</Text>
            <Text style={styles.body1}>
              {selectedCar.manufacturingCompany}-{selectedCar.name}
            </Text>
            {/* 456 Elm Street, Townsville, State, 54321 */}

            <Text style={[styles.body1,styles.uppercase]} >Transmission:{selectedCar.transmission}</Text>
            <Text style={[styles.body1,styles.uppercase]}>Fuel:{selectedCar.fuelType}</Text>

            <Text style={styles.body1}>Car Rent- ₹{costPerDay || '-'} per day</Text>
          </View>
        </View>
        <View style={[styles.border]}></View>

        <View style={[styles.gridContainer, styles.mb8]}>
          <View style={styles.col8}>
            <Text style={[ styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.overline}>DELIVERY LOCATION-{dropPoint}</Text>
            </Text>
            <Text style={[ styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.overline}>PICKUP LOCATION-{pickupPoint}</Text>
            </Text>{' '}
            <Text style={[ styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.overline}>DELIVERY DATE-{fromDate}</Text>
            </Text>
            <Text style={[ styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.overline}>PICKUP DATE-{toDate}</Text>
            </Text>{' '}
            <Text style={[ styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.overline}>Pickup cost- ₹{pickupCost ? pickupCost : '-'}</Text>
            </Text>
            <Text style={[ styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.overline}>
                Delivery cost- ₹{deliveryCost ? deliveryCost : '-'}
              </Text>
            </Text>
            <Text style={[ styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.overline}>Car Rent- ₹{costPerDay || '-'} per day</Text>
            </Text>{' '}
            <Text style={[ styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.overline}>
                Duration of rent - {totalDuration ? totalDuration : '-'} days
              </Text>
            </Text>
            <Text style={[ styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.overline}>
                Total km limit for {totalDuration ? totalDuration : '-'} days - {Number(totalDuration?totalDuration:0)*Number(minimumKilometer?minimumKilometer:0)} kms
              </Text>
            </Text>
            <Text style={[ styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.overline}>
                cost after total kilometer limit - ₹{costAfterMinimumKm ? costAfterMinimumKm : '-'} per km
              </Text>
            </Text>
          </View>
        </View>
        <Text style={[styles.overline, styles.mb8]}>Advance Details</Text>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text style={styles.subtitle2}>#</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>Name of service</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2} />
              </View>
              <View style={styles.tableCell_3}>
                <Text style={styles.subtitle2}>Amount</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.subtitle2}>Total</Text>
              </View>
            </View>
          </View>

          <View style={styles.tableBody}>
            <View style={styles.tableRow}>
              <View style={styles.tableCell_1}>
                <Text>1</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}></Text>
                <Text>Advance</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text></Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text>{advanceValue}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{advanceValue}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text>Sub Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{fCurrency(advanceValue)}</Text>
              </View>
            </View>

            <View style={[styles.tableRow, styles.noBorder]}>
              <View style={styles.tableCell_1} />
              <View style={styles.tableCell_2} />
              <View style={styles.tableCell_3} />
              <View style={styles.tableCell_3}>
                <Text style={styles.h5}>Grand Total</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text style={styles.h5}>{fCurrency(advanceValue)}</Text>
              </View>
            </View>
         
          </View>
        </View>

        <View style={[styles.gridContainer, styles.footer]}>
          <View style={styles.col8}>
            <Text style={styles.subtitle2}>NOTES</Text>
            <Text style={[styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.subtitle2}>
                {' '}
                Once the car is booked, no refunds will be issued under any circumstances.
              </Text>
            </Text>{' '}
            <Text style={[styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.subtitle2}>
                {' '}
                If the pickup point is not confirmed, please return the vehicle to our yard at
                Irinjalakuda.
              </Text>
            </Text>
            <Text style={[styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.subtitle2}>
                Inform us and confirm the pick-up date, time, and location at least 48 hours in
                advance.
              </Text>
            </Text>{' '}
            <Text style={[styles.h6, styles.row]}>
              <View style={styles.bullet}>
                <Text>{'\u2022' + ' '}</Text>
              </View>
              <Text style={styles.subtitle2}>
              Up to 2 hours of complimentary rent-free time is allowed after the original vehicle return date and time. After 2 hours, an extra day's rent is charged.
              </Text>
            </Text>{' '}
          </View>
          <View style={[styles.col4, styles.alignRight]}>
            <Text style={styles.subtitle2}>Have a Question?</Text>
            <Text>Admin@udrivecars.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
