const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
};

export default HomeLayout;
