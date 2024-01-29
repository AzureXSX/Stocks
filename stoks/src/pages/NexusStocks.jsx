

import React from "react";
import styles from "../styles/NexusStocks.module.scss";
import headerstyles from "../styles/NexusHeader.module.scss";
import buttons from "../styles/NexusButtons.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { GetStocks } from "../js/stocks";
import ImageETH from '../images/ETH.png';
import ImageALPN from '../images/ALPN.jpg';
import ImageBTC from '../images/BTC.png';
import ImageSOL from '../images/SOL.png';
import ImageDOT from '../images/DOT.png';

class NexusStocks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stocks: [],
            sortValue: "price",
            sortOrder: "desc"
        };

      
        fetch('/stocks')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({ stocks: data });
        })
        .catch(error => console.error('Error:', error));

        this.setStocks = this.setStocks.bind(this);
       
            
    }
    componentDidMount() {
        var _ = new Promise(async (resolve, reject) => {
            await GetStocks(this.setStocks, this.state.sortValue, this.state.sortOrder);
        });
    }

    setStocks(stocks) {
        if(stocks.length != undefined){
            this.setState({ stocks: stocks });
        }
        
    }

    setSort(value) {
        if(value == this.state.sortValue)
            if(this.state.sortOrder == "asc")
                this.setState({ sortOrder: "desc" });
            else
                this.setState({ sortOrder: "asc" });
        else{
            this.setState({ sortValue: value });
            this.setState({ sortOrder: "asc" });
        }
    }

    renderStocks(){
        return this.state.stocks.map((stock, index) => {
            const color = stock.change > 0 ? styles.green : styles.red;
            const icon  = stock.change > 0 ? faArrowUp : faArrowDown;
            const srcALPN = "https://public.bnbstatic.com/image/pgc/202210/655da978141e5445373eecd24ffbb9c1.jpg";
            const srcBTC = "https://public.bnbstatic.com/image/pgc/202210/655da978141e5445373eecd24ffbb9c1.jpg";
            const srcETH = "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/3a8c9fe6-2a76-4ace-aa07-415d994de6f0.png";
            const srcBNB = "https://bin.bnbstatic.com/image/admin_mgs_image_upload/20201110/4cf7d633-92fb-4d37-80ed-458c7d1ea410.png";
            const updown = stock.change > 0 ? "+" : "";

            var src;
            switch(stock.symbol){
                case "AAPL":
                    src = ImageALPN;
                break;
                case "ETH":
                    src = ImageETH;
                break;
                case "SOL":
                    src = ImageSOL;
                break;
                case "DOT":
                    src = ImageDOT;
                break;
                case "BTC":
                    src = ImageBTC;
                break;
            }

            return (
                <div key={index} className={`${styles.stockDiv} ${color}`}>
                    <div className={`${styles.wrapper}`}>
                        <img src={src}></img>
                        <p>{stock.symbol}</p>
                    </div>
                    
                    <p style={{color: "#EAECEF"}}>$ {parseFloat(stock.price).toFixed(4)}</p>
                    <p>
                        {updown}{parseFloat(stock.change).toFixed(4)}{"%"}
                    </p>
                    <FontAwesomeIcon className={`${styles.iconx}`} icon={icon} />
                    {/* <div>
                        <input type="button" value="Buy" className={`${styles.button} ${styles.green}`} />
                        <input type="button" value="Sell" className={`${styles.button} ${styles.red}`} />
                    </div> */}
                    <button className={`${buttons.buyButton}`}>Buy</button>
                    <button className={`${buttons.sellButton}`}>Sell</button>
                </div>
            );
        });
    }
    render() {
        return (
            <>
                <header>
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5120 1024" class="header-logo" fill="currentColor"><path d="M230.997333 512L116.053333 626.986667 0 512l116.010667-116.010667L230.997333 512zM512 230.997333l197.973333 197.973334 116.053334-115.968L512 0 197.973333 314.026667l116.053334 115.968L512 230.997333z m395.989333 164.992L793.002667 512l116.010666 116.010667L1024.981333 512l-116.992-116.010667zM512 793.002667l-197.973333-198.997334-116.053334 116.010667L512 1024l314.026667-314.026667-116.053334-115.968L512 793.002667z m0-165.973334l116.010667-116.053333L512 396.032 395.989333 512 512 626.986667z m1220.010667 11.946667v-1.962667c0-75.008-40.021333-113.024-105.002667-138.026666 39.978667-21.973333 73.984-58.026667 73.984-121.002667v-1.962667c0-88.021333-70.997333-145.024-185.002667-145.024h-260.992v561.024h267.008c126.976 0.981333 210.005333-51.029333 210.005334-153.002666z m-154.026667-239.957333c0 41.984-34.005333 58.965333-89.002667 58.965333h-113.962666V338.986667h121.984c52.010667 0 80.981333 20.992 80.981333 58.026666v2.005334z m31.018667 224c0 41.984-32.981333 61.013333-87.04 61.013333h-146.944v-123.050667h142.976c63.018667 0 91.008 23.04 91.008 61.013334v1.024z m381.994666 169.984V230.997333h-123.989333v561.024h123.989333v0.981334z m664.021334 0V230.997333h-122.026667v346.026667l-262.997333-346.026667h-114.005334v561.024h122.026667v-356.010666l272 356.992h104.96z m683.946666 0L3098.026667 228.010667h-113.962667l-241.024 564.992h127.018667l50.986666-125.994667h237.013334l50.986666 125.994667h130.005334z m-224.981333-235.008h-148.992l75.008-181.973334 73.984 181.973334z m814.037333 235.008V230.997333h-122.026666v346.026667l-262.997334-346.026667h-114.005333v561.024h122.026667v-356.010666l272 356.992h104.96z m636.970667-91.008l-78.976-78.976c-44.032 39.978667-83.029333 65.962667-148.010667 65.962666-96 0-162.986667-80-162.986666-176v-2.986666c0-96 67.968-174.976 162.986666-174.976 55.978667 0 100.010667 23.978667 144 62.976l78.976-91.008c-51.968-50.986667-114.986667-86.997333-220.970666-86.997334-171.989333 0-292.992 130.986667-292.992 290.005334V512c0 160.981333 122.965333 288.981333 288 288.981333 107.989333 1.024 171.989333-36.992 229.973333-98.986666z m527.018667 91.008v-109.994667h-305.024v-118.016h265.002666v-109.994667h-265.002666V340.992h301.013333V230.997333h-422.997333v561.024h427.008v0.981334z" p-id="2935"></path></svg>
                    <div className={`${headerstyles.labeldiv}`}>
                        <p>Buy Crypto</p>
                        <p>Markets</p>
                        <p>Trade</p>
                        <p>Futures</p>
                        <p>Earn</p>
                        <p>Square</p>
                        <p>More</p>
                    </div>
                </header>
                <div className={styles.mainDiv}>
                    <div className={`${styles.hxdiv}`}>
                        <p onClick={this.setSort('symbol')}>Name</p>
                        <p onClick={this.setSort('price')}>Price</p>
                        <p onClick={this.setSort('change')}>Change</p>
                    </div>
                    {
                        this.state.stocks.length > 0 ? this.renderStocks() : <div>Loading...</div>
                    }
                </div>
                <footer>
                        <div className={`${headerstyles.footerDiv}`}>Binance© 2024 <span>Cookie Preferences</span></div>
                </footer> 
            </>
        );
    }
}
export default NexusStocks;