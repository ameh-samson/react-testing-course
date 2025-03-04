import { useState } from "react";
import validator from "validator";

const labelStyle = "block text-gray-700 font-medium mb-2";
const inputStyle = "w-full px-3 py-2 border border-gray-300 rounded-md";
const buttonsStyle =
  "w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600";

const Sandbox = () => {
  const [signupInput, setSignupInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSignupInput({ ...signupInput, [id]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validator.isEmail(signupInput.email)) {
      return setError("Invalid email");
    }
    if (!validator.isLength(signupInput.password, { min: 5 })) {
      return setError("Password must be at least 5 characters");
    }
    if (signupInput.password !== signupInput.confirmPassword) {
      return setError("Passwords do not match");
    }
    setError("");
    setSignupInput({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md">
      <form className="space-y-4">
        {/* email input */}
        <div className="mb-3">
          <label htmlFor="email" className={labelStyle}>
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={signupInput.email}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/* password */}
        <div className="mb-3">
          <label htmlFor="password" className={labelStyle}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={signupInput.password}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {/*confirm password input */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className={labelStyle}>
            Confirm Password
          </label>
          <input
            type="confirmPassword"
            id="confirmPassword"
            value={signupInput.confirmPassword}
            onChange={handleChange}
            className={inputStyle}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" onClick={handleSubmit} className={buttonsStyle}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Sandbox;
