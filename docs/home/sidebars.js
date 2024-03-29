module.exports = {
  docs: [
    {
      type: 'category',
      label: '文档 & 资料',
      link: {
        type: 'doc',
        id: 'index'
      },
      collapsed: false,
      items: [
        {
          type: 'category',
          label: '产品开发',
          link: {
            type: 'doc',
            id: 'products'
          },
          items: [
            {
              type: 'link',
              label: '盘古 OS',
              href: '/docs/pangu-os'
            },
            {
              type: 'link',
              label: '磐石 DB',
              href: '/docs/panshi-db'
            },
            {
              type: 'link',
              label: '精卫 (JingWei, 用户数字资产库)',
              href: '/docs/jingwei-store'
            },
            {
              type: 'link',
              label: 'EasyOps（运维平台）',
              href: '/docs/easy-ops'
            }
          ]
        },
        {
          type: 'category',
          label: '资料收集',
          link: {
            type: 'doc',
            id: 'materials'
          },
          items: [
            {
              type: 'link',
              label: '《我与 AI 聊了个天》',
              href: '/docs/chat-with-ai'
            }
          ]
        }
      ]
    }
  ]
};
