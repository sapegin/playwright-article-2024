import { http, HttpResponse } from 'msw';

export const handlers = [
  // GET requests to https://httpbin.org/anything with any parameters
  http.get('https://httpbin.org/anything', () => {
    // Return OK status with a JSON object
    return HttpResponse.json({
      args: {
        ingredients: ['bacon', 'tomato', 'mozzarella', 'pineapples'],
      },
    });
  }),
];
