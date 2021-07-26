import {Logger} from "./logger";

describe('logger', () => {
    const logger = new Logger();
    const logSpy = jest.spyOn(logger, 'log');

    beforeEach(() => {
        logSpy.mockReset();
    });

    it('should log initialization of collections', () => {
        logger.logCollectionsInit(
            {path: '/users', queries: [["first", "==", "Nathan"], ["first", "==", "Strong"]], properties: []},
            {path: '/groups', queries: [["id", ">", 100]], properties: []},
            {
                path: 'twitterFollowers',
                queries: [["first", "==", "Nathan"], ["first", "==", "Strong"]],
                group: true,
                properties: []
            }
        );
        expect(logSpy).toHaveBeenCalledTimes(3);
    });
});
