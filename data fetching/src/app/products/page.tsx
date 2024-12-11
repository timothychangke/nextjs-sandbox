expost const fetchCache = "default-cache"
type Product = {
    title: string, 
    price: number, 
    description: string
}

export default async function ProductsPage() {
    const response = await fetch("url", {cache: "no-store"})
    const products = await response.json()
    return <h1>{products}</h1>
}