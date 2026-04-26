import UploadData from "@/components/admin/UploadData";
import ProductsList from "@/components/admin/ProductsList";

export default function admin() {
    return (<section className=" max-w-9xl  p-6 lg:px-8 ">
        <div className="py-2">
                <UploadData />
            </div>
        <h1 className="text-center">
            JPS chemical PVT LTD ADMIN Panel
        </h1>

        <div>
            <ProductsList />
        </div>
    </section>)
}