import millify from "millify"
import HTMLReactParser from "html-react-parser";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCoinInfo, getCoinHistory } from "../../redux/reducers/reducer";
import Linechart from "./linechart";
import './coinstats.css'

const Coinstats = () => {
  const timePeriod = ['3h', '24h', '7d', '30d', '3m', '1y', '3y', '5y']
  const [period, setPeriod] = useState('24h')
  const dispatch = useDispatch()
  const time = '24hVolume'

  useEffect(() => {
    dispatch(getCoinInfo("Qwsogvtv82FCd", "24h"))
  },[])

  useEffect(() => {
    dispatch(getCoinHistory("Qwsogvtv82FCd", period))
  }, [period])

  const coinData = useSelector((store) => store.reducer.coin)
  const history = useSelector((store) => store.reducer.history)

  return (
    <>
      {coinData !== '' || history !== '' ? (
        // <div>{coinData.price}</div>
        <div className="coinstats">
          <div className="coinstats__header">
            <h1>
              {coinData.name} - {coinData.symbol}
            </h1>
            <h2>
              {coinData.name} live price in US dollars. View value statistics,
              market cap and supply.
            </h2>
          </div>
          <div className="coinstats__charts">
            <div className="coinstats__charts-timeperiod">
              {timePeriod.map((tp) => {
                return (
                  <div className={period === tp ? "coinstats__charts-timeperiod__item_active" : "coinstats__charts-timeperiod__item"} key={tp} name={tp} onClick={() => {setPeriod(tp)}}>
                    {tp}
                  </div>
                );
              })}
            </div>
            <div className="coinstats__charts-chart">
              <Linechart history={history}/>
            </div>
          </div>
          <div className="coinstats__statsfield">
            <div className="coinstats__statsfield-mainstats">
              <h1>
                Price to USD <span> {millify(coinData.price)}</span>
              </h1>
              <h1>
                Rank <span> {millify(coinData.rank)}</span>
              </h1>
              <h1>
                24h Volume <span> {millify(coinData[time])}</span>
              </h1>
              <h1>
                Market Cap <span> {millify(coinData.marketCap)}</span>
              </h1>
              <h1>
                All-time-high (daily avg) <span> {millify(coinData.allTimeHigh.price)}</span>
              </h1>
            </div>
            <div className="coinstats__statsfield-otherstats">
              <h1>
                Number of Markets <span> {millify(coinData.numberOfMarkets)}</span>
              </h1>
              <h1>
                Number of Exchanges <span> {millify(coinData.numberOfExchanges)}</span>
              </h1>
              <h1>
                Approved Supply <span> {coinData.supply.confirmed ? 'V' : 'X'}</span>
              </h1>
              <h1>
                Total Supply <span> {millify(coinData.supply.total)}</span>
              </h1>
              <h1>
                Circulating Supply <span> {millify(coinData.supply.circulating)}</span>
              </h1>
            </div>
          </div>
          <div className="coinstats__coininfo">{HTMLReactParser(coinData.description)}</div>
          <div className="coinstats__coinlinks">
            {coinData.links.map((link) => {
              return (
                <div className="coinstats__coinlinks-item">
                <h1>{link.type}</h1>
                <a href={link.url}>{link.name}</a>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}

export default Coinstats