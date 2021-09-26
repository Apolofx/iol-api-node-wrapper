export const API_URL = required("IOL_API_URL", process.env.IOL_API_URL);
export const PASSWORD = required("IOL_PASSWORD", process.env.IOL_PASSWORD);
export const USERNAME = required("IOL_USERNAME", process.env.IOL_USERNAME);

function required(envName: string, value?: string): string {
  if (!value) throw new Error(`${envName} not found in environmet variables`);
  return value;
}
