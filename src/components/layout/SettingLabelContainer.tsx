export function SettingLabelContainer({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <h5 className="mt-2">{label}</h5>
      {children}
    </>
  );
}
