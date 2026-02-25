import ProfileSection from "@/components/account/ProfileSection";

const AccountProfilePage = () => {
  return (
    <ProfileSection
      fullName="Johnathan Smith"
      email="johnathansmith@mail.com"
      phone="+1 234 567 890"
      dateOfBirth="12-09-20"
      address="245 Greenfield Avenue, Apartment 12B, New York, 10001, United States"
    />
  );
};

export default AccountProfilePage;
