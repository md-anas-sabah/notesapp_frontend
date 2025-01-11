/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { Home, User, Tag } from "lucide-react";
import { useNotes } from "../../context/NotesContext";

const Sidebar = ({ onCategorySelect }) => {
  const categories = ["Personal", "Work", "Study", "Important"];
  const { filterByCategory } = useNotes();

  const handleCategoryClick = (category) => {
    filterByCategory(category);
    onCategorySelect(category);
  };

  const handleDashboardClick = () => {
    onCategorySelect(null);
  };

  return (
    <aside className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            <NavLink
              to="/"
              onClick={handleDashboardClick}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`
              }
            >
              <Home className="mr-3 h-5 w-5" />
              Dashboard
            </NavLink>

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`
              }
            >
              <User className="mr-3 h-5 w-5" />
              Profile
            </NavLink>

            <div className="mt-8">
              <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Categories
              </h3>
              <div className="mt-2 space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="w-full flex items-center px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Tag className="mr-3 h-4 w-4" />
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
