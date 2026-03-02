// This is a placeholder for the authentication utility.
// In a real application, this might interact with Next.js cookies, localStorage, or a state management library.
// Update this implementation based on your actual authentication mechanism.

export const getAuthToken = (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
    return null;
  };
  
  export const setAuthToken = (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
    }
  };
  
  export const removeAuthToken = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  };
  
