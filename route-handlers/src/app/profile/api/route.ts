import { type NextRequest } from 'next/server';
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  // method 1
  const requestHeaders = new Headers(request.headers);
  console.log(requestHeaders.get('Authorization'));

  // method 2
  const headerList = headers();
  console.log((await headerList).get('Authorization'));

  const theme = request.cookies.get('theme')
  console.log(theme)
  return new Response('<h1>Profile API data</h1>', {
    headers: {
      'Content-Type': 'text/html',
      'Set-Cookie': 'theme=dark',
    },
  });
}
