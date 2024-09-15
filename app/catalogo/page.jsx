import ItemList from '../Components/ItemList/ItemList';

export default async function Page() {
  try{

  const request = await fetch(process.env.NEXT_PUBLIC_URL + "/api/productos");
  const products = await request.json();


  console.log(products)
  console.log(typeof products)

  console.log(request)
  console.log(typeof request)

  if (!products || products.length === 0) {
    return <h1>No Products Found</h1>;
  }
 
  return (
    <>
      <h1>View Products</h1>
      <ItemList items={products} />
    </>
  );
  }catch(err){
    console.log("error", err)
  }
}
