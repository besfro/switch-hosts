export default {
    // name space
    nameSpace: 'switch-hosts',
    // chrome 配置范围
    // https://developer.chrome.com/apps/types
    scope: 'regular',
    // 编辑器修改记录最大条数
    // 撤销、恢复使用
    loggerMax: 1000,
    // 初始化数据
    defaultData: [
        {
            id: `sd-key-default`,
            title: 'your name',
            content: `# switch hosts \n 127.0.0.1 localhost`,
            actived: false,
            hover: false, 
            titleEditing: false,
            contentEditing: false
        }
    ]
}