import { notFound } from 'next/navigation'
import { Metadata } from 'next'

const getRandomInt = (count: number) =>{
    return Math.floor(Math.random() * count)
}

type Props = {
    params: { productId: string, reviewId: string };
  }

export const generateMetaData = async ({params}: Props): Promise<Metadata> => {
    const title = await new Promise(resolve => {
        setTimeout(() => {
            resolve(`iPhone ${params.productId}`)
        }, 100)
    })
return {
    title: `Product ${title}`
}
}

  export default function review({ params }: Props) {
    const random = getRandomInt(2)
    if (random === 1) {
        throw new Error("Error loading review")
    }
    if (parseInt(params.reviewId) > 1000) {
        notFound()
    }
    return <h2>Review {params.reviewId}  for product {params.productId}</h2>;
  }