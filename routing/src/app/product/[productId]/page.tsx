interface ProductParams {
  params: { productId: string };
}

export default function product({ params }: ProductParams) {
  return <h2>Details about product {params.productId}</h2>;
}
