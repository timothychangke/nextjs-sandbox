type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
};

export default async function UsersPage() {
  // intentionally delay the data fetching
await new Promise((resolve) => setTimeout(resolve, 2000))
  const response = await fetch('url');
  const users = await response.json();
  console.log(users);
  return <h1>UsersPage</h1>;
}
