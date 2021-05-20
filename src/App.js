import { render } from '@testing-library/react';
import React from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';
import firebase from './firebase';
import gerb from './assets/img/oshgu.jpg';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      products: [],
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: "",
      filter: true
    }
  }

  componentDidMount() {
    firebase.firestore().collection('products').get().then(s => {
      this.setState({
        products: s.docs.map(v => {
          return v.data();
        })
      });
    }).catch(e => {
      console.log(e);
    });
  }

  filterPositionShow = () => {
    this.setState({
      filter: true
    })
  };
  filterPositionNone = () => {
    this.setState({
      filter: false
    })
  };


  createOrder = (order) => {
    alert("Заказ принят!");
  }

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter(x => x._id !== product._id)
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter(x => x._id !== product._id)));

  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyIncart = false;

    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyIncart = true;
      }
    });
    if (!alreadyIncart) {
      cartItems.push({ ...product, count: 1 });
    }
    this.setState({ cartItems });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  sortProducts = (event) => {
    //impl
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => (
        sort === "lowest" ?
          ((a.price < b.price) ? 1 : -1) :
          sort === "highest" ?
            ((a.price > b.price) ? 1 : -1) :
            ((a._id < b._id) ? 1 : -1)
      ))
    }))
  }
  filterProducts = (event) => {
    //impl
    console.log(event.target.value);
    if (event.target.value === "") {
      this.setState({
        size: event.target.value,
        products: data.products
      });
    }
    else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(
          (product) => product.availableSizes.indexOf(event.target.value) >= 0
        ),
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="grid-container">
          <header>
            <a href="/">Мир гаджетов</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter
                  filterShow={this.state.filter}
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                />
                <Products
                  filterPositionNone={this.filterPositionNone}
                  filterPositionShow={this.filterPositionShow}
                  products={this.state.products}
                  addToCart={this.addToCart} />
              </div>
              <div className="sidebar">
                <Cart cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder} />
              </div>
            </div>
          </main>
          <footer>
            <img src={gerb} style={{ width: "100px", borderRadius: "50%", marginRight: "1rem" }} />
            <div className="">
              <p>Автор программы:</p>
              <p>Группа: ИСТ(б)-2-17р</p>
              <p>Студент: Топчубай кызы Арууке</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
