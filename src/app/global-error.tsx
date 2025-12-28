"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FAF7F2",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <div style={{ textAlign: "center", padding: "20px" }}>
            <h1
              style={{
                fontSize: "2rem",
                color: "#3F3B37",
                marginBottom: "1rem",
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                color: "#655B52",
                marginBottom: "2rem",
                maxWidth: "400px",
              }}
            >
              We encountered a critical error. Please try refreshing the page.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: "12px 32px",
                backgroundColor: "#A3927C",
                color: "#EDE9E4",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
