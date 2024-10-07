"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginBlack() {
  const [isOpen, setIsOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter(); // Initialize router for redirection

  const closePopup = () => setIsOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        setIsSuccess(true);
        setIsLoading(false);

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        const err = await response.json();
        setError(err.error || "Login failed");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An error occurred");
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="font-[sans-serif] bg-gradient-to-r from-purple-900 via-purple-800 to-purple-600 text-gray-800">
      <div className="min-h-screen flex flex-col items-center justify-center lg:p-6 p-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
          <div>
            <a href="#">
              <Image
                src="/blackrisewhite.svg"
                alt="logo"
                width={208}
                height={52}
                className="w-52 mb-12 inline-block"
              />
            </a>
            <h2 className="text-4xl font-extrabold lg:leading-[50px] text-white">
              Seamless Login for Exclusive Access
            </h2>
            <p className="text-sm mt-6 text-white">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.
            </p>
            <p className="text-sm mt-6 text-white">
              Don&apos;t have an account?
              {/* Registration is currently closed */}
              <span className="text-gray-400 font-semibold ml-1">
                Registration is currently closed
              </span>
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl px-6 py-8 space-y-6 max-w-md md:ml-auto w-full"
          >
            <h3 className="text-3xl font-extrabold mb-12">Sign in</h3>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {isSuccess && (
              <p className="text-green-500 text-sm">Login successful!</p>
            )}

            <div>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3.5 rounded-md outline-gray-800"
                placeholder="Password"
              />
            </div>
            <div className="text-sm text-right">
              <a
                href="#"
                className="text-blue-600 font-semibold hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <div>
              <button
                type="submit"
                className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-gray-800 hover:bg-[#222] focus:outline-none"
              >
                {isLoading ? "Logging in..." : "Log in"}
              </button>
            </div>

            <p className="my-6 text-sm text-gray-400 text-center">
              or continue with
            </p>

            <div className="space-x-6 flex justify-center">
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  className="inline"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                  />
                </svg>
              </button>
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  fill="#000"
                  viewBox="0 0 22.773 22.773"
                >
                  <path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.102-3.48-4.64-3.43-8.243.03-1.96.563-3.665 1.678-4.938 1.13-1.278 2.63-2.06 4.23-2.06 1.292 0 2.015.869 3.091.869 1.038 0 1.636-.884 3.1-.884 1.524 0 2.646.781 3.453 2.109-3.038 1.667-2.549 6.135.58 7.711z" />
                </svg>
              </button>
              <button type="button" className="border-none outline-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#0077b7"
                  width="30px"
                  viewBox="0 0 32 32"
                >
                  <path d="M27.001 0H4.999C2.239 0 0 2.239 0 4.999v22.002C0 29.76 2.239 32 4.999 32h22.002C29.76 32 32 29.761 32 27.001V4.999C32 2.239 29.761 0 27.001 0zM9.451 27.166H5.712V12.209h3.739v14.957zM7.581 10.485a2.18 2.18 0 0 1-2.175-2.178 2.18 2.18 0 1 1 2.175 2.178zm19.624 16.681h-3.736v-7.251c0-1.73-.034-3.954-2.41-3.954-2.414 0-2.785 1.884-2.785 3.827v7.378h-3.736V12.209h3.587v2.041h.05c.498-.945 1.715-1.941 3.527-1.941 3.772 0 4.468 2.48 4.468 5.702v9.155z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
