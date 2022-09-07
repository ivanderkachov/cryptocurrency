import axios from "axios"
import dateFormat from "dateformat"


const GET_MARKET_DATA = "GET_MARKET_DATA"
const GET_COIN_INFO = "GET_COIN_INFO"
const GET_COIN_NEWS = "GET_COIN_NEWS"
const GET_COIN_HISTORY = "GET_COIN_HISTORY"

const initialState = {
  market: "",
  coin: "",
  history: "",
  news: ""
}

export default (state=initialState, action) => {
  switch (action.type) {
    case GET_MARKET_DATA: {
      return {
        ...state,
        market: action.market,
      };
    }
    case GET_COIN_INFO: {
      return {
        ...state,
        coin: action.coin,
      };
    }
    case GET_COIN_NEWS: {
      return {
        ...state,
        news: action.news,
      };
    }
    case GET_COIN_HISTORY: {
      return {
        ...state,
        history: action.history,
      };
    }
    default:
      return state;
  }
}

export function getMarketData() {
  return (dispatch) => {
    axios('/api/v1/coins').then(({data}) => {
      dispatch({
        type: GET_MARKET_DATA,
        market: data.crypto.data
      })
    })
  }
}
export function getCoinInfo(coinId, timePeriod) {
  return (dispatch) => {
    axios(`/api/v1/${coinId}/${timePeriod}`).then(({ data }) => {
      dispatch({
        type: GET_COIN_INFO,
        coin: data.coinData.data.coin,
      });
    });
  };
}
export function getCoinHistory(coinId, timePeriod) {
  return (dispatch) => {
    axios(`/api/v1/history/${coinId}/${timePeriod}`).then(({ data }) => {
      const history = data.coinData.data.history.reduce((acc, rec) => {
        return { ...acc, [dateFormat(rec.timestamp*1000, "m/d/yy, h:MM TT")]: rec.price}
      }, {})
      dispatch({
        type: GET_COIN_HISTORY,
        history
      });
    });
  };
}
export function getCoinNews(coinName) {
  return (dispatch) => {
    axios(`/api/v1/${coinName}`).then(({ data }) => {
      dispatch({
        type: GET_COIN_NEWS,
        news: data.filteredCryptoNews,
      });
    });
  };
}