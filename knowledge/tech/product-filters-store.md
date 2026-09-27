---
type: current-state
id: product-filters-store
status: draft
updated_at: 2026-09-27
---

# product-filters-store.ts — para que sirve cada parte

Archivo: `src/lib/stone/product-filters-store.ts`

Este archivo no es un store de Zustand. Es un hook de React (`useProductFilters`) que guarda los filtros de la pagina de productos y decide que productos se muestran.

Hoy lo usan (o deberian usar) la pagina de productos, el buscador y el dropdown de orden.

## Piezas alrededor

| Archivo | Para que sirve |
| --- | --- |
| `src/lib/stone/product-filters-store.ts` | Guarda filtros, filtra y ordena la lista |
| `src/types/products.ts` | Lista de formas de ordenar (`relevance`, `price-asc`, etc.) |
| `src/components/base/products/searchbar.tsx` | Caja de texto para buscar. Espera 300 ms antes de filtrar |
| `src/components/base/products/sort-dropdown.tsx` | Select para ordenar (precio, nuevos, rating, etc.) |
| `src/components/templats/product-page/product-listing-template.tsx` | Pantalla que junta buscador + orden |
| `src/data/products.ts` | Datos locales de productos (`mockProducts`) |

## FilterState — que se puede filtrar

| Campo | Que guarda | Ejemplo |
| --- | --- | --- |
| `search` | Texto del buscador | `"nike"` |
| `sort` | Como ordenar | `"price-asc"` |
| `categories` | Categorias elegidas | `["Clothing"]` |
| `brands` | Marcas | `["Nike"]` |
| `priceRange` | Precio minimo y maximo | `[0, 1000]` |
| `colors` | Colores | `["Black"]` |
| `sizes` | Tallas | `["M"]` |
| `rating` | Estrellas minimas | `4` o `null` |
| `availability` | Stock | `["In Stock"]` |
| `conditions` | Nuevo / usado | `["New"]` |

`initialState` es el valor de arranque: sin busqueda, orden `relevance`, precio `0–1000`, listas vacias.

## Que hace cada funcion del hook

### `useProductFilters()`

El hook principal. Devuelve filtros, productos ya filtrados y acciones.

### `updateFilter(key, value)`

Cambia un filtro. Ejemplo: `updateFilter("search", "nike")`.

Tambien pone `isPending = true` por 300 ms para mostrar un estado de carga corto.

### `filteredProducts` / `products`

Parte de `mockProducts` y aplica, en orden:

1. Busqueda por nombre, descripcion o marca
2. Categoria
3. Marca
4. Precio
5. Color
6. Talla
7. Rating minimo
8. Disponibilidad (`In Stock`)
9. Condicion (`New` / `Used`)
10. Orden segun `sort`

### `activeFilters`

Lista de chips para mostrar lo que esta activo. Ejemplo: `Search: nike`, `Size: M`, `$10 - $200`.

### `removeFilter(id, type)`

Quita un chip. Si el tipo es `search`, limpia el texto. Si es `category`, saca esa categoria de la lista.

### `clearAllFilters()`

Vuelve todo a `initialState`.

### Lo que retorna

| Nombre | Significado |
| --- | --- |
| `filters` | Estado actual |
| `updateFilter` | Cambiar un filtro |
| `products` | Lista ya filtrada |
| `totalProducts` | Cuantos quedaron |
| `isPending` | true mientras “carga” 300 ms |
| `activeFilters` | Chips activos |
| `removeFilter` | Quitar un chip |
| `clearAllFilters` | Reset |

## Como se conecta con la UI

```text
ProductListingTemplate
|-- SearchBar     value=filters.search     -> updateFilter("search", val)
`-- SortDropdown  value=filters.sort       -> updateFilter("sort", val)
```

`SearchBar` escribe local y espera 300 ms. `SortDropdown` usa el `Select` de `src/components/ui/select.tsx`.

## Nota

`ProductListingTemplate` usa `filters` y `updateFilter` pero todavia no llama a `useProductFilters()`. El hook existe; la pantalla aun no esta conectada.
