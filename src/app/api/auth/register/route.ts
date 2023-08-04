
export async function POST(request: Request) {
    const body = await request.json();
    const res = await fetch(`${process.env.API_URL}/api/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })

    // const data = await res.json();
    return res
}