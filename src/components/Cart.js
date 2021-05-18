import React, { Component } from 'react'
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import empty from './../assets/img/empty-2.gif';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showChekout: false
        };
    }

    handleInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.state.cartItems
        };
        this.props.createOrder(order);
    }

    render() {
        const { cartItems } = this.props;
        return (
            <div className="cart-main">
                {cartItems.length === 0 ? (
                    <div className="cart cart-header ">Корзина:</div>
                ) :
                    (
                        <div className="cart cart-header">
                            Товаров в корзине: {cartItems.length}
                        </div>
                    )
                }

                <div>
                    <div className="cart">
                        <Fade left cascade>
                            <ul className="cart-items">
                                {cartItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {formatCurrency(item.price)} x {item.count} {" "}
                                                <button className="button" style={{ borderRadius: "5px", padding: "8px" }} onClick={() => this.props.removeFromCart(item)}>
                                                    Удалить
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Fade>
                    </div>
                    {
                        cartItems.length ? (
                            <div>
                                <div className="cart">
                                    <div className="total">
                                        <div>Сумма заказа: {" "}
                                            {formatCurrency(
                                                cartItems.reduce((a, c) => a + c.price * c.count, 0)
                                            )}
                                        </div>
                                        <button onClick={() => { this.setState({ showChekout: true }) }} style={{ borderRadius: "5px", padding: "8px" }} className="button primary">
                                            Продолжить
                                    </button>
                                    </div>
                                </div>

                                {this.state.showChekout && (
                                    <Fade right cascade>
                                        <div className="cart">
                                            <form onSubmit={this.createOrder}>
                                                <ul className="form-container">
                                                    <li>
                                                        <label>Email</label>
                                                        <input
                                                            name="email"
                                                            type="email"
                                                            required
                                                            onChange={this.handleInput} />
                                                    </li>
                                                    <li>
                                                        <label>Имя</label>
                                                        <input
                                                            name="name"
                                                            type="text"
                                                            required
                                                            onChange={this.handleInput} />
                                                    </li>
                                                    <li>
                                                        <label>Адрес</label>
                                                        <input
                                                            name="address"
                                                            type="text"
                                                            required
                                                            onChange={this.handleInput} />
                                                    </li>
                                                    <li>
                                                        <button className="button primary" type="submit">
                                                            Отправить
                                                    </button>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </Fade>
                                )}
                            </div>
                        ) :
                            (
                                <center>
                                    <img src={empty} style={{ width: "250px" }} />
                                    <p style={{ marginTop: "-20px" }}>Корзинка пока пуст!</p>
                                </center>
                            )
                    }
                </div>
            </div>

        )
    }
}
