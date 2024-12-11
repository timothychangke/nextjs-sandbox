export const dynamic = "force-dynamic"
export async function GET() {
    return new Response(JSON.stringify({
        time: new Date().toLocaleTimeString
    }))
}