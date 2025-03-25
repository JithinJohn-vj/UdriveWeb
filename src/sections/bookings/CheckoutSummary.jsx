/* eslint-disable */

import { useState } from 'react';
import PropTypes from 'prop-types';

// @mui
import {
  Box,
  Card,
  Stack,
  Modal,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
} from '@mui/material';

import { fCurrency } from 'src/utils/formatNumber';

import { _invoice } from 'src/_mock/invoice';

import { InvoiceToolbar } from './invoice';
// utils
// components

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  total: PropTypes.number.isRequired,
  taxAmount: PropTypes.number.isRequired,
  selectedCustomer: PropTypes.object.isRequired,
  onEditDiscount: PropTypes.func.isRequired,
  onEditTax: PropTypes.func.isRequired,
  discount: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  subtotal: PropTypes.number.isRequired,
  invoiceId: PropTypes.number.isRequired,
  grandTotal: PropTypes.string.isRequired,
  shipping: PropTypes.number.isRequired,
  onApplyDiscount: PropTypes.func.isRequired,
  enableEdit: PropTypes.bool,
  enableDiscount: PropTypes.bool,
};

export default function CheckoutSummary({
  invoiceId,
  total,
  taxAmount,
  advanceAmount,
  formData,
  selectedCustomer,
  onEditDiscount,
  onEditTax,
  onEditAdvance,
  discount,
  items,
  subtotal,
  grandTotal,
  amntStatus,
  shipping,
  onApplyDiscount,
  enableEdit = false,
  enableDiscount = false,
}) {
  const [showModal, setShowModal] = useState(false);
  const [discountValue, setDiscountValue] = useState(discount);
  const [taxValue, setTaxValue] = useState(taxAmount);
  const [advanceValue, setAdvanceValue] = useState(advanceAmount);

  const handleInputChange = (event) => {
    setDiscountValue(event.target.value);
  };

  const handleApplyDiscount = () => {
    const discountValueNumber = parseFloat(discountValue);
    const taxValueNumber = parseFloat(taxValue);
    onEditDiscount(discountValueNumber);
    onEditTax(taxValueNumber);
    setShowModal(false); // Close the modal after updating values
  };
  const handleTaxesChange = (event) => {
    console.log(event.target.value);
    setTaxValue(event.target.value);
  };

  const handleAdvanceChange = (event) => {
    console.log(event.target.value);
    setAdvanceValue(event.target.value);
  };

  return (
    <>
      <InvoiceToolbar
        invoiceId={invoiceId}
        selectedCustomer={selectedCustomer}
        taxValue={taxValue}
        advanceValue={advanceValue}
        discountValue={discountValue}
        amntStatus={amntStatus}
        subtotal={subtotal}
        grandTotal={grandTotal}
        formData={formData}
        items={items}
        invoice={_invoice}
      />

      <Card
        className="mx-auto md:mr-0 max-w-[500px]  md:min-w-[400px]"
        sx={{
          top: -40,
          mb: 3,
        }}
      >
        <CardHeader title="Rent Summary" />

        <CardContent>
          <Stack spacing={2}>
            <Stack
              style={{
                top: 0,
                overflowY: 'auto',
                minHeight: '25vh',
                maxHeight: '40vh',
                zIndex: 5,
              }}
              spacing={2}
            >
              {items.map((m, key) => (
                <Stack key={key} direction="row" justifyContent="space-between">
                  <Typography
                    className="capitalize"
                    variant="body2"
                    sx={{ color: 'text.secondary' }}
                  >
                    {m.name}
                  </Typography>
                  <Typography variant="subtitle2">₹ {fCurrency(m.amount)}</Typography>
                </Stack>
              ))}
            </Stack>

            <Stack
              style={{
                top: 0,
                position: '-webkit-sticky',
                zIndex: 5,
              }}
              direction="row"
              justifyContent="space-between"
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: 'full',
                  borderRadius: '20px',
                  padding: '5px',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: '1px solid',
                    width: 'full',
                    borderRadius: '20px',
                    padding: '5px',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div
                    role="presentation"
                    className="flex gap-2 cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      Adv
                    </Typography>
                    <Typography variant="subtitle2">
                      {' '}
                      ₹ {advanceValue ? fCurrency(advanceValue) : '-'}
                    </Typography>
                  </div>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: '1px solid',
                    width: 'full',
                    borderRadius: '20px',
                    padding: '5px',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div
                    role="presentation"
                    className="flex gap-2 cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    <Typography variant="subtitle2">Discount</Typography>

                    <Typography variant="subtitle2">₹ {discountValue || '-'}</Typography>
                  </div>

                  <Modal open={showModal} onClose={() => setShowModal(false)} centered>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        p: 2,
                      }}
                    >
                      <Typography mb={2} variant="h6">
                        Enter Advance
                      </Typography>
                      <TextField
                        variant="outlined"
                        label="Advance"
                        type="number"
                        value={advanceValue}
                        fullWidth
                        onChange={handleAdvanceChange}
                        mb={2}
                      />
                      <Typography mb={2} variant="h6">
                        Enter Discount
                      </Typography>
                      <TextField
                        variant="outlined"
                        label="Discount"
                        type="number"
                        value={discountValue}
                        fullWidth
                        onChange={handleInputChange}
                        mb={2}
                      />
                      {/* <Typography mb={2} variant="h6">
                        Enter tax
                      </Typography>  */}
                     {/*  
                      <TextField
                        variant="outlined"
                        label="Taxes"
                        type="number"
                        value={taxValue}
                        onChange={handleTaxesChange}
                        fullWidth
                        mb={2}
                      /> */}
                      <Box mt={2} textAlign="right">
                        <Button onClick={handleApplyDiscount}>Apply</Button>
                      </Box>
                    </Box>
                  </Modal>
                </Box>

                {/* <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: '1px solid',
                    width: 'full',
                    borderRadius: '20px',
                    padding: '5px',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <div
                    role="presentation"
                    className="flex gap-2 cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                      Taxes
                    </Typography>
                    <Typography variant="subtitle2">
                      {' '}
                      ₹ {taxAmount ? fCurrency(taxAmount) : '-'}
                    </Typography>
                  </div>
                </Box> */}
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: 'full',
                  borderRadius: '20px',
                  border: '1px solid',
                  padding: '5px',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Typography variant="subtitle2">Sub Total</Typography>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
                    ₹ {fCurrency(subtotal || '')}
                  </Typography>
                </Box>
              </Box>
            </Stack>
            <Divider className="shadow-gray-600" />

            <Stack
              style={{
                top: 0,
                position: '-webkit-sticky',
                zIndex: 5,
              }}
              direction="row"
              justifyContent="space-between"
            >
              <Typography variant="subtitle1">Grand Total</Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h5" sx={{ color: 'error.main' }}>
                  ₹ {fCurrency(grandTotal - advanceValue || '')}
                </Typography>
              </Box>
            </Stack>
            {amntStatus === 'unpaid' && (
              <Stack
                style={{
                  top: 0,
                  position: '-webkit-sticky',
                  zIndex: 5,
                }}
                direction="row"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">Balance Due</Typography>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="h4" sx={{ color: 'error.main' }}>
                    ₹ {fCurrency(grandTotal - advanceValue || '')}
                  </Typography>
                  <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                    (VAT included if applicable)
                  </Typography>
                </Box>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
