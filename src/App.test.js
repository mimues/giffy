import { render, screen } from '@testing-library/react';
import App from './App';

//aquí lo hacemos de manera asincrona ya que la home tiene un lazy
test('renders without crashing', async () => {
  render(<App />);
  const title = await screen.findByText(/Última búsqueda/i);
  expect(title).toBeInTheDocument();
});
