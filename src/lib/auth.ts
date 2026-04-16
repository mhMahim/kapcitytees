import axios from "axios";
import { toast } from "sonner";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

interface GoogleLoginResponse {
  token?: string;
  role?: string;
  data?: {
    token?: string;
    role?: string;
  };
  user?: {
    role?: string;
  };
  message?: string;
}

export async function googleLogin(
  setIsLoggedIn: (v: boolean) => void,
  redirectPath: string,
  givenRole?: string,
): Promise<void> {
  const result = await signInWithPopup(auth, googleProvider);

  // ✅ Get OAuth Access Token
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const oauthAccessToken = credential?.accessToken;

  if (!oauthAccessToken) {
    throw new Error("Failed to get OAuth access token");
  }

  const response = await axios.post<GoogleLoginResponse>(
    `${process.env.NEXT_PUBLIC_BASE_URL}/google-login`,
    {
      token: oauthAccessToken,
      provider: "google",
      ...(givenRole && { role: givenRole }),
    },
  );

  const token = response.data.token ?? response.data.data?.token;
  const role =
    response.data.role ?? response.data.data?.role ?? response.data.user?.role;

  if (!token || !role) {
    throw new Error(
      response.data.message ||
        "Google login response is missing token or role.",
    );
  }

  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  setIsLoggedIn(true);
  toast.success("Logged in with Google successfully.");
  if (role === "barber" && !givenRole) {
    redirectPath = "/dashboard";
  }
  window.location.href = redirectPath;
}

export async function logout(
  setIsLoggedIn: (v: boolean) => void,
): Promise<void> {
  const token = localStorage.getItem("token");
  try {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    console.log("log out dfgih");
  } catch {
    // proceed with local logout even if the API call fails
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    toast.success("Logged out successfully.");
    window.location.href = "/";
  }
}
