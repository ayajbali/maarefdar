import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getCategories, listAllBooks } from "../lib/appwrite/appwrite";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  
  const fetchCategories = async () => {
    try {
      const res = await getCategories(); // Replace with your actual function to fetch books
      setCategories(res);
    } catch (error) {
      console.error("Error fetching books:", error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };
  const fetchBooks = async () => {
    try {
      const res = await listAllBooks(); // Replace with your actual function to fetch books
      setBooks(res);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const loadWishlist = async () => {
    try {
      const storedWishlist = await AsyncStorage.getItem("wishlist");
      if (storedWishlist) {
        setWishlist(JSON.parse(storedWishlist));
      }
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  };

  const saveWishlist = async (wishlist) => {
    try {
      await AsyncStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Error saving wishlist:", error);
    }
  };

  const addToWishlist = (product) => {
    if (wishlist.find((x) => x.id === product.id)) {
      console.log("Already in wishlist");
      // Optionally: createToast("Already in wishlist");
    } else {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      saveWishlist(updatedWishlist);
      console.log("Added to wishlist");
      // Optionally: createToast("Added to wishlist");
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    saveWishlist(updatedWishlist);
    console.log("Removed from wishlist");
    // Optionally: createToast("Removed from wishlist");
  };

  useEffect(() => {
    fetchBooks();
    loadWishlist();
  }, []);

  return (
    <BooksContext.Provider
      value={{
        books,
        wishlist,
        loading,
        fetchCategories,
        addToWishlist,
        removeFromWishlist,
        categories,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
