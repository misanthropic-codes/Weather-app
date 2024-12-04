export class ApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): never => {
  if (error instanceof ApiError) {
    throw error;
  }
  
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  throw new ApiError(message);
};