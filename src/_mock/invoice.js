export const _invoice = {
  id: `${Date.now()}`,
  taxes: 5,
  discount: 10,
  status: 'paid',
  invoiceFrom: {
    name: 'John Doe',
    address: '123 Main Street, Cityville, State, 12345',
    company: 'ABC Corporation',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  },
  invoiceTo: {
    name: 'Jane Smith',
    address: '456 Elm Street, Townsville, State, 54321',
    company: 'XYZ Inc.',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
  },
  items: [
    {
      id: 1,
      title: 'Product A',
      description: 'Description of Product A',
      qty: 5,
      price: 10.99,
    },
    {
      id: 2,
      title: 'Product B',
      description: 'Description of Product B',
      qty: 5,
      price: 19.99,
    },
    {
      id: 3,
      title: 'Product C',
      description: 'Description of Product C',
      qty: 5,
      price: 29.99,
    },
  ],
};
