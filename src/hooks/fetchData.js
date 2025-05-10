const fetchUserProducts = async () => {
    let  productData = []
    try {
      const userRef = collection(db, "Product");
      const q = query(userRef);
      const querySnapshot = await getDocs(q);

      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      productData =  productsSData

     
    } catch (error) {
      console.error("Error fetching products data:", error);
    }

    return productData;
  };