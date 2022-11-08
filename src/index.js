const axios = require('axios').default;

module.exports = {
    sendTransaction: async ({
        from, 
        to,
        provider
    }) => {
        try {
            let { data } = await axios.post(
              "https://gasbit-demo-backend.herokuapp.com/message",
              { from, to }
            );
      
            // Sign the transaction
            let signature = await provider.request({
              method: "eth_signTypedData_v4",
              params: [from, JSON.stringify(data)],
              from: from
            });
      
            console.log("signature: " + signature);
      
            let execute = await axios.post(
              "https://gasbit-demo-backend.herokuapp.com/execute",
              {
                message: data.message,
                signature: signature
              }
            );
      
            console.log("execute: ", execute.data.tx.hash);
          } catch (e) {
            console.error(e);
          }
    }
}