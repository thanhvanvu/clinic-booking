export const adminMenu = [
  {
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.admin.crud',
        link: '/system/user-manage',
      },
      {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux',
      },
      {
        name: 'menu.admin.manage-admin',
        link: '/system/admin-manage',
      },
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/doctor-manage',
      },
    ],
  },

  {
    name: 'menu.admin.clinic-menu',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/clinic-manage',
      },
    ],
  },

  {
    name: 'menu.admin.specialist-menu',
    menus: [
      {
        name: 'menu.admin.manage-specialist',
        link: '/system/specialist-manage',
      },
    ],
  },

  {
    name: 'menu.admin.handbook-menu',
    menus: [
      {
        name: 'menu.admin.manage-handbook',
        link: '/system/handbook-manage',
      },
    ],
  },
]
