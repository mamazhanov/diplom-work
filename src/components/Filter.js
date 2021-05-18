import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        const filterShow = this.props.filterShow;
        return (
            <div className={filterShow ? "filter-show" : "filter-none"}  >
                <div className="filter-result">
                    Всего товаров: <span style={{ borderBottom: "2px black solid" }}>{this.props.count}</span>
                </div>
                <div className="filter-sort">
                    Сортировка по {" "}
                    <select value={this.props.sort} onChange={this.props.sortProducts}>
                        <option>новые</option>
                        <option value="lowest">убыванию цены</option>
                        <option value="highest">возрастанию цены</option>
                    </select>
                </div>
                <div className="filter-size">
                    Фильтр {" "}
                    <select value={this.props.size} onChange={this.props.filterProducts}>
                        <option value="">Все</option>
                        <option value="Acer">Acer</option>
                        <option value="Asus">Asus</option>
                        <option value="Apple">Apple</option>
                        <option value="Lenovo">Lenovo</option>
                    </select>
                </div>
            </div>
        )
    }
}
