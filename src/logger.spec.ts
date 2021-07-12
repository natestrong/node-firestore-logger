import {Logger} from "./logger";

describe('logger', () => {
    const logger = new Logger();
    const logSpy = jest.spyOn(logger, 'log');

    beforeEach(() => {
        logSpy.mockReset();
    });

    it('should log initialization of collections', () => {
        logger.logCollectionsInit(
            {path: '/users', queries: ['("first", "==", "Nathan")', '("last", "==", "Nathan")']},
            {path: '/groups', queries: ['("id", ">", 100)']},
            {path: 'twitterFollowers', queries: ['("id", ">", 10000)', '("name", "==", "Leo Messi")'], group: true}
        );
        expect(logSpy).toHaveBeenCalledTimes(3);
    });
});
