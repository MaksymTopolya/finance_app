import React from "react";
import Header from "../components/header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header className="mb-8" />
      <main>{children}</main>
      <footer className="text-center mt-auto mb-8">footer</footer>
    </div>
  );
};

export default Layout;
