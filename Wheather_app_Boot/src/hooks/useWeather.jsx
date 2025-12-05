import { useState, useEffect } from "react";

const API_KEY = "4e8a86f79d5484ae4cda8af753e9e97f";

export const useWeather = (query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    let cancelled = false;
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        let url;
        if (typeof query === "string") {
          url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
            query
          )}&appid=${API_KEY}&units=metric`;
        } else if (typeof query === "object" && query?.lat != null && query?.lon != null) {
          url = `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=metric`;
        } else {
          throw new Error("Invalid query parameter for weather fetch");
        }

        const res = await fetch(url);

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
  }, [query]);

  return { data, loading, error };
};
