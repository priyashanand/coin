# Cryptocurrency Price and Deviation API

This project uses the CoinGecko API to fetch and store cryptocurrency price data in a MongoDB database. It provides routes to get the latest price of a specified cryptocurrency and calculate the standard deviation of the last 100 price entries.

## Setup
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up a MongoDB instance and update the database connection configuration.
4. Run the application:
   ```bash
   node server.js
   ```

## Endpoints

### 1. Get Cryptocurrency Price
**POST** `/api/stats`

**Description:** Fetch the current price, market cap, and 24-hour change of a cryptocurrency.

**Request Body:**
```json
{
  "ids": "bitcoin"
}
```

`ids` can be any supported cryptocurrency, such as `bitcoin`, `ethereum`, or `matic-network`.

**Response:**
```json
{
  "price": 94203,
  "marketCap": 1866033172615.4473,
  "24hChange": 0.35687315684650456
}
```

### 2. Get Standard Deviation of Prices
**POST** `/api/deviation`

**Description:** Calculate the standard deviation of the last 100 prices for a specified cryptocurrency.

**Request Body:**
```json
{
  "ids": "bitcoin"
}
```

**Response:**
```json
{
  "standardDeviation": 331.5847888884866
}
```

`ids` can be any supported cryptocurrency name.

## Scheduled Tasks
A cron job fetches and stores prices every 15 minutes for `bitcoin`, `ethereum`, and `matic-network`.

## Deployment
The backend is deployed on an AWS EC2 instance:
- **Public IP:** `13.235.78.202`
- **Port:** `3000`

