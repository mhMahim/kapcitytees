import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      {/* Desktop Sidebar - hidden on mobile/tablet */}
      <div className="hidden lg:block">
        <DashboardSidebar />
      </div>

      {/* Main Content Area */}
      <div className="min-w-0 grow">
        <DashboardTopbar />
        <div className="p-8 pt-2">{children}</div>
      </div>
    </div>
  );
};

export default layout;
