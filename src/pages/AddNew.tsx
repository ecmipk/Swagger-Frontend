import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { addMaintenance } from '../redux/slices/maintenanceSlice';
import { Maintenance } from '../redux/slices/maintenanceSlice';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Container,
  Stack,
  useBreakpointValue,
  extendTheme,
} from '@chakra-ui/react';

// Chakra UI tema uzantısı (isteğe bağlı)
const theme = extendTheme({
  colors: {
    brand: {
      500: '#3182CE',
    },
  },
});

const AddNew: React.FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [formData, setFormData] = useState({
    buildingName: '',
    address: '',
    adminName: '',
    monthlyFee: 0,
    description: '',
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/maintenance', formData);
      return response.data;
    },
    onSuccess: (data: unknown) => {
      if (data && typeof data === 'object' && 'id' in data) {
        const maintenanceData = data as Maintenance;
        dispatch(addMaintenance(maintenanceData));
        toast({
          title: 'Success',
          description: 'New maintenance added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        window.location.href = '/';
      } else {
        console.error('Unexpected data format:', data);
      }
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'There was an error adding the maintenance.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'monthlyFee' ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <Container maxW="lg" mt={8} p={4}>
      <Box
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg="white"
        overflow="hidden"
      >
        <Heading as="h1" mb={6} textAlign="center" fontSize="2xl" color="brand.500">
          Add New Maintenance
        </Heading>
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Building Name</FormLabel>
              <Input
                type="text"
                name="buildingName"
                placeholder="Building Name"
                value={formData.buildingName}
                onChange={handleChange}
                focusBorderColor="brand.500"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                focusBorderColor="brand.500"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Admin Name</FormLabel>
              <Input
                type="text"
                name="adminName"
                placeholder="Admin Name"
                value={formData.adminName}
                onChange={handleChange}
                focusBorderColor="brand.500"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Monthly Fee</FormLabel>
              <Input
                type="number"
                name="monthlyFee"
                placeholder="Monthly Fee"
                value={formData.monthlyFee}
                onChange={handleChange}
                focusBorderColor="brand.500"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                focusBorderColor="brand.500"
              />
            </FormControl>
            <Button type="submit" colorScheme="brand" size="md" mt={4} width="auto">
              Add
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default AddNew;
