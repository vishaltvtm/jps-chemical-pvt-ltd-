"use client";
import log from "@/utils/ConsoleLog";
import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<any>(null as any);

export function AppProvider({ children }: { children: React.ReactNode }) {
    log(" App context Provider", "blue");

    const [products, setProducts] = useState<any[]>([]);

    // ✅ Load products from localStorage
    useEffect(() => {
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        }
    }, []);

    // ✅ Save products
    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products));
    }, [products]);

    const addProduct = (product: any) => {
        setProducts(prev => [...prev, product]);
    };

    const editProduct = (updatedProduct: any) => {
        setProducts(prev =>
            prev.map(p => (p.ID === updatedProduct.ID ? updatedProduct : p))
        );
    };

    const deleteProduct = (id: string) => {
        setProducts(prev => prev.filter(p => p.ID !== id));
    };

    ///------------- CART ----------------
    const [cart, setCart] = useState<any[]>([]);

    // ✅ Load cart from localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem("productsCart");
        if (storedCart) {
            setCart(JSON.parse(storedCart)); // ✅ FIXED
        }
    }, []);

    // ✅ Save cart
    useEffect(() => {
        localStorage.setItem("productsCart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product: any) => {
        setCart(prev => {
            const exists = prev.find(item => item.ID === product.ID);

            if (exists) {
                return prev.map(item =>
                    item.ID === product.ID
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [...prev, { ...product, qty: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.ID !== id));
    };

    const updateQty = (id: string, type: "inc" | "dec") => {
        setCart(prev =>
            prev.map(item => {
                if (item.ID === id) {
                    const newQty =
                        type === "inc" ? item.qty + 1 : item.qty - 1;
                    return { ...item, qty: newQty > 0 ? newQty : 1 };
                }
                return item;
            })
        );
    };

    return (
        <AppContext.Provider
            value={{
                products,
                setProducts,
                addProduct,
                deleteProduct,
                editProduct,
                cart,
                setCart,
                addToCart,
                removeFromCart,
                updateQty,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export const useApp = () => useContext(AppContext);