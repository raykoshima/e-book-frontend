import AppRouter from "./routes/AppRouter"
import React from 'react';
import useAuth from "./Hooks/useAuth";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const { loading } = useAuth();

  const color = "#36D7B7";
  const override = `
    display: block;
    margin: 0 auto;
  `;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader
          color={color}
          loading={loading}
          css={override}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <a>Loading..</a>
      </div>
    );
  }

  return (
    <>
      <AppRouter />
    </>
  );
}


export default App;

