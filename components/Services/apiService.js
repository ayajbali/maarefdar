// apiService.js
const BASE_URL = 'https://65c0b5d7dc74300bce8c9717.mockapi.io';

const apiService = {
  getBooks: async () => {
    try {
      const response = await fetch(`${BASE_URL}/books`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching books:', error);
      throw error;
    }
  },
  
  getCategories: async () => {
    try {
      const response = await fetch(`${BASE_URL}/Categorie`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

 };

export default apiService;
