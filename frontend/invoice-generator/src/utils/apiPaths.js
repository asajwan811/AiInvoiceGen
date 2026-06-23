console.log('🔍 [apiPaths] Loading apiPaths.js...');

export const BASE_URL = "https://aiinvoicegen.onrender.com/";

console.log('🔍 [apiPaths] BASE_URL set to:', BASE_URL);
console.log('🔍 [apiPaths] BASE_URL type:', typeof BASE_URL);
console.log('🔍 [apiPaths] Is it localhost?', BASE_URL.includes('localhost'));

export const API_PATHS = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        GET_PROFILE: "/api/auth/me",
        UPDATE_PROFILE: "/api/auth/me"  //(PUT)
    },
    INVOICE: {
        CREATE: "/api/invoices/",
        GET_ALL_INVOICES: "/api/invoices/",
        GET_INVOICE_BY_ID: (id) => `/api/invoices/${id}`,
        UPDATE_INVOICE: (id) => `/api/invoices/${id}`,  //(PUT)
        DELETE_INVOICE: (id) => `/api/invoices/${id}`,
    },
    AI: {
        PARSE_INVOICE_TEXT: '/api/ai/parse-text',
        GENERATE_REMINDER: '/api/ai/generate-reminder',
        GET_DASHBOARD_SUMMARY: '/api/ai/dashboard-summary'
    }
};

console.log('🔍 [apiPaths] API_PATHS.AUTH.LOGIN:', API_PATHS.AUTH.LOGIN);
console.log('✅ [apiPaths] apiPaths.js loaded successfully');
