import { FiUser, FiFile, FiLayers, FiSettings, FiMessageCircle } from "react-icons/fi";
import { FaPaperclip } from "react-icons/fa";

import { useState, useRef, useEffect } from "react";
import SettingsMenu from "./SettingMenu";
import "./../styles/Tabs.css";

export default function Tabs({ activeTab, setActiveTab, counts }) {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);

  // Filters determine which tabs are visible
  const [filters, setFilters] = useState({
    files: true,
    people: true,
    chats: true,
    lists: false
  });

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Base tabs
  let tabs = [
    // { key: "all", label: "All", count: counts.all},
  ];
  if (filters.all) {
    tabs.push({ key: "all", label: "All", count: counts.files });
  }
  if (filters.files) {
    tabs.push({ key: "files", label: "Files", count: counts.files, icon: <FaPaperclip  /> });
  }

  if (filters.people) {
    tabs.push({ key: "people", label: "People", count: counts.people, icon: <FiUser /> });
  }

  if (filters.chats) {
    tabs.push({ key: "chats", label: "Chats", count: counts.chats || 0});
  }

  if (filters.lists) {
    tabs.push({ key: "lists", label: "Lists", count: 0, icon: <FiLayers /> });
  }

  return (
    <div className="tabs">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={activeTab === tab.key ? "active" : ""}
            onClick={() => setActiveTab(tab.key)}
          >
            <span>{tab.icon}</span>
            {tab.label} <span className="tabcount">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="settings-wrapper" ref={settingsRef}>
        <button
          className="settings-btn"
          onClick={() => setShowSettings(!showSettings)}
        >
          <FiSettings />
        </button>

        <SettingsMenu
          visible={showSettings}
          filters={filters}
          toggleFilter={toggleFilter}
        />
      </div>
    </div>
  );
}
