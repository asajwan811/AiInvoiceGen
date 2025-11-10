import { useState, useEffect } from "react";
import { Briefcase, LogOut, Menu, Navigation, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom"; // ✅ Added useLocation
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { NAVIGATION_MENU } from "../../utils/data";

const NavigationItem = ({ item, isActive, onClick, isCollapsed }) => {
  const Icon = item.icon;

  return (
    <button
      onClick={() => onClick(item.id)}
      className={`
          w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group ${
            isActive
              ? " bg-red-100 text-red-900 font-bold hover:bg-red-200 hover:text-red-950 shadow-sm shadow-red-200"
              : "text-red-800 hover:bg-red-100 hover:text-red-900"
          }`}
    >
      <Icon
        className={`w-5 h-5 flex-shrink-0 ${
          isActive ? "text-red-900" : "text-red-800 "
        }`}
      />
      {!isCollapsed && <span className="ml-3 truncate">{item.name}</span>}
    </button>
  );
};

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Added useLocation hook
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Sync activeNavItem with current route
  useEffect(() => {
    const currentPath = location.pathname;
    console.log("Current path:", currentPath);
    
    // Don't automatically set invoices for all invoices routes
    // Let the manual navigation handle it
    
    // Only set for non-invoices routes
    if (!currentPath.startsWith('/invoices')) {
      const routeSegment = currentPath.split('/')[1];
      if (routeSegment && routeSegment !== activeNavItem) {
        setActiveNavItem(routeSegment);
      }
    }
  }, [location.pathname]);

  //for responsive behaviour
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      console.log("Window width:", window.innerWidth, "Is mobile:", mobile);
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNavigation = (itemId) => {
    setActiveNavItem(itemId);
    navigate(`/${itemId}`);
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const sidebarCollapsed = !isMobile && false;

  return (
    <div className="flex h-screen bg-red-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform ${
          isMobile
            ? sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        } ${
          sidebarCollapsed ? "w-16" : "w-64"
        } bg-red-50 border-r border-red-100`}
      >
        {/* Company logo */}
        <div className="flex items-center h-16 border-b border-red-100 px-6">
          <Link
            className="flex items-center space-x-3"
            to="/dashboard"
            onClick={() => setActiveNavItem("dashboard")}
          >
            <div className="w-8 h-8 bg-red-300 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-black" />
            </div>
            {!sidebarCollapsed && (
              <span className="text-red-900 text-xl font-bold">
                easy INVOICE
              </span>
            )}
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {NAVIGATION_MENU.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={activeNavItem === item.id}
              onClick={handleNavigation}
              isCollapsed={sidebarCollapsed}
            />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={logout}
            className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-red-800 border-1 border-red-800 hover:border-2 transition-colors"
          >
            <LogOut className="w-5 h-5 text-red-800 flex-shrink-0" />
            {!sidebarCollapsed && (
              <span className="ml-2 font-medium">Logout</span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/10 z-40 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          isMobile ? "ml-0" : sidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        {/* Top Bar */}
        <header className="bg-red-50 backdrop-blur-sm border-b border-red-100 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            {isMobile && (
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-xl hover:bg-red-100"
              >
                {sidebarOpen ? (
                  <X className="w-5 h-5 text-red-800" />
                ) : (
                  <Menu className="w-5 h-5 text-red-800" />
                )}
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-black">
                Welcome back, {user?.name}!
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <ProfileDropdown
              isOpen={profileDropdownOpen}
              onToggle={(e) => {
                e.stopPropagation();
                setProfileDropdownOpen(!profileDropdownOpen);
              }}
              avatar={user?.avatar || ""}
              companyName={user?.name || ""}
              email={user?.email || ""}
              onLogout={logout}
            />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-red-50 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;