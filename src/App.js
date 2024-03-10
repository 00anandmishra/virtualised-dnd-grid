import React, { useState, useEffect } from 'react';
import MainContainer from './components/MainContainer';
import axios from 'axios';
import { Box, Container, Typography } from '@mui/material';

function App() {
  const [products, setProducts] = useState([]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get('https://hp-api.onrender.com/api/characters');

      if (response.status === 200) {
        setProducts(response.data);
      } else {
        throw new Error(`Failed to fetch characters. Status: ${response.status}`);
      }
    } catch (error) {
      throw new Error(`Failed to fetch characters. ${error.message}`);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
      <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          textAlign="center"
          minHeight="100vh"
          padding="100px"
          background="#fff4f466"
      >
        <Container maxWidth="xl" className="container">
          <Typography variant="h4" gutterBottom style={{ marginBottom: '40px' }}>
            Harry potter
          </Typography>
          {products.length > 0 && (
              <MainContainer products={products} />
          )}
        </Container>
      </Box>
  );
}

export default App;
