import CustomerSignUpPage from "@/screens/public/CustomerSignUpPage";
import BarberSignUpPage from "@/screens/public/BarberSignUpPage";

interface RegisterPageProps {
  searchParams: Promise<{ type?: string }>;
}

const RegisterPage = async ({ searchParams }: RegisterPageProps) => {
  const { type } = await searchParams;

  return (
    <>{type === "barber" ? <BarberSignUpPage /> : <CustomerSignUpPage />}</>
  );
};

export default RegisterPage;
