async function approve(userAddress) {
    let {
        request,
        response,
        createdAt,
        resolvedAt
    } = await sdk.methods.signAndSubmitAndWait({
            TransactionType: 'TrustSet',
            Account: userAddress,
            LimitAmount: {
                currency: 'CTS',
                issuer: 'rBrZLAm4G3WVDjkMmf83FTFLkAVq2r37XG',
                value: '10000000000'
            }
        });

    // log payload response
    console.log(response.data.resp);
}
