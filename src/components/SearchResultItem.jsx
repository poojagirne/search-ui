import "./../styles/SearchResultItem.css";
import { FiFile, FiFolder } from "react-icons/fi";

export default function SearchResultItem({ item, delay, query }) {
  function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} style={{ backgroundColor: "#eedbb7", fontWeight: "bold" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <div className="result-item" style={{ animationDelay: `${delay}s` }}>
      {item.type === "person" && (
        <div className="avatar-wrapper">
          <img src={item.avatar} alt={item.title} className="avatar" />
          {item.status && <span className={`status-dot ${item.status}`} />}
        </div>
      )}

      {item.type === "file" && <FiFile className="icon" />}
      {item.type === "folder" && <FiFolder className="icon" />}

      <div className="info">
        <h4>{highlightText(item.title, query)}</h4>
        <p>{item.subtitle}</p>
      </div>

      {item.files && <span className="file-count">{item.files} Files</span>}
    </div>
  );
}
