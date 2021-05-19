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
                        <option></option>
                        <option value="lowest">убыванию цены</option>
                        <option value="highest">возрастанию цены</option>
                    </select>
                </div>
            </div>
        )
    }
}
