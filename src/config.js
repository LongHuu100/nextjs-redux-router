
export const api = {
    login: 'auth/login',
    page_list: 'page/list',
    page_view: 'page/view',
    page_update: 'page/update',
    page_create: 'page/create',
    page_slider_represent: 'page/slider-represent',
    page_delete_image: 'page/delete-image',
    page_mix_cate: 'page-mix/find-page-category',
    page_mix_tag: 'page-mix/find-tag-with-name',
    tags_list: 'tags/list',
    tags_view: 'tags/view',
    tags_update: 'tags/update',
    tags_create: 'tags/create',
    media_delete_image: 'media/delete-image',
    faqs_list: 'faqs/list',
    faqs_view: 'faqs/view',
    faqs_update: 'faqs/update',
    faqs_create: 'faqs/create',
    page_cate_list: 'page-category/list',
    page_cate_view: 'page-category/view',
    page_cate_update: 'page-category/update',
    page_cate_create: 'page-category/create',
    page_cate_delete: 'page-category/delete',
}

export const SUCCESS = 200
export const gateway = process.env.GATEWAY

export default {
    env: process.env.NODE_ENV,
    mode: process.env.MODE,
    githubApiEndpoint: process.env.GITHUB_API_ENDPOINT,
    gateway: gateway
}
