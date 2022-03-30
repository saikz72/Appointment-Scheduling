import { Box, TextField, Button, Alert } from '@mui/material';
import React from 'react';
import Product from '../components/Product';
import {
  createProduct,
  getAllProductsFromServer,
} from 'services/ProductService';
import ProductType from 'types/ProductType';

export default function WarehouseInfo() {
  const [products, setProducts] = React.useState<ProductType[]>([]);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    getAllProductsFromServer().then((res) => setProducts(res?.data));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    const data = new FormData(event.currentTarget);

    const name = data.get('name')?.toString();
    const description = data.get('description')?.toString();
    const cost = data.get('cost')?.toString();

    const requestBody: any = {
      name,
      description,
      cost,
    };
    console.log(requestBody);
    createProduct(requestBody)
      .then((res) => {
        console.log('res', res.errors);
        if (res.errors !== undefined) {
          setError(true);
        } else {
          setError(false);
          setProducts([...products, res]);
        }
      })
      .catch((err) => setError(true));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginLeft: 40,
          marginBottom: 10,
        }}
        component="form"
        noValidate
        onSubmit={handleSubmit}
        width={500}
      >
        <Box
          mt={2}
          sx={{
            display: 'grid',
            gap: 1,
            gridTemplateColumns: 'repeat(2, 1fr)',
            justifyContent: 'center',
          }}
        >
          <TextField
            margin="normal"
            fullWidth
            id="name"
            label="Sparepart Name"
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            name="cost"
            label="Sparepart Cost"
            id="cost"
          />
        </Box>
        <TextField
          margin="normal"
          fullWidth
          name="description"
          label="Description"
          id="description"
          multiline
          minRows={4}
        />
        <Button sx={{ marginTop: 2 }} variant="contained" type="submit">
          Add Spare part
        </Button>
        {error && (
          <Alert variant="filled" severity="error">
            Cannot create spare part at this time. Try again
          </Alert>
        )}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {products.map((product: ProductType) => {
          return (
            <Box m={1} key={product?._id}>
              <Product product={product} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
