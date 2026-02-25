import AccountHeader from "@/components/account/AccountHeader";
import AccountSidebar from "@/components/account/AccountSidebar";
import Container from "@/components/shared/Container";

const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className="flex flex-col gap-12 py-12">
      {/* User Profile Header */}
      <AccountHeader
        name="Johnathan Smith"
        email="john.smith@email.com"
      />

      {/* Divider */}
      <hr className="border-t border-[#DFE3E8]" />

      {/* Sidebar + Content */}
      <div className="flex gap-5 items-start">
        <AccountSidebar />
        {children}
      </div>
    </Container>
  );
};

export default AccountLayout;
