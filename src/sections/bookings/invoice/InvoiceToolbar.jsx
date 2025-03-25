/* eslint-disable */

import { useState } from 'react';
import PropTypes from 'prop-types';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Box, Fade, Modal, Button } from '@mui/material';

import Iconify from 'src/components/iconify';

import InvoicePDF from './InvoicePDF';
// Styles remain the same

InvoiceToolbar.propTypes = {
  invoice: PropTypes.object.isRequired,
};
const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(5),
}));

const ModalContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80%',
  height: '95%',
  margin: 'auto',
});
// ----------------------------------------------------------------------

InvoiceToolbar.propTypes = {
  taxValue: PropTypes.number.isRequired,
  selectedCustomer: PropTypes.object.isRequired,
  discountValue: PropTypes.number.isRequired,
  subtotal: PropTypes.number.isRequired,
  grandTotal: PropTypes.number.isRequired,
  invoice: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  invoiceId: PropTypes.number.isRequired,
};

export default function InvoiceToolbar({
  taxValue,
  selectedCustomer,
  invoiceId,
  discountValue,
  advanceValue,
  subtotal,
  grandTotal,
  amntStatus,
  formData,
  invoice,
  items,
  ...other
}) {
  console.log(advanceValue);
  console.log(invoice);
  console.log(items);
  const [openPDF, setOpenPDF] = useState(false);

  const handleOpenPreview = () => {
    setOpenPDF(true);
  };

  const handleClosePreview = () => {
    setOpenPDF(false);
  };

  return (
    <RootStyle {...other}>
      {/* <Button
        color="info"
        size="small"
        variant="contained"
        onClick={handleOpenPreview}
        endIcon={<Iconify icon="eva:eye-fill" />}
        sx={{ mx: 1 }}
      >
        Preview
      </Button> */}

      <PDFDownloadLink
        document={
          <InvoicePDF
            invoiceId={invoiceId}
            formData={formData}
            selectedCustomer={selectedCustomer}
            taxValue={taxValue}
            discountValue={discountValue}
            subtotal={subtotal}
            advanceValue={advanceValue}
            grandTotal={grandTotal}
            items={items}
            amntStatus={amntStatus}
            invoice={invoice}
          />
        }
        fileName={`INVOICE-${invoiceId}`}
        style={{ textDecoration: 'none' }}
      >
        {/* {({ loading }) => (
          <LoadingButton
            size="small"
            loading={loading}
            variant="contained"
            loadingPosition="end"
            endIcon={<Iconify icon="eva:download-fill" />}
          >
            Download
          </LoadingButton>
        )} */}
      </PDFDownloadLink>

      {/* PDF preview modal */}
      <Modal open={openPDF} onClose={handleClosePreview} closeAfterTransition>
        <Fade in={openPDF}>
          <ModalContainer>
            <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
              <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
                <InvoicePDF
                  invoiceId={invoiceId}
                  selectedCustomer={selectedCustomer}
                  taxValue={taxValue}
                  formData={formData}
                  advanceValue={advanceValue}
                  discountValue={discountValue}
                  subtotal={subtotal}
                  amntStatus={amntStatus}
                  grandTotal={grandTotal}
                  items={items}
                  invoice={invoice}
                />
              </PDFViewer>
            </Box>
          </ModalContainer>
        </Fade>
      </Modal>
    </RootStyle>
  );
}
