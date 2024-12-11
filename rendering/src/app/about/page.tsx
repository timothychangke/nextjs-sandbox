import { cookies } from 'next/headers';
// this is a server side component
export default async function AboutPage() {
  // the logged message will not appear on the browser, but appears on the terminal
  console.log('server component');

  // this code segment would make this route a dynamic route due to the presence of cookies() which is a dynamic function
  const cookieStore = cookies()
  const theme = (await cookieStore).get("theme")
  console.log(theme)
  return <h1>About Page</h1>;
}
