"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const Temperature = () => {
  const [temperature, setTemperature] = React.useState("");
  const { data: session } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (!session) return;
    const storedTemperature = window.localStorage.getItem(
      `${session?.user?.email}-temperature`
    );

    if (!storedTemperature) {
      //default to 0.9
      window.localStorage.setItem(`${session?.user?.email}-temperature`, "0.9");
      setTemperature("0.9");
    } else {
      setTemperature(storedTemperature);
    }
  }, [session]);

  const handleTemperatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(e.target.value);
  };

  const handleSaveTemperature = () => {
    window.localStorage.setItem(
      `${session?.user?.email}-temperature`,
      temperature
    );
    router.push("/");
  };

  if (!temperature) return null;

  return (
    <div className="w-[35%]">
      <label
        htmlFor="minmax-range"
        className="mb-2 text-sm font-medium text-white"
      >
        Temperature <strong>{temperature}</strong>
      </label>
      <input
        id="minmax-range"
        type="range"
        min="0"
        max="1"
        step="0.1"
        onChange={handleTemperatureChange}
        value={temperature}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <div>
        <i>
          Note: Higher values means the model will take more risks. Try 0.9 for
          more creative applications, and 0 (argmax sampling) for ones with a
          well-defined answer.{" "}
        </i>
      </div>
      <button
        onClick={handleSaveTemperature}
        className="border-gray-700 border rounded-lg px-5 py-3 text-sm bg-white text-black mt-3 hover:bg-white/50 transition-all duration-200"
      >
        Save
      </button>
    </div>
  );
};

export default Temperature;
