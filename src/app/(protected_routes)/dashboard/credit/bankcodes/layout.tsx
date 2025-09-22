'use client'

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className="w-full h-full flex flex-col justify-between items-start px-5 pt-4">
            <div className="w-full h-full flex flex-col justify-between items-start bg-white">
                {children}
            </div>
        </div>
    </>
  );
}
