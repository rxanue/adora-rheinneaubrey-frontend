import { useEffect, useState } from "react";
 
function ProductForm({
    token,
    editingProduct,
    onProductSaved,
    onCancel
}) {
 
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
 
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
 
    const API_URL = import.meta.env.VITE_API_URL;
 
    useEffect(() => {          
 
        if (editingProduct) {
 
            setProductName(
                editingProduct.product_name
            );
 
            setDescription(
                editingProduct.description
            );
 
            setPrice(
                editingProduct.price
            );
 
            setQuantity(
                editingProduct.quantity
            );
 
        } else {
 
            setProductName("");
            setDescription("");
            setPrice("");
            setQuantity("");
 
        }
 
    }, [editingProduct]);
 
    const handleSubmit = async (e) => {
 
        e.preventDefault();
 
        setError("");
        setLoading(true);
 
        const productData = {
            product_name: productName,
            description: description,
            price: Number(price),
            quantity: Number(quantity)
        };
 
        try {
 
            let url = `${API_URL}/api/products`;
 
            let method = "POST";
 
            if (editingProduct) {
 
                url = `${API_URL}/api/products/${editingProduct.id}`;
 
                method = "PUT";
            }
 
            const response = await fetch(url, {
 
                method: method,
 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
 
                body: JSON.stringify(productData)
 
            });
 
            const data = await response.json();
 
            if (!response.ok) {
 
                throw new Error(
                    data.error || "Failed to save product."
                );
 
            }
 
            onProductSaved();
 
            setProductName("");
            setDescription("");
            setPrice("");
            setQuantity("");
 
        } catch (error) {
 
            setError(error.message);
 
        } finally {
 
            setLoading(false);
 
        }
    };
 
    return (
 
        <div className="product-form">
 
            <h2>
                {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
            </h2>
 
            {error && (
                <div className="error">
                    {error}
                </div>
            )}
 
            <form onSubmit={handleSubmit}>
 
                <div className="form-group">
 
                    <label>Product Name</label>
 
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) =>
                            setProductName(e.target.value)
                        }
                        required
                    />
 
                </div>
 
                <div className="form-group">
 
                    <label>Description</label>
 
                    <textarea
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        required
                    />
 
                </div>
 
                <div className="form-group">
 
                    <label>Price</label>
 
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                        required
                    />
 
                </div>
 
                <div className="form-group">
 
                    <label>Quantity</label>
 
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) =>
                            setQuantity(e.target.value)
                        }
                        required
                    />
 
                </div>
 
                <div className="form-buttons">
 
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : editingProduct
                                ? "Update Product"
                                : "Add Product"}
                    </button>
 
                    {editingProduct && (
 
                        <button
                            type="button"
                            className="cancel-button"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
 
                    )}
 
                </div>
 
            </form>
 
        </div>
 
    );
}
 
export default ProductForm;