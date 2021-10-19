import Ticker from './ticker'

// jest.mock('./ticker')

describe('fetchTicker function', () => {
    it('return an object with a fetchTicker property', async () => {
        // Ticker.fetchTicker.mockResolvedValue({});

        // Ticker.fetchTicker.mockImplementation(('bitstamp', 'EUR/USD') =>
        //     Promise.resolve({
        //         symbol: 'string',
        //         info: {
        //             bid: 'string',
        //         },
        //     }),
        // )

        const result = await Ticker.fetchTicker('bitstamp', 'EUR/USD')

        expect(result).toHaveProperty('symbol')
        expect(result).toHaveProperty('info')
        expect(result.info).toHaveProperty('bid')
    })
})

// Mock exemple from documentation :

// // users.test.js
// import axios from 'axios';
// import Users from './users';

// jest.mock('axios');

// test('should fetch users', () => {
//   const users = [{name: 'Bob'}];
//   const resp = {data: users};
//   axios.get.mockResolvedValue(resp);

//   // or you could use the following depending on your use case:
//   // axios.get.mockImplementation(() => Promise.resolve(resp))

//   return Users.all().then(data => expect(data).toEqual(users));
// });
