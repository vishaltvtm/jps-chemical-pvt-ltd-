import ProductsList from "@/components/ProductsList";

export default function admin() {
    return(<section className="mx-auto  max-w-9xl  p-6 lg:px-8">
        <h1>
            JPS chemical PVT LTD ADMIN Panel 
        </h1>

        <div>
            <ProductsList/>
        </div>
    </section>)
}