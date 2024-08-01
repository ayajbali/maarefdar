import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
  } from "react-native-appwrite";
  
  export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    projectId: "65e1b9633bdce8d945d2",
    databaseId: "65e59296e04776d11972",
    userCollectionId: "66521140002963048823",
    CommandeCollectionId: "66521140002963048823",
    TeamCollectionId: "66521140002963048823",
    CommandesCollectionId: "66521140002963048823",
    CategoryCollectionId: "65eac6218566ba5cfca2",
    BooksCollectionId: "6633b9cf001e8a463339",
  };
  
  const client = new Client();
  client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);
  
  const account = new Account(client);
  const storage = new Storage(client);
  const avatars = new Avatars(client);
  const databases = new Databases(client);
  
  // Register user
  
  export async function createUser(email, password, username, phone) {
    try {
      const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username,
        phone
      );
  
  
      await signIn(email, password);
  
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        {
          accountId: newAccount.$id,
          email: email,
          username: username,
      
        }
      );
  
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error(error.message);
    }
  }
  
  // Sign In
  export async function signIn(email, password) {
    try {
  
      console.log("object", email);
      const session = await account.createEmailPasswordSession(email, password);
      console.log("response ", session);
      return session;
    } catch (error) {
      console.error("Error signing in:", error);
      throw new Error(error.message);
    }
  }
  
  // Get Account
  export async function getAccount() {
    try {
      const currentAccount = await account.get();
      return currentAccount;
    } catch (error) {
      console.error("Error getting account:", error);
      throw new Error(error.message);
    }
  }
  
  // Get Current User
  export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw new Error("No current account found");
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
       
      );
  
      if (!currentUser) throw new Error("User not found");
  
      return currentUser.documents[0];
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  }
  
  // Sign Out
  export async function signOut() {
    try {
      const session = await account.deleteSession("current");
      return session;
    } catch (error) {
      console.error("Error signing out:", error);
      throw new Error(error.message);
    }
  }
  
  // Create Document
  export async function createDocument(collectionId, data) {
    try {
      const document = await databases.createDocument(
        appwriteConfig.databaseId,
        collectionId,
        ID.unique(),
        data
      );
      return document;
    } catch (error) {
      console.error("Error creating document:", error);
      throw new Error(error.message);
    }
  }
  
  // Read Document
  export async function getDocument(collectionId, documentId) {
    try {
      const document = await databases.getDocument(
        appwriteConfig.databaseId,
        collectionId,
        documentId
      );
      return document;
    } catch (error) {
      console.error("Error getting document:", error);
      throw new Error(error.message);
    }
  }
  
   
  // Get a book by ID
  async function getBookById(bookId) {
    try {
      const book = await getDocument(appwriteConfig.BooksCollectionId, bookId);
      console.log("Book details:", book);
    } catch (error) {
      console.error("Error getting book:", error);
    }
  }
  
  // List all books
 export async function listAllBooks() {
    try {
      const books = await databases.listDocuments(
        appwriteConfig.BooksCollectionId
      );
      console.log("All books:", books);
    } catch (error) {
      console.error("Error listing books:", error);
    }
  }
  
export async function getCategories() {
  try {
    const post = await databases.listDocuments(
      appwriteConfig.BooksCollectionId
    ,appwriteConfig.CategoryCollectionId
    );
    console.log(post.documents);
    return post.documents;
  } catch (error) {
    console.log(error);
    // Handle error appropriately, e.g., return an empty array or rethrow the error
    return [];
  }
}

export async function getBooks() {
  try {
    const post = await databases.listDocuments(
      "65e59296e04776d11972",
      "6633b9cf001e8a463339"
    );
    console.log(post.documents);
    return post.documents;
  } catch (error) {
    console.log(error);
    // Handle error appropriately, e.g., return an empty array or rethrow the error
    return [];
  }
}
export async function createCommand(data) {
  try {
    console.log("55555",data)
      const newRecord = await databases.createDocument(
          "65e59296e04776d11972",
          "66521140002963048823",
          ID.unique(),
          data,
         
      );
      return newRecord;
  } catch (error) {
      console.error('Error creating command record:', error.response || error);
      throw error;
  }
}