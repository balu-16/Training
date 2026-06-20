const API_BASE = "/api";

export async function fetchCourses(category) {
  const url =
    category && category !== "all"
      ? `${API_BASE}/courses?category=${category}`
      : `${API_BASE}/courses`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
}

export async function fetchCourseById(id) {
  const res = await fetch(`${API_BASE}/courses/${id}`);
  if (!res.ok) throw new Error("Failed to fetch course");
  return res.json();
}

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/courses/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/courses/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

export async function submitContactForm(data) {
  const res = await fetch(`${API_BASE}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit form");
  return res.json();
}
