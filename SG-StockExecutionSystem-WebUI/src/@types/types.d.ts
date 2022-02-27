interface Stock {
    id: string;
    stockId: string;
    currency: string | null;
    ric: string | null;
    bloombergTicker: string | null;
    bloombergTickerLocal: string;
    name: string | null;
    country: string | null;
    price: number | null;
}
interface StockOrder extends Stock {
   side: 'Sell' | 'Buy';
   status: 'Not Ready' | 'Ready' | 'In Progress' | 'Booked' | 'Rejected';
   executionMode: 'Market' | 'Limit';
   orderPrice?: number | null;
   amount?: number | null;
}

interface StockOrderState {
    selected: StockOrder[];
    updateSelected: UpdatePayload[];
}

interface UpdatePayload {
    id: string;
    orderPrice?: number | null;
    amount?: number | null;
    orderPriceValid?: boolean;
    amountValid?: boolean;
    executionMode?: 'Market' | 'Limit';
    status?: 'Not Ready' | 'Ready' | 'In Progress' | 'Booked' | 'Rejected';
}

interface FetchData {
    method: 'POST' | 'GET' | 'DELETE' | 'PUT',
    body?: any,
    headers?: Headers
}