const axios = require('axios');
const {getPhoto} = require('../index.js');
jest.mock('axios');
test('if no photo found return placeholder', () => {
    expect.assertions(1);
    const resp = {
        data: {
            total: 0,
            hits: [
            ]
        }
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(resp));
    return getPhoto('city','country', 2).then(data => 
      expect(data).toBe('../images/placeholder.jpg')
    )
})