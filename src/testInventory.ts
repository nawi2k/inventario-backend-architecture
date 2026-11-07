import { inventoryRepo } from './inventoryService';

console.log("=== INICIO DE PRUEBAS DEL SISTEMA DE INVENTARIO ===");

// 1. Listar todo el inventario inicial
console.log("\n1. Stock actual en almacén:");
console.log(inventoryRepo.getAllProducts());

// 2. Probar alertas de stock crítico (productos por debajo del mínimo)
console.log("\n2. Alertas de stock crítico detectadas:");
console.log(inventoryRepo.getCriticalStockAlerts());

// 3. Probar una salida de stock exitosa
try {
  console.log("\n3. Procesando venta de 2 unidades de 'Servidor Rack 1U'...");
  const updatedProduct = inventoryRepo.processStockCheckout(1, 2);
  console.log("¡Venta exitosa! Stock restante:", updatedProduct.stock);
} catch (error: any) {
  console.error(error.message);
}

// 4. Probar el manejo de excepciones (intentar sacar más stock del disponible)
try {
  console.log("\n4. Intentando retirar 10 unidades de 'Switch Administrable 24P' (Stock actual: 3)...");
  inventoryRepo.processStockCheckout(2, 10);
} catch (error: any) {
  console.error("❌ Excepción capturada correctamente:", error.message);
}

// 5. Agregar un nuevo producto al inventario
console.log("\n5. Registrando nuevo producto en el sistema...");
const nuevo = inventoryRepo.addProduct({
  name: 'Router Industrial Wi-Fi 6',
  category: 'Redes',
  stock: 15,
  minStock: 3,
  price: 850
});
console.log("Producto agregado con éxito:", nuevo);

console.log("\n=== FIN DE LAS PRUEBAS DE ARQUITECTURA ===");
