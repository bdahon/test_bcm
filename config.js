export default {
    jwtSecret: ':/?',
    rootLogin: 'root',
    rootPassword: 'root',
    rateLimiter: {
        try: 50,
        duration:  10 * 60, // 10 min
    }
};
