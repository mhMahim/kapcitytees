import DashboardHomePageOverviewSection from "@/components/dashboard/DashboardHomePageOverviewSection";
import ActivityOverviewSection from "@/components/dashboard/ActivityOverviewSection";
import TopAffiliatesSection from "@/components/dashboard/TopAffiliatesSection";

const page = () => {
  return (
    <div className="space-y-8">
      <DashboardHomePageOverviewSection />
      <ActivityOverviewSection />
      <TopAffiliatesSection />
    </div>
  );
};

export default page;
