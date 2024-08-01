import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createCommand, getCategories, listAllBooks } from "../lib/appwrite/appwrite";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
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
      const res = await listAllBooks();
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
    } else {
      const updatedWishlist = [...wishlist, product];
      setWishlist(updatedWishlist);
      saveWishlist(updatedWishlist);
      console.log("Added to wishlist");
    }
  };

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    saveWishlist(updatedWishlist);
    console.log("Removed from wishlist");
  };

  const passerCommande = async (data) => {
    try {
      console.log("testtt",data);
      const newRecord = await createCommand(data)
      return newRecord;
    } catch (error) {
      console.error("Error creating command record:", error.response || error);
      throw error;
    }
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
        passerCommande, // Add createCommand to context value
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export const useBooks = () => useContext(BooksContext);
