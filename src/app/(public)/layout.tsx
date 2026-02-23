import Navbar from "@/components/shared/layout/Navbar";
import Footer from "@/components/shared/layout/Footer";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar activePath="/shop" />
      {children}
      <Footer />
    </div>
  );
};

export default layout;
