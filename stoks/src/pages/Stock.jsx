
import React from "react";
import styles from "../styles/Stock.module.scss";

class Stock extends React.Component {


    render() {
        return (
            <>
                <div className={styles.stockDiv}>{this.props.Symbol}</div>
            </>
        );
    }

}
export default Stock;