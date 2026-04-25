import UploadData from "@/components/admin/UploadData";
import ProductForm from "@/components/ProductForm";

export default function Product() {

    return (
        <section>
            <div className="py-2">
                <UploadData />
            </div>
            <div className="py-5">
                <h1 className="text-center">Chemical Product Form</h1>
                <ProductForm />
            </div>
        </section>
    )
}