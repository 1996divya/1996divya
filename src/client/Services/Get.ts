export default async function Get(
    url: string,
    headers:Record<string, unknown> = {}
): Promise<any>{
    try {
        const response: Response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...headers
            },
        });
        return response.json();
    } catch (error) {
        const err : any = error;
        console.log(err.message)
        throw new Error(err);
    }
}
