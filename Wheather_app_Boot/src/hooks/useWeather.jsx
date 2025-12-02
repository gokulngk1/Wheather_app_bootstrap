import { useState, useEffect } from "react";

const API_KEY = "4e8a86f79d5484ae4cda8af753e9e97f";

export const useWeather = (city) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    let cancelled = false;
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
            city
          )}&appid=${API_KEY}&units=metric`
        );

        if (!res.ok) {
          const errText = await res.text();
          throw new Error(res.status === 404 ? "City not found" : errText || "Failed to fetch");
        }

        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "An error occured");
          setData(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, [city]);

  return { data, loading, error };
};
