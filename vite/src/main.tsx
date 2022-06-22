import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import App from "./app"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback="Loading...">
      <App />
    </Suspense>
  </React.StrictMode>,
)
