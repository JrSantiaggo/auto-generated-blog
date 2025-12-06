export const DEFAULT_PORT = 3000;
export const PORT = process.env.PORT
  ? parseInt(process.env.PORT, 10)
  : DEFAULT_PORT;
