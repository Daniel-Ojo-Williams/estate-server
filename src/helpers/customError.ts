class CustomError extends Error {
  constructor(public status_code: number, public message: string) {
    super(message);
  }
}

export default CustomError;