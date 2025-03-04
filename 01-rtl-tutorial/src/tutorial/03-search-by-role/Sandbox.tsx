import { useEffect, useState } from "react";

const Sandbox = () => {
  const [showAsyncButton, setShowAsyncButton] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 3000);
    return () => clearTimeout(timer);
  });

  return (
    <div>
      <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>

      {/* headings */}
      <h1>Main Heading</h1>
      <h2>Subheading</h2>

      <img src="example.jpg" alt="Example" />

      {/* Regular Buttons */}
      <button>Click me</button>
      <button>Submit</button>
      <button>Cancel</button>
      {/* conditional error button to demonstrate queryByRole */}
      {showError && <button>Error</button>}

      {/* Async button to demonstrate findByRole */}
      {showAsyncButton && <button>Async Button</button>}
    </div>
  );
};
export default Sandbox;
