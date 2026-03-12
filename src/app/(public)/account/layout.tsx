import AccountHeader from "@/components/account/AccountHeader";
import AccountSidebar from "@/components/account/AccountSidebar";
import Container from "@/components/shared/Container";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className="flex flex-col gap-6 sm:gap-8 lg:gap-12 py-6 sm:py-8 lg:py-12">
      {/* User Profile Header */}
      <AccountHeader />

      {/* Divider */}
      <hr className="border-t border-[#DFE3E8]" />

      {/* Sidebar + Content */}
      <div className="flex flex-col lg:flex-row gap-5">
        <AccountSidebar />
        {children}
      </div>
    </Container>
  );
};

export default AccountLayout;
