import { useState } from 'react';

import Stack from '@mui/material/Stack';
import { InputAdornment } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';

import { useGetCars } from 'src/api/cars/Queries';

import Iconify from 'src/components/iconify';
import ItemLoading from 'src/components/custom-made/ItemLoading';

import ProductCard from '../product-card';
import ProductSort from '../product-sort';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const getCarsQuery = useGetCars();
  console.log(getCarsQuery.data);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 12;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const filteredProducts =
    getCarsQuery?.data?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.manufacturingCompany.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="space-between"
        sx={{ mb: 3 }}
      >
        <TextField
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search cars..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
                />
              </InputAdornment>
            ),
          }}
        />{' '}
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          <ProductSort />
        </Stack>
      </Stack>

      {paginatedProducts.length > 0 ? (
        <Grid container spacing={3}>
          {paginatedProducts.map((product) => (
            <Grid key={product._id} xs={12} sm={6} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <>
          {getCarsQuery.isLoading ? (
            <div className="w-full flex justify-center items-center">
              <ItemLoading />
            </div>
          ) : (
            <Typography variant="h6" sx={{ mt: 3, textAlign: 'center', width: '100%' }}>
              No results found
            </Typography>
          )}
        </>
      )}

      {filteredProducts.length > 0 && (
        <Stack spacing={2} sx={{ mt: 3 }} alignItems="end">
          <Pagination count={totalPages} page={page} onChange={handleChangePage} color="primary" />
        </Stack>
      )}
    </Container>
  );
}
