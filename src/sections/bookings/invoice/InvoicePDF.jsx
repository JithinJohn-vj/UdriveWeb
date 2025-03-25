/* eslint-disable */

import PropTypes from 'prop-types';
import { Page, View, Text, Image, Document } from '@react-pdf/renderer';

// utils
import { fCurrency } from 'src/utils/formatNumber';
import { formatPhoneNumber } from 'src/components/format-changer/FormatChnager';

import styles from './InvoiceStyle';

// Function to chunk items into pages
const chunkItems = (items, itemsPerPage) => {
  const chunks = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    chunks.push(items.slice(i, i + itemsPerPage));
  }
  return chunks;
};

// ----------------------------------------------------------------------

InvoicePDF.propTypes = {
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

export default function InvoicePDF({
  selectedCustomer,
  taxValue,
  discountValue,
  advanceValue,
  subtotal,
  amntStatus,
  p,
  carSelected,
  listTotal,
  grandTotal,
  formData,
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

  // Split the driverNotes into sentences
  const driverNotes = formData ? formData.driverNotes : p?.driverNotes;

  // Split the driverNotes into lines and push to an array
  const lines = [];
  if (driverNotes) {
    driverNotes.split('\n').forEach(line => {
      lines.push(line.trim());
    });
  }
  const itemsPerPage = 6;
  const itemChunks = chunkItems(items, itemsPerPage);
  const totalPages = itemChunks.length;

  const renderPage = (itemsChunk, pageIndex) => (
    <Page size="A4" style={styles.page} key={pageIndex}>
      <View style={[styles.gridContainer, styles.mb40]}>
        <Image source="/logo/logo_full.jpg" style={{ height: 32 }} />
        <View style={{ alignItems: 'flex-end', flexDirection: 'column' }}>
          <Text style={styles.h3}>{amntStatus}</Text>
          <Text>INV-{invoiceId}</Text>
        </View>
      </View>

      <View style={[styles.gridContainer, styles.mb8]}>
        <View style={styles.col6}>
          <Text style={[styles.overline, styles.mb8]}>Invoice from</Text>
          <Text style={styles.body1}>U Drive Rent a Car Thrissur</Text>
          <Text style={styles.body1}>Bell mouth building,Marar road,</Text>
          <Text style={styles.body1}>Thrissur,Kerala.680001</Text>
          <Text style={styles.body1}>956-777-3757</Text>
        </View>
        <View style={styles.col6}>
          <Text style={[styles.overline, styles.mb8]}>Invoice to</Text>
          <Text style={styles.body1}>{selectedCustomer.name}</Text>
          <Text style={styles.body1}>
            {selectedCustomer.address},{selectedCustomer.locality}
          </Text>
          <Text style={styles.body1}>
            {selectedCustomer.cityOrDistrict},{selectedCustomer.state},{selectedCustomer.pincode}
          </Text>
          <Text style={styles.body1}>{formatPhoneNumber(selectedCustomer.contactNumber)}</Text>
        </View>
      </View>

      <View style={[styles.gridContainer, styles.mb40]}>
        <View style={styles.col6}>
          <Text style={[styles.overline, styles.mb4]}>Driver details</Text>
          <Text style={styles.body1}>{formData ? formData.driverName : p?.driverName}</Text>
          <Text style={styles.body1}>{formData ? formData.contactNumber : p?.contactNumber}</Text>
        </View>
        <View style={styles.col6}>
        {/* <div className="flex flex-col">
                <Typography variant="subtitle1" noWrap>
                  {carSelected?.name}
                </Typography>
                <Typography color="gray" variant="overline" noWrap>
                  {carSelected?.manufacturingCompany}
                </Typography>{' '}
                <Typography color="gray " variant="overline" noWrap>
                  {carSelected?.yearOfManufacturing}
                </Typography>
              </div> */}
          <Text style={[styles.overline, styles.mb8]}>Car Details</Text>
          <Text style={styles.body1}>{carSelected?.name} {carSelected?.manufacturingCompany} ({carSelected?.transmission})</Text>
          <Text style={styles.body1}>Fuel Type:- {carSelected?.fuelType}</Text>
        </View>
      </View>

      <Text style={[styles.overline, styles.mb8]}>Invoice Details</Text>

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
          {itemsChunk.map((item, index) => (
            <View style={styles.tableRow} key={item.id}>
              <View style={styles.tableCell_1}>
                <Text>{index + 1 + pageIndex * itemsPerPage}</Text>
              </View>
              <View style={styles.tableCell_2}>
                <Text style={styles.subtitle2}>{item.title}</Text>
                <Text>{item.name}</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text>{item.qty}</Text>
              </View>
              <View style={styles.tableCell_3}>
                <Text>{item.amount}</Text>
              </View>
              <View style={[styles.tableCell_3, styles.alignRight]}>
                <Text>{item.amount}</Text>
              </View>
            </View>
          ))}

          {/* Render totals only on the last page */}
          {pageIndex === itemChunks.length - 1 && (
            <>
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text>Sub Total</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text>{fCurrency(subtotal)}</Text>
                </View>
              </View>
              {discountValue !== 0 && (
                <View style={[styles.tableRow, styles.noBorder]}>
                  <View style={styles.tableCell_1} />
                  <View style={styles.tableCell_2} />
                  <View style={styles.tableCell_3} />
                  <View style={styles.tableCell_3}>
                    <Text>Discount</Text>
                  </View>
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>{fCurrency(-discountValue)}</Text>
                  </View>
                </View>
              )}
              {/* {taxValue !== 0 && (
                <View style={[styles.tableRow, styles.noBorder]}>
                  <View style={styles.tableCell_1} />
                  <View style={styles.tableCell_2} />
                  <View style={styles.tableCell_3} />
                  <View style={styles.tableCell_3}>
                    <Text>Taxes</Text>
                  </View>
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>{fCurrency(taxValue)}</Text>
                  </View>
                </View>
              )} */}
              {advanceValue !== 0 && (
                <View style={[styles.tableRow, styles.noBorder]}>
                  <View style={styles.tableCell_1} />
                  <View style={styles.tableCell_2} />
                  <View style={styles.tableCell_3} />
                  <View style={styles.tableCell_3}>
                    <Text>Advance</Text>
                  </View>
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text>-{fCurrency(advanceValue)}</Text>
                  </View>
                </View>
              )}
              <View style={[styles.tableRow, styles.noBorder]}>
                <View style={styles.tableCell_1} />
                <View style={styles.tableCell_2} />
                <View style={styles.tableCell_3} />
                <View style={styles.tableCell_3}>
                  <Text style={styles.h5}>Grand Total</Text>
                </View>
                <View style={[styles.tableCell_3, styles.alignRight]}>
                  <Text style={styles.h5}>{fCurrency(listTotal || grandTotal - advanceValue)}</Text>
                </View>
              </View>
              {amntStatus === 'unpaid' && (
                <View style={[styles.tableRow, styles.noBorder]}>
                  <View style={styles.tableCell_1} />
                  <View style={styles.tableCell_2} />
                  <View style={styles.tableCell_3} />
                  <View style={styles.tableCell_3}>
                    <Text style={styles.h4}>Balance due</Text>
                  </View>
                  <View style={[styles.tableCell_3, styles.alignRight]}>
                    <Text style={styles.h4}>
                      {amntStatus === 'paid'
                        ? fCurrency(0)
                        : fCurrency(listTotal || grandTotal - advanceValue)}
                    </Text>
                  </View>
                </View>
              )}
              {formData?.driverNotes || p?.driverNotes ? (
                <>
                  <Text style={styles.overline}>Important Notes</Text>
                  {/* <Text style={[styles.h6, styles.row]}>
                    <View style={styles.bullet}>
                      <Text>{'\u2022' + ' '}</Text>
                    </View>
                    <Text style={styles.subtitle2}>
                      {formData ? formData.driverNotes : p?.driverNotes}{' '}
                    </Text>
                  </Text> */}
      {lines.map((line, index) => (
                    <View key={index} style={styles.row}>
                      <Text style={styles.bullet}>{'\u2022'}</Text>
                      <Text style={styles.body1}>{line}</Text>
                    </View>
                  ))}
                </>
              ) : (
                ''
              )}
            </>
          )}
        </View>
      </View>

      {/* Render notes only on the last page */}
      <View style={[styles.gridContainer, styles.footer]}>
        <View style={styles.col8}>
          <Text style={styles.subtitle2}>NOTES</Text>
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
              Up to 2 hours of complimentary rent-free time is allowed after the original vehicle
              return date and time. After 2 hours, an extra day's rent is charged.
            </Text>
          </Text>{' '}

        </View>
        <View style={[styles.col4, styles.alignRight]}>
          <Text style={styles.subtitle2}>Have a Question?</Text>
          <Text>Admin@udrivecars.com</Text>
        </View>
      </View>
      <View fixed style={[styles.pgno, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
        <Text>
          Page {pageIndex + 1} of {totalPages}
        </Text>
      </View>
    </Page>
  );

  return (
    <Document>
      {itemChunks.map((itemsChunk, index) => renderPage(itemsChunk, index))}
    </Document>
  );
}
