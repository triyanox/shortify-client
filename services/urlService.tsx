import http from './http'
import config from '../config/config.json'

const postUrl = config.endpoint + '/api/url'
const getUrls = config.endpoint + '/api/url'
const delUrls = config.endpoint + '/api/url'
const an = config.endpoint + '/api/an/'

export function createUrl(url: { url: string; surl: string }) {
  return http.post(postUrl, url)
}

export function getAllUrls() {
  return http.get(getUrls)
}

export function deleteUrl(short_url: string) {
  return http.delete(delUrls + '/' + short_url)
}

export function getUrl(short_url: string) {
  return http.get(getUrls + '/current/' + short_url)
}

export function updateUrl(url: { id: string; url: string; surl: string }) {
  return http.put(postUrl + '/' + url.id, url)
}

export function getAnalytics(shortUrl: string) {
  return http.get(an + shortUrl)
}
