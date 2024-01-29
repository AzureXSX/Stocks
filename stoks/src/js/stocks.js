


export async function GetStocks(setStocks, value, order){
    const response = fetch('/stocks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value, order }),
    });
    response.then(async (data) => {
        const r = await data.json();
        console.log(value, order);
        setStocks(r);
        setTimeout(async () => {
            await GetStocks(setStocks, value, order);
        }, 300);
    });
}