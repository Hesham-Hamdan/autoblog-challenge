const templates = [
  {
    title: "The Future of Docker in DevOps",
    body: "Docker continues to revolutionize the way we build, ship, and run applications. By containerizing services, developers ensure consistency across environments. In 2025, we are seeing a shift towards lighter images and rootless containers for enhanced security.",
  },
  {
    title: "Why React is Still King",
    body: "Despite the rise of Svelte and Vue, React's ecosystem remains unbeatable. With the introduction of Server Components, React is blurring the line between frontend and backend, offering better performance and SEO capabilities than ever before.",
  },
  {
    title: "Understanding AWS EC2 vs ECS",
    body: "EC2 provides raw virtual machines where you manage the OS and runtime manually. ECS (Elastic Container Service) abstracts this away, focusing purely on running Docker containers. For simple projects, EC2 offers total control; for scaling, ECS is often superior.",
  },
  {
    title: "Node.js Best Practices",
    body: "To build scalable Node.js apps, always use asynchronous patterns. Avoid blocking the event loop with heavy computation. Utilize middleware for error handling and ensure your database connections are pooled correctly to handle high traffic loads.",
  },
];

const generateContent = async () => {
  console.log(
    `[AI] Generating content via Local Mock Service (Stability Mode)...`
  );

  // 1. Simulate API delay (so it feels real in the UI)
  await new Promise((resolve) => setTimeout(resolve, 800));

  // 2. Pick a random template
  const randomIndex = Math.floor(Math.random() * templates.length);
  const selected = templates[randomIndex];

  // 3. Return the format expected by your database
  return {
    title: selected.title,
    content: selected.body,
  };
};

module.exports = { generateContent };
