import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function () {
    //-----------------------------GET------------------------------//
    let getRes = http.get(`${BASE_URL}/posts`);
    check(getRes, {
        'GET: is status 200': (r) => r.status === 200,
        'GET: response time < 500ms': (r) => r.timings.duration < 500,
    });

    //-------------------------POST------------------------------//
    const postPayload = JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
    });
    const postParams = { headers: { 'Content-Type': 'application/json' } };
    let postRes = http.post(`${BASE_URL}/posts`, postPayload, postParams);
    check(postRes, {
        'POST: is status 201': (r) => r.status === 201,
        'POST: response time < 1000ms': (r) => r.timings.duration < 1000,
    });

    //-------------------PUT------------------------------//
    const putPayload = JSON.stringify({
        id: 1,
        title: "Updated title",
        body: "Updated body",
        userId: 1,
    });
    let putRes = http.put(`${BASE_URL}/posts/1`, putPayload, postParams);
    check(putRes, {
        'PUT: is status 200': (r) => r.status === 200,
        'PUT: response time < 1000ms': (r) => r.timings.duration < 1000,
    });


    //-----------------------DELETE-------------------//
    let deleteRes = http.del(`${BASE_URL}/posts/1`);
    check(deleteRes, {
        'DELETE: is status 200 or 204': (r) => r.status === 200 || r.status === 204,
        'DELETE: response time < 500ms': (r) => r.timings.duration < 1000,
    });
}
