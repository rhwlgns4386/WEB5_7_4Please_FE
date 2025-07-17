export default function useAuth() {
  const handleClickGoogleLogin = () => {
    const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email`;
    console.log('clicked');
    window.location.href = GOOGLE_AUTH_URL;
  };

  return {
    handleClickGoogleLogin,
  };
}
