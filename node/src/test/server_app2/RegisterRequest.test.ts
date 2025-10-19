import { HTTP_CODES, HTTP_METHODS } from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server";
import { RequestTestWrapper } from "./test_utils/RequestTestWrapper";
import { ResponseTestWrapper } from "./test_utils/ResponseTestWrapper";
import { DataBase } from "../../app/server_app/data/DataBase";

jest.mock( "../../app/server_app/data/DataBase");

// jest.mock('../../../app/server_app/data/DataBase', () => {
//     return {
//         DataBase: jest.fn().mockImplementation(() => ({
//             insert: jest.fn(),
//             getBy: jest.fn()
//         }))
//     }
// });

const requestWrapper = new RequestTestWrapper();
const responseWrapper = new ResponseTestWrapper();

const fakeServer = {
    listen: () => { },
    close: () => { }
}

jest.mock('http', () => ({
    createServer: (cb: Function) => {
        cb(requestWrapper, responseWrapper);
        return fakeServer;
    }
}))

describe('RegisterRequest test suite', () => {
    afterEach(() => {
        requestWrapper.clearFields();
        responseWrapper.clearFields();
    })

    it('should register new user', async () => {
        requestWrapper.method = HTTP_METHODS.POST;
        requestWrapper.body = {
            userName: 'someUserName',
            password: 'somePassword'
        };
        requestWrapper.url = 'localhost:8080/register';
        jest.spyOn(DataBase.prototype, 'insert').mockResolvedValue('1234');

        await new Server().startServer();

        await new Promise(process.nextTick)

        expect(responseWrapper.statusCode).toBe(HTTP_CODES.CREATED);
        expect(responseWrapper.body).toEqual(expect.objectContaining({
            userId: expect.any(String)
        }))
    })

    it('should reject requests with no userName and password', async () => {
        requestWrapper.method = HTTP_METHODS.POST;
        requestWrapper.body = {};
        requestWrapper.url = 'localhost:8080/register';

        await new Server().startServer();

        await new Promise(process.nextTick)

        expect(responseWrapper.statusCode).toBe(HTTP_CODES.BAD_REQUEST);
        expect(responseWrapper.body).toEqual('userName and password required')
    })

    it('should do nothing for not supported http methods', async () => {
        requestWrapper.method = HTTP_METHODS.DELETE;
        requestWrapper.body = {};
        requestWrapper.url = 'localhost:8080/register';

        await new Server().startServer();

        await new Promise(process.nextTick)

        expect(responseWrapper.statusCode).toBeUndefined()
        expect(responseWrapper.body).toBeUndefined()
    })

})