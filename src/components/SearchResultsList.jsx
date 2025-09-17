import SearchResultItem from "./SearchResultItem";
import "./../styles/SearchResultsList.css";

export default function SearchResultsList({ results ,query}) {
  return (
    <div className="results-list">
      {results.map((item, index) => (
        <SearchResultItem key={item.id} item={item} delay={index * 0.1} query={query}/>
      ))}
    </div>
  );
}
