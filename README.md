# switch-hosts
这是一个快速切换Host方案的Chrome扩展工具, 适合开发使用.  
可能你需要为多种环境配置不同的Dns, 例如 dev、test、public、prod.  
Host 方案及时生效, 没有系统缓存和浏览器缓存.   
扩展使用 chrome.proxy 去实现解析, 会优先于系统代理工具（例如ss）.  
See [Chrome Extension Api](https://developer.chrome.com/extensions/proxy) 

## 注意
不支持https, 类似 https:// 这样的 URL 中的路径和查询组件已被去除.    
See [MDN Pac Script 文档](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_(PAC)_file)  
Chrome 75 以前可以尝试设置 PacHttpsUrlStrippingEnabled.    
[Chrome 废弃政策 #75](https://support.google.com/chrome/a/answer/7643500?hl=zh-Hant)  
[PacHttpsUrlStrippingEnabled 说明](https://cloud.google.com/docs/chrome-enterprise/policies/?policy=PacHttpsUrlStrippingEnabled)  


## 设置 options 
![image](https://github.com/besfro/switch-hosts/blob/master/public/options.png)

## 菜单扩展 pupop 
![image](https://github.com/besfro/switch-hosts/blob/master/public/pupop.png)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## License
[MIT](https://choosealicense.com/licenses/mit/)


