/* eslint-disable */

import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { fCurrency } from 'src/utils/format-number';

import EditId from 'src/zustand/EditId';
import { toCarsMaientenanceDetailed } from 'src/paths/ShowMeTheWayFrontend';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ShopProductCard({ product }) {
  const router = useRouter();

  console.log(product);
  const renderStatus = (
    <Label
      variant="filled"
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.serviceHistory?.length} Services
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product?.carImage?.url}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.priceSale && fCurrency(product.priceSale)}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  const handleMove = (ids) => {
    EditId.setState({ id: ids });
    console.log(ids);
    router.push(toCarsMaientenanceDetailed);
  };
  return (
    <Card className="cursor-pointer">
      <div onClick={() => handleMove(product?._id)}>
        <Box sx={{ pt: '65%', position: 'relative' }}>
          {renderStatus}

          {renderImg}
        </Box>
        <Link
          borderBottom={1}
          paddingBottom={1}
          color="inherit"
          underline="hover"
          className="tracking-widest flex justify-center pt-4"
          fontFamily="monospace"
          variant="subtitle2"
          noWrap
        >
          {product.manufacturingCompany}-{product.name}
        </Link>
        <div className="flex px-2 justify-between items-center pt-3 pb-3">
          <Link
            className="flex gap-2 items-center w-1/2"
            color="inherit"
            underline="hover"
            fontSize={12}
            variant="subtitle2"
            noWrap
          >
            <Iconify
              icon="mdi:fuel"
              sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
            />
            {product.fuelType}
          </Link>

          <Link
            className="flex gap-2 items-center w-1/2"
            color="inherit"
            fontSize={12}
            underline="hover"
            variant="subtitle2"
            noWrap
          >
            <Iconify
              icon="material-symbols-light:speed"
              sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
            />
            {product.totalKmCovered}
          </Link>
        </div>

        <div className="flex px-2  justify-between items-center pb-4">
          <Link
            className="flex gap-2 items-center w-1/2"
            color="inherit"
            fontSize={12}
            underline="hover"
            noWrap
          >
            <Iconify
              icon="tabler:number"
              sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
            />
            {product.vehicleNumber}
          </Link>
          <Link
            className="flex gap-2 items-center w-1/2"
            color="inherit"
            underline="hover"
            fontSize={12}
            variant="subtitle2"
            noWrap
          >
            <Iconify
              icon="material-symbols:auto-transmission-outline"
              sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
            />
            {product.transmission}
          </Link>
        </div>
      </div>
    </Card>
  );
}

ShopProductCard.propTypes = {
  product: PropTypes.object,
};
