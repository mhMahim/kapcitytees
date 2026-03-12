import axios from "axios";
import { toast } from "sonner";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

export async function googleLogin(
  setIsLoggedIn: (v: boolean) => void,
  redirectPath: string,
): Promise<void> {
  const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}/google-login`,
    {
      token: idToken,
      provider: "google",
    },
  );
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("role", response.data.data.role);
  setIsLoggedIn(true);
  toast.success("Logged in with Google successfully.");
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
