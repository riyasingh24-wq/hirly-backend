import rateLimit from 'express-rate-limit';

// Create a reusable rate limiter middleware
export const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, // limit each IP to 5 requests per windowMs
    handler: (req, res) => {
        res.status(429).json({
    status: 429,
    error: "Too many requests, please try again later."
        });
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Export a function to create custom limiters if needed in the future
export const createCustomLimiter = (windowMs, max) => {
    return rateLimit({
        windowMs,
        max,
        handler: (req, res) => {
            res.status(429).json({
                status: 429,
                error: "Too many requests, please try again later."
            });
        },
        standardHeaders: true,
        legacyHeaders: false,
});
};
