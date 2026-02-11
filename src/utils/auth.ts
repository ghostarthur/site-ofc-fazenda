export const AUTH_KEY = 'fazenda_auth';

export const login = (username: string, password: string): boolean => {
  // Credenciais da fazenda (alterar somente aqui no código)
  const ADMIN_USERNAME = 'fazenda45';
  const ADMIN_PASSWORD = 'fazenda2026';
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    localStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem(AUTH_KEY) === 'true';
};