module.exports = {
    store: (req, res) => {
        return res.render('products/store',{
            title: 'Store' /* Aca se ven todos los productos */
        })
    },
    search: (req, res) => {
        return res.render('products/search',{
            title: 'Search',  /* Aca se muestra lo buscado */
            filtar,/* filtrar para encontrar lo que se busca */
        })
    },
    detail: (req, res) => {
        return res.render('products/detail',{
            title: 'Product' /* Aca se ve el detalel de producto */
        })
    },
    add: (req, res) => {
        return res.render('products/add',{
            title: 'add product' /* Aca agregamos un producto */
        })
    },
    edit: (req, res) => {
        return res.render('products/edit',{
            title: 'Edit product' /* Aca editamos un producto */
        })
    },
    update: (req, res) => {
        return res.render('products/update',{
            title: 'Update product'/* Aca editamos el producto */
        })
    },
    destroy: (req, res) => {
        return res.render('products/destroy',{
            title: 'delete product' /* Aca deletamos un producto */
        })
    },
    /* Puede que lo movamos*/
    cart: (req, res) => {
        return res.render('products/cart',{
            title: 'Cart' /* Vista carrito */
        })
    }
}