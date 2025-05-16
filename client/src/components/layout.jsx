import React from "react";
import TopBar from "./TopBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-zinc-200 dark:bg-neutral-800 text-zinc-900 dark:text-zinc-100 transition-colors">
      <TopBar />
      <main className="p-4 h-full">{children}</main>
    </div>
  );
};

export default Layout;
