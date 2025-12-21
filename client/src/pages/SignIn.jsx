import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    // Clear error while user edits fields
    if (error) setError(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      // Use HTTP status to detect errors; backend returns message
      if (!res.ok) {
        setError(data?.message || "Signin failed");
        return;
      }

      setError(null);
      navigate("/");
    } catch (err) {
      setError(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto p-3">
      <h1 className="text-3xl font-semibold my-7 text-center">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg bg-white"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg bg-white"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-80"
          type="submit"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>

      <div className="flex justify-center items-center gap-2 mt-4">
        <p>Dont have an account?</p>
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}
