import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

function Products({ user, token }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [editingProduct, setEditingProduct] = useState(null);

    const API_URL = import.meta.env.VITE_API_URL;

    const isAdmin = user.role === "admin";

    const fetchProducts = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(
                `${API_URL}/api/products`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to load products."
                );
            }

            setProducts(data.data || []);

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [token]);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/api/products/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete product."
                );
            }

            fetchProducts();

        } catch (error) {
            alert(error.message);
        }
    };

    const handleProductSaved = () => {
        setEditingProduct(null);
        fetchProducts();
    };

    if (loading) {
        return (
            <div className="products-container">
                <h2>Loading products...</h2>
            </div>
        );
    }

    return (
        <div className="products-container">

            <div className="page-header">
                <div>
                    <h1>Products</h1>

                    <p>
                        Logged in as:{" "}
                        <strong>{user.username}</strong>{" "}
                        ({user.role})
                    </p>
                </div>
            </div>

            {error && (
                <div className="error">
                    {error}
                </div>
            )}

            {isAdmin && (
                <ProductForm
                    token={token}
                    editingProduct={editingProduct}
                    onProductSaved={handleProductSaved}
                    onCancel={() => setEditingProduct(null)}
                />
            )}

            <div className="product-table-container">

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Quantity</th>

                            {isAdmin && (
                                <th>Actions</th>
                            )}
                        </tr>
                    </thead>

                    <tbody>

                        {products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={isAdmin ? 6 : 5}
                                >
                                    No products found.
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>

                                    <td>
                                        {product.id}
                                    </td>

                                    <td>
                                        {product.product_name}
                                    </td>

                                    <td>
                                        {product.description}
                                    </td>

                                    <td>
                                        ₱
                                        {Number(
                                            product.price
                                        ).toFixed(2)}
                                    </td>

                                    <td>
                                        {product.quantity}
                                    </td>

                                    {isAdmin && (
                                        <td>

                                            <button
                                                className="edit-button"
                                                onClick={() =>
                                                    setEditingProduct(
                                                        product
                                                    )
                                                }
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    handleDelete(
                                                        product.id
                                                    )
                                                }
                                            >
                                                Delete
                                            </button>

                                        </td>
                                    )}

                                </tr>
                            ))
                        )}

                    </tbody>

                </table>

            </div>
        </div>
    );
}

export default Products;