import "./index.css";
import("./bootstrap");

// after bootstrap the app, remove the next query param from the url
// and update the browser history with the new url
let query: URLSearchParams = new URLSearchParams(window.location.search);

if (query.has("next")) {
  const next = query.get("next");
  query.delete("next");
  let params = query.size ? `?${query.toString()}` : "";
  window.history.pushState({}, "", `${next}${params}`);
}
