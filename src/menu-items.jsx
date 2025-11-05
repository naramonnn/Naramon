const menuItems = {
  items: [
     {
      id: 'navigation',
      title: 'รายการ',
      type: 'group',
      icon: 'icon-navigation',
      children: [
       {
              id: 'series',
              title: 'จัดการซีรีส์',
              type: 'item',
              icon: 'feather icon-tv',
              url: '/series'
            },
            {
              id: 'actors',
              title: 'จัดการนักแสดง',
              type: 'item',
              icon: 'feather icon-users',
              url: '/actors'
            },
            {
              id: 'approve',
              title: 'อนุมัติสถานะสมาชิก',
              type: 'item',
              icon: 'feather icon-user',
              url: '/approve'
            },
            {
              id: 'report',
              title: 'รายชื่อสมาชิกที่ถูกรายงาน',
              type: 'item',
              icon: 'feather icon-file',
              url: '/report'
            },
            {
              id: 'suspend',
              title: 'รายชื่อสมาชิกที่ถูกระงับสถานะ',
              type: 'item',
              icon: 'feather icon-file',
              url: '/suspend'
            },
        
       
      ]
    },
    
    
  ]
};

export default menuItems;
