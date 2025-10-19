import { Account } from "../../../app/server_app/model/AuthModel";
import { Reservation } from "../../../app/server_app/model/ReservationModel";
import { HTTP_CODES, HTTP_METHODS } from "../../../app/server_app/model/ServerModel";
import { Server } from "../../../app/server_app/server/Server"
import { makeAwesomeRequest } from "./http-client";

describe('Server app integration tests', () => {
    let server: Server;

    beforeAll(() => {
        server = new Server();
        server.startServer();
    })

    afterAll(() => {
        server.stopServer();
    })

    const someUser: Account = {
        id: '',
        userName: 'someUserName',
        password: 'somePassword'
    }

    const someReservation: Reservation = {
        id: '',
        startDate: 'someStartDate',
        endDate: 'someEndDate',
        room: 'someRoom',
        user: 'someUser'
    }

    it('should register new user', async () => {
        const result = await fetch('http://localhost:8080/register', { method: HTTP_METHODS.POST, body: JSON.stringify(someUser) });

        const resultBody = await result.json();
        expect(result.status).toBe(201);
        expect(resultBody).toEqual(expect.objectContaining({
            userId: expect.any(String)
        }))
    })

    it('should register new user with awesome request', async () => {
        const result = await makeAwesomeRequest({
            host: 'localhost',
            port: 8080,
            path: '/register',
            method: HTTP_METHODS.POST,

        }, someUser)
        expect(result.statusCode).toBe(201);
        expect(result.body.userId).toBeDefined();
    })

    let token: string;
    it('should login a register user', async () => {
        const result = await fetch('http://localhost:8080/login', { method: HTTP_METHODS.POST, body: JSON.stringify(someUser) });

        const resultBody = await result.json();

        expect(result.status).toBe(201);
        expect(resultBody.token).toBeDefined();
        token = resultBody.token;
    })

    let createdReservationId: string;
    it('should create reservation if authorized', async () => {
        const result = await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        });

        const resultBody = await result.json();

        console.log(resultBody)

        expect(result.status).toBe(201);
        expect(resultBody.reservationId).toBeDefined();
        createdReservationId = resultBody.reservationId;
    })


    it('should get reservation if authorized', async () => {
        const result = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        });

        const resultBody = await result.json();

        const expectedReservation = structuredClone(someReservation);
        expectedReservation.id = createdReservationId;

        expect(result.status).toBe(HTTP_CODES.OK);
        expect(resultBody).toEqual(expectedReservation);
    })

    it('should create and retrieve multiple reservation if authorized', async () => {
        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        });

        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        });

        await fetch('http://localhost:8080/reservation', {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(someReservation),
            headers: {
                authorization: token
            }
        });


        const getAllResult = await fetch(`http://localhost:8080/reservation/all`, {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        });

        const getAllResultBody = await getAllResult.json();
        expect(getAllResult.status).toBe(HTTP_CODES.OK);
        expect(getAllResultBody.length).toBe(4);
    })

    
    it('should update reservation if authorized', async () => {
        const updateResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method: HTTP_METHODS.PUT,
            body: JSON.stringify({
                startDate: 'someOtherStartDate',
            }),
            headers: {
                authorization: token
            }
        });

        expect(updateResult.status).toBe(HTTP_CODES.OK);

         const getResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        });

        const getRequestBody: Reservation = await getResult.json();
        expect(getRequestBody.startDate).toBe('someOtherStartDate');
    })

     it('should delete reservation if authorized', async () => {
        const deleteResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method: HTTP_METHODS.DELETE,
            body: JSON.stringify({
                startDate: 'someOtherStartDate',
            }),
            headers: {
                authorization: token
            }
        });

        expect(deleteResult.status).toBe(HTTP_CODES.OK);

         const getResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
            method: HTTP_METHODS.GET,
            headers: {
                authorization: token
            }
        });

        expect(getResult.status).toBe(HTTP_CODES.NOT_fOUND);
    })
})