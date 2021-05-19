import firebase from './firebase';


function get_data() {
    const firestore = firebase.firestore();
    const products = firestore.collection('products');

    const db = firebase.database();

    const data = [];

    products.get().then(snapshot => {
        snapshot.forEach(doc => {
            data.push(doc.data());
        })
    })


    return data;
}

export default get_data;