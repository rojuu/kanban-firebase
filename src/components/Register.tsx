import { createUserWithEmailAndPassword } from "firebase/auth";
import { useCallback, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (error) {
        alert(error);
      }
    },
    [email, password, navigate]
  );

  return (
    <section>
      <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8">
        <div className="mt-0 w-full max-w-md rounded-lg bg-white shadow">
          <div className="space-y-4 p-6">
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
              Register
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Email
                </label>
                <input
                  type="email"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 w-full rounded-lg border-2 px-5 py-2.5 text-center text-sm font-medium text-black shadow-sm focus:outline-none focus:ring-4"
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500">
                {"Already have an account? "}
                <a
                  href="/login"
                  className="text-primary-600 font-medium hover:underline"
                >
                  Sign in
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
