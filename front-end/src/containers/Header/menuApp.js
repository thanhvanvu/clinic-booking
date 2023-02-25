// role admin will have these menus
export const adminMenu = [
  // user system
  {
    // 1st menu
    name: 'menu.admin.manage-user',
    menus: [
      // one object is a submenu
      {
        name: 'menu.admin.crud',
        link: '/system/user-manage',
      },
      {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux',
      },
      // {
      //   name: 'menu.admin.manage-admin',
      //   link: '/system/admin-manage',
      // },
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/doctor-manage',
      },
      {
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/schedule-manage',
      },
    ],
  },

  // clinic menu
  {
    name: 'menu.admin.clinic-menu',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/clinic-manage',
      },
    ],
  },

  // specialist menu
  {
    name: 'menu.admin.specialist-menu',
    menus: [
      {
        name: 'menu.admin.manage-specialist',
        link: '/system/specialist-manage',
      },
    ],
  },

  // handbook menu
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

// role doctor will have these menus available
export const doctorMenu = [
  {
    // 1st menu
    name: 'menu.admin.manage-user',
    menus: [
      // one object is a submenu
      {
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/schedule-manage',
      },
    ],
  },
]
