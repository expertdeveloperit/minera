export const UrlConfig = {
    users: {
        login: "users/login",
        logout: "users/logout",
        forgotPassword: "",
        resetPassword: "",
        userInfo: "users/me",
        get:'users'
    },
    profile: {
    	get: 'users/me',
        updateuser:'users/',
        adduser:'users/'
    },
    dashboard:{
    	getPrice:"https://blockchain.info/ticker",
    	getOrders:"orders",
        userInfo: "users/me",
    	getbtcprice:"https://api.coinbase.com/v2/exchange-rates?currency=BTC",
    	getltcprice:"https://api.coinbase.com/v2/exchange-rates?currency=LTC",
    	getethprice:"https://api.coinbase.com/v2/exchange-rates?currency=ETH",
    	getDashprice:"http://dev.signingminers.com/getInfo.php",
        getLtcOrders:"ltcorders",
        getDashOrders:"dashorders",
        getEthOrders:"ethorders",
        getcolocateOrders:"colocate",
    },
    orders:{
    	getBtcOrders:"orders",
    	getLtcOrders:"ltcorders",
    	getDashOrders:"dashorders",
    	getEthOrders:"ethorders",
    	getcolocateOrders:"colocate",
    },
    admin:{
        getUserType:"usertypes",
        getRewards:"rewards",
        getUsers:"users",
        getBlocks:"blocks",
        getorders:"orders",
        getbtcprice:"https://api.coinbase.com/v2/exchange-rates?currency=BTC",
    }
} 