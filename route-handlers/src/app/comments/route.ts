
import { comments } from './data';
import { type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');
  const filteredComments = query
    ? comments.filter((comment) => comment.text.includes(query))
    : comments;
  return new Response(JSON.stringify(filteredComments));
}

export async function POST(request: Request) {
  const comment = await request.json();
  const newcomment = {
    id: comments.length + 1,
    text: comment.text,
  };
  comments.push(newcomment);
  return new Response(JSON.stringify(newcomment), {
    headers: {
      'Content-type': 'application/json',
    },
    status: 201,
  });
}
