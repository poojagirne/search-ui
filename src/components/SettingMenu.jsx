import { FiFile, FiUser, FiMessageCircle, FiList } from "react-icons/fi";
import "./../styles/SettingMenu.css";

export default function SettingsMenu({ visible, filters, toggleFilter }) {
  if (!visible) return null;

  const options = [
    { key: "files", label: "Files", icon: <FiFile /> },
    { key: "people", label: "People", icon: <FiUser /> },
    { key: "chats", label: "Chats", icon: <FiMessageCircle /> },
    { key: "all", label: "Lists", icon: <FiList /> }
  ];

  return (
    <div className="settings-menu">
      {options.map(opt => (
        <div key={opt.key} className={`menu-item ${opt.disabled ? "disabled" : ""}`}>
          <div className="left">
            {opt.icon} <span>{opt.label}</span>
          </div>
          {!opt.disabled && (
            <label className="switch">
              <input
                type="checkbox"
                checked={filters[opt.key]}
                onChange={() => toggleFilter(opt.key)}
              />
              <span className="slider"></span>
            </label>
          )}
        </div>
      ))}
    </div>
  );
}
