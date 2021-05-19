import React, { Component } from 'react'
import formatCurrency from "../util";
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null
        };
    }


    openModal = (product) => {
        this.setState({ product });
        this.props.filterPositionNone();
    }

    closeModal = () => {
        this.setState({ product: null });
        this.props.filterPositionShow();
    }

    render() {
        const { product } = this.state;

        return (
            <div >
                <Fade bottom cascade>
                    <ul className="products">
                        {this.props.products.map(product => (
                            <li key={product._id}>
                                <div className="product">
                                    <a href={"#" + product._id} onClick={() => this.openModal(product)}>
                                        <center><img src={product.image} alt={product.title} /></center>
                                        <p>
                                            {product.title}
                                        </p>
                                    </a>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button onClick={() => this.props.addToCart(product)}
                                            className="button primary">В корзину</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Fade>
                {
                    product && (
                        <div>
                            <Modal isOpen={true} onRequestClose={this.closeModal} >
                                <Zoom>
                                    <button className="close-modal" onClick={this.closeModal}>x</button>
                                    <div className="product-details">
                                        <img src={product.image} alt={product.title} />
                                        <div className="product-details-description">
                                            <h1>
                                                <strong>{product.title}</strong>
                                            </h1>
                                            <p>
                                                <h3>Общие характеристики</h3>
                                                <div className="border-bottom"> <span>Диагональ:</span>  {product.description.diagonal}</div>
                                                <div className="border-bottom"> <span>Видеоадаптер:</span> {product.description.gpu}</div>
                                                <div className="border-bottom"> <span>Операционная система:</span> {product.description.os}</div>
                                                <div className="border-bottom"> <span>Модель процессора:</span> {product.description.cpu}</div>
                                                <div className="border-bottom"> <span>Частота процессора:</span> {product.description.CPU_frequency} </div>
                                                <div className="border-bottom"> <span>Объем оперативной памяти:</span> {product.description.ram}</div>
                                                <div className="border-bottom"> <span>Тип жесткого диска:</span> {product.description.memoryType}</div>
                                                <div className="border-bottom"> <span>Объем накопителя:</span> {product.description.memory}</div>
                                            </p>
                                            <p>

                                            </p>
                                            <div className="product-price">
                                                <div>
                                                    <h1> {formatCurrency(product.price)}</h1>
                                                </div>
                                                <button className="button primary" onClick={() => {
                                                    this.props.addToCart(product);
                                                    this.closeModal();
                                                }}>
                                                    В корзину
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                </Zoom>
                            </Modal>
                        </div>
                    )
                }
            </div >
        )
    }
}
