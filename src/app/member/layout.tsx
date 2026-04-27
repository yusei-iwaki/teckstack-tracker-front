import HeaderForMember from "@/components/header-for-member";

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <HeaderForMember />
      {children}
    </div>
  );
}
