export function maskEmail(email: string) {
  const parts = email.split('@');
  const username = parts[0];
  const maskedUsername = username.substring(0, 3) + '*****';
  return maskedUsername + '@' + parts[1];
}
