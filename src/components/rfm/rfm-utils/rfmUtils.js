import dayjs from "dayjs";

// Calculate Recency, Frequency, and Monetary
export function calculateRFM(data) {
  const customers = {};

  data.forEach((row) => {
    const id = row.CustomerID;
    const amount = parseFloat(row.Amount || 0);
    const date = dayjs(row.Date);

    if (!customers[id]) {
      customers[id] = {
        CustomerID: id,
        lastPurchase: date,
        Frequency: 0,
        Monetary: 0,
      };
    }

    // Update lastPurchase (max date manually)
    if (date.isAfter(customers[id].lastPurchase)) {
      customers[id].lastPurchase = date;
    }

    customers[id].Frequency += 1;
    customers[id].Monetary += amount;
  });

  const today = dayjs();

  return Object.values(customers).map((c) => ({
    CustomerID: c.CustomerID,
    Recency: today.diff(c.lastPurchase, "day"), // days since last purchase
    Frequency: c.Frequency,
    Monetary: c.Monetary,
  }));
}
