import axios from 'axios'
import { param2Obj, getSession, getCookie } from '@/utils/index'
import { Message } from 'element-ui'

// create an axios instance
export const ins = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  responseType: 'blob',
})

function download(url, config, fileName) {
  return ins
    .get(url, config)
    .then(res => {
      const response = res.data
      if (response.message) {
        Message({
          message: response.message || 'Error',
          type: 'error',
        })
        return
      }
      const blob = new Blob([response], { type: 'application/octet-stream' })
      const blobURL =
        window.URL && window.URL.createObjectURL
          ? window.URL.createObjectURL(blob)
          : window.webkitURL.createObjectURL(blob)
      let dispositionHeader = ''
      if (!fileName) {
        dispositionHeader =
          res.headers['content-disposition'] ||
          res.headers['Content-disposition'] ||
          res.headers['Content-Disposition']
      }
      const name =
        fileName ??
        decodeURIComponent(dispositionHeader.split(';')[1].split('=')[1])
      const tempLink = document.createElement('a')
      tempLink.style.display = 'none'
      tempLink.href = blobURL
      tempLink.setAttribute('download', name)

      // Safari thinks _blank anchor are pop ups. We only want to set _blank
      // target if the browser does not support the HTML5 download attribute.
      // This allows you to download files in desktop safari if pop up blocking
      // is enabled.
      if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
      }

      document.body.appendChild(tempLink)
      tempLink.click()

      // Fixes "webkit blob resource error 1"
      setTimeout(function () {
        document.body.removeChild(tempLink)
        window.URL.revokeObjectURL(blobURL)
      }, 200)
      return Promise.resolve('success')
    })
    .catch(e => {
      Message({
        message: '下载失败',
        type: 'error',
      })
      return Promise.reject(e)
    })
}

export default download
