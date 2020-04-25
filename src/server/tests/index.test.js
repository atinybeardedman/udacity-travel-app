const axios = require('axios');
const {app, getWeather, getPhoto} = require('../index.js');
jest.mock('axios');
test('get photo should return photo', () => {
    expect.assertions(1);
    const resp = {
        data: {
            total: 1,
            hits: [
                {
                    webformatURL: 'hello'
                }
            ]
        }
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(resp));
    return getPhoto('q').then(data => 
      expect(data).toBe('hello')
    )
})