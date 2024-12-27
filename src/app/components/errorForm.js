import React from "react";

export default function ErrorForm({ error }) {
  return error && <p className="mt-1 text-red-500">{error.message}</p>;
}
