import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ItemDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    const [item, setItem] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`/api/items/${id}`)
                .then((res) => res.json())
                .then((data) => setItem(data))
                .catch((error) => console.error("Error fetching item:", error));
        }
    }, [id]);

    if (!item) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <h1 className="text-2xl font-bold">{item.title}</h1>
            <p>{item.description}</p>
        </Layout>
    );
};

export default ItemDetails;