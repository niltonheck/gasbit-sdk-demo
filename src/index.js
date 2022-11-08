const axios = require('axios').default;

class TransactionSender {
    async sendTransaction({
        from, 
        to,
        provider,
        method,
        params,
    }) {
        try {
            let { data } = await axios.post(
                "https://gasbit-demo-backend.herokuapp.com/message",
                { from, to, method, params }
            );
        
            // Sign the transaction
            let signature = await provider.request({
                method: "eth_signTypedData_v4",
                params: [from, JSON.stringify(data)],
                from: from
            });
        
            let execute = await axios.post(
                "https://gasbit-demo-backend.herokuapp.com/execute",
                {
                message: data.message,
                signature: signature
                }
            );
        
            return execute.data.tx.hash;
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = {
    TransactionSender: new TransactionSender()
}