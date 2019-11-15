import * as fb from 'firebase/app'
import "firebase/database";
import "firebase/storage";

class Product {
    constructor(title, color, material, price, description, ownerId, imageSrc = '', promo = false, productCreator = null, id = null) {
        this.title = title
        this.color = color
        this.material = material
        this.price = price
        this.description = description
        this.ownerId = ownerId
        this.imageSrc = imageSrc
        this.promo = promo
        this.id = id
        this.productCreator = productCreator
    }
}


export default {
    state: {
        products: []
    },
    mutations: {
        loadProducts(state, payload) {
            state.products = payload;
        },
        createProduct(state, payload) {
            // console.log(payload)
            state.products.push(payload)
        },
        updateProduct(state, {title, price, description, id}) {
            const product = state.products.find(a => {
                return a.id === id
            })

            product.title = title
            product.price = price
            product.description = description
        },
        deleteProduct(state, id) {
            let prds =  state.products.filter(function (obj) {
                return obj.id !== id
            })


            console.log("PRDS---", prds);
            // console.log(state.products, payload);
            /* state.products.filter(function(ele){
                 console.log(ele.id !== payload);
             });*/
            state.products = prds;

            /* return state.products.filter(a => {
                 return a.id === payload
                // console.log(a.id)
             })*/
        }
    },
    actions: {

        async fetchProducts({commit},) {
            commit('clearError')
            commit('setLoading', true)
            const result = []
            try {
                const productsVal = await fb.database().ref('products').once('value')
                console.log(productsVal.val());
                const products = productsVal.val()

                // console.log(products);
                Object.keys(products).forEach(key => {
                    const product = products[key]
                    result.push(
                        new Product(
                            product.title,
                            product.color,
                            product.material,
                            product.price,
                            product.description,
                            product.ownerId,
                            product.imageSrc,
                            product.promo,
                            product.productCreator,
                            key
                        )
                    )
                })

                commit('loadProducts', result)
                commit('setLoading', false)
            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', true)
                throw error
            }
        },

        async createProduct({commit}, payload) {

            commit('clearError')
            commit('setLoading', true)

            const image = payload.image
            try {
                const newProduct = new Product(
                    payload.title,
                    payload.color,
                    payload.material,
                    payload.price,
                    payload.description,
                    fb.auth().currentUser.uid,
                    '',
                    payload.promo,
                    payload.productCreator
                )


                const product = await fb.database().ref('products').push(newProduct)
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                const fileData = await fb.storage().ref(`products/${product.key}.${imageExt}`).put(image)
                const imageSrc = await fb.storage().ref().child(fileData.ref.fullPath).getDownloadURL()

                await fb.database().ref('products').child(product.key).update({imageSrc})
                commit('setLoading', false);
                commit('createProduct', {
                    ...newProduct,

                    id: product.key,
                    imageSrc
                })

            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },

        async updateProduct({commit}, {title, price, description, id}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                await fb.database().ref('products').child(id).update({
                    title,
                    price,
                    description
                })
                commit('updateProduct', {

                    title,
                    price,
                    description,
                    id

                })
                commit('setLoading', false)

            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        },

        async deleteProduct({commit}, {id}) {
            commit('clearError')
            commit('setLoading', true)
            try {
                // await fb.database().ref('products').child(id).remove()
                // var prdRef = fb.database().ref('products').child(id);
                // const productsVal = await fb.database().ref('products').on('value')

                await fb.database().ref('products').child(id).set(null)
                commit('deleteProduct', id);
                commit('setLoading', false)

            } catch (error) {
                commit('setError', error.message)
                commit('setLoading', false)
                throw error
            }
        }


    },
    getters: {
        products(state) {
            return state.products
        },
        productsPromo(state) {
            return state.products.filter(product => product.promo)
        },
        myProducts(state) {
            return state.products.filter(product => {
                return product.ownerId === fb.auth().currentUser.uid
            })
        },
        productById(state) {
            return productId => {
                return state.products.find(product => product.id === productId)
            };
        }
    }
}