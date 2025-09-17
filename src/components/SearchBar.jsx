import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import data from "../data/dummyData.json";
import SearchResultsList from "./SearchResultsList";
import Tabs from "./Tabs";
import "./../styles/SearchBar.css";
import { ImSpinner2 } from "react-icons/im"; // spinner icon

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [focused, setFocused] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState();
  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
    } else {
      setValue(value);
      //   const filtered = data.filter((item) =>
      // item.title.toLowerCase().includes(value.toLowerCase())
      //   );
      //   setResults(filtered);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
  };

  // Count per type
  const counts = {
    all: results.length,
    files: results.filter((r) => r.type === "file" || r.type === "folder")
      .length,
    people: results.filter((r) => r.type === "person").length,
  };

  // Filter by tab
  const filteredResults = results.filter((item) => {
    if (activeTab === "all") return true;
    if (activeTab === "files")
      return item.type === "file" || item.type === "folder";
    if (activeTab === "people") return item.type === "person";
    return true;
  });

  return (
    <div className="search-container">
      <div className={`search-box ${ query.trim().length > 0 ? "active" : ""}`}>
        {loading ? (
          <ImSpinner2 className="animate-spin" size={27}/>
        ) : (
          <FiSearch className="search-icon" size={27}/>
        )}

        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search is easier"

        />

        {query && (
          <button className="clear-btn" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>

      {loading && results.length == 0 ? (
        <div class="container">
          {" "}
          {new Array(5).fill(0).map((val) => {
            return (
              <div class="skeleton-container">
                <div class="skeleton-squre"></div>
                <div class="skeleton-lines">
                  <div class="skeleton-line"></div>
                  <div class="skeleton-line short"></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          {query && !loading && results.length > 0 && (
            <>
              <Tabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                counts={counts}
              />
              <SearchResultsList results={filteredResults} query={query}/>
            </>
          )}
        </>
      )}
    </div>
  );
}
