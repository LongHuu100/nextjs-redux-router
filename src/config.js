
export const api = {
    login: 'auth/login',
    page_list: 'page/list'
}

export default {
    env: process.env.NODE_ENV,
    mode: process.env.MODE,
    githubApiEndpoint: process.env.GITHUB_API_ENDPOINT,
    gateway: process.env.GATEWAY
}
