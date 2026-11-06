// Definimos la interfaz estricta del producto (equivalente a un DTO o entidad en Java)
export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
}

// Capa de Datos y Negocio / Repositorio Simulado
class InventoryRepository {
  private products: Product[] = [
    { id: 1, name: 'Servidor Rack 1U', category: 'Hardware', stock: 12, minStock: 5, price: 1500 },
    { id: 2, name: 'Switch Administrable 24P', category: 'Redes', stock: 3, minStock: 4, price: 450 },
    { id: 3, name: 'Licencia Enterprise DB', category: 'Software', stock: 50, minStock: 10, price: 300 },
    { id: 4, name: 'Cable UTP Cat6 (Rollo 100m)', category: 'Redes', stock: 8, minStock: 6, price: 120 },
  ];

  // Método de la capa de negocio para obtener todo el inventario
  public getAllProducts(): Product[] {
    return this.products;
  }

  // Regla de negocio: Identificar productos con stock crítico (bajo del mínimo)
  public getCriticalStockAlerts(): Product[] {
    return this.products.filter(p => p.stock <= p.minStock);
  }

  // Método para actualizar stock sumando o restando de forma genérica
  public updateStock(id: number, quantity: number): Product[] {
    const product = this.products.find(p => p.id === id);
    if (product) {
      product.stock += quantity;
    }
    return this.products;
  }

  // Método de negocio con validación estricta y manejo de excepciones
  public processStockCheckout(productId: number, quantityToSubtract: number): Product {
    const product = this.products.find(p => p.id === productId);

    if (!product) {
      throw new Error(`Error crítico: El producto con ID ${productId} no se encuentra registrado en el sistema.`);
    }

    if (product.stock < quantityToSubtract) {
      throw new Error(`Operación rechazada: Stock insuficiente para '${product.name}'. Stock actual: ${product.stock}, solicitado: ${quantityToSubtract}.`);
    }

    product.stock -= quantityToSubtract;
    return product;
  }

  // Método de filtrado por categoría
  public getProductsByCategory(categoryName: string): Product[] {
    return this.products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase());
  }

  // Método para registrar un nuevo producto (Nuevo)
  public addProduct(newProductData: Omit<Product, 'id'>): Product {
    const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    
    const productToAdd: Product = {
      id: newId,
      ...newProductData
    };

    this.products.push(productToAdd);
    return productToAdd;
  }
}

// Instancia única exportada (Patrón Singleton básico)
export const inventoryRepo = new InventoryRepository();