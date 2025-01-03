import SideNav from "./components/sideNav";
export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-4 gap-8">
      <aside>
        <SideNav />
      </aside>
      <div className="col-span-3">{children}</div>
    </div>
  );
}
