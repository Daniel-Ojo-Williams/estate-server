import jwt from 'jsonwebtoken';

export const generateToken = (payload: Record<string, unknown>, expiresIn: string = '5h') => {
  const token = jwt.sign(payload, 'secret', {
    expiresIn
  })

  return token;
}