import { DataBase } from "../../../app/server_app/data/DataBase";
import { UserCredentialsDataAccess } from "../../../app/server_app/data/UserCredentialsDataAccess";
import { Account } from "../../../app/server_app/model/AuthModel";

const insertMock = jest.fn();
const getByMock = jest.fn();

jest.mock('../../../app/server_app/data/DataBase', () => {
    return {
        DataBase: jest.fn().mockImplementation(() => ({
            insert: insertMock,
            getBy: getByMock
        }))
    }
});

describe('UserCredentialsDataAccess test suite', () => {
    let sut: UserCredentialsDataAccess;

    const someAccount: Account = {
        id: '',
        password: 'somePassword',
        userName: 'someUserName'
    }

    const someId = '1234';

    beforeEach(() => {
        sut = new UserCredentialsDataAccess();
        expect(DataBase).toHaveBeenCalledTimes(1);
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should add user and return the id', async () => {
        insertMock.mockResolvedValue(someId);

        const actual = await sut.addUser(someAccount);
        
        expect(actual).toBe(someId);
        expect(insertMock).toHaveBeenCalledWith(someAccount);
        expect(insertMock).toHaveBeenCalledTimes(1);
    })

    it('should get user by id', async () => {
        getByMock.mockResolvedValue(someAccount);

        const actualUser = await sut.getUserById(someId);
        
        expect(actualUser).toBe(someAccount);
        expect(getByMock).toHaveBeenCalledWith('id', someId);
    })


    it('should get user by username', async () => {
        getByMock.mockResolvedValue(someAccount);

        const actualUser = await sut.getUserByUserName(someAccount.userName);
        
        expect(actualUser).toBe(someAccount);
        expect(getByMock).toHaveBeenCalledWith('userName', someAccount.userName);
    })
})